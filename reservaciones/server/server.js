const express = require('express');
const path = require('path');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const app = express();
const jsToSqlDate = require('../src/util/NodeToSQLDateParser.js');

app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('../db/Disponibilidad_y_tarifas.db');


//Se recibe un query con fecha de entrada y salida, retribuye de la base de datos cada reservación en la que su fache de entrada
// o su fecha de salida estan dentro del rango de fechas, o si la fecha de entrada es menor y la de salida mayor. Despues se 
// descartan las cabañas del array de cabañas disponibles segun las cabañas encontradas;
app.get('/comparador', function (req, res) {
    let fechaDeEntrada = jsToSqlDate(req.query.fechaDeEntrada);
    let fechaDeSalida = jsToSqlDate(req.query.fechaDeSalida);
    let sql = "SELECT Cabana FROM Disponibilidad WHERE (Fecha_de_entrada >= $fechaDeEntrada AND Fecha_de_entrada < $fechaDeSalida) OR (Fecha_de_salida > $fechaDeEntrada AND Fecha_de_salida <= $fechaDeSalida) OR (Fecha_de_entrada < $fechaDeEntrada AND Fecha_de_salida > $fechaDeSalida)";
    let parametros = {
        $fechaDeEntrada: fechaDeEntrada,
        $fechaDeSalida: fechaDeSalida
    }
    db.all(sql, parametros, (error, rows) => {
        let cabanasDisponibles = [1, 2, 3, 4, 5];
        rows.forEach(row => {
            let cabana = row.Cabana.split('-');
            cabana = cabana.map(cabana => Number(cabana));
            cabana.forEach(numero => {
                let indice = cabanasDisponibles.indexOf(numero);
                if(indice !== -1){
                    cabanasDisponibles.splice(indice,1)
                }
            })
        })
        if(error){
            return res.send(error.message);
        }
        return res.send(JSON.stringify(cabanasDisponibles));
    })
});

app.get('/disponibilidad_de_cabana', function (req, res) {
    let cabana = req.query.cabana;
    let sql = `SELECT Fecha_de_entrada, Fecha_de_salida FROM Disponibilidad WHERE Cabana LIKE '%${cabana}%'`;
    db.all(sql, (error, rows) => {
        let reservaciones = [];
        rows.forEach(row => {
            reservaciones.push({
                fechaDeEntrada: row.Fecha_de_entrada,
                fechaDeSalida: row.Fecha_de_salida
            })
        })
        return res.send(JSON.stringify(reservaciones));
    })
});

app.post('/reservacion', function(req, res) {
    console.log(req.body)
    let datos = req.body;
    datos.fechaDeEntrada = jsToSqlDate(datos.fechaDeEntrada);
    datos.fechaDeSalida = jsToSqlDate(datos.fechaDeSalida);
    let sql = "INSERT INTO Reservaciones (Codigo_de_reservacion, Cabana, Fecha_de_entrada, Fecha_de_salida, Adultos, Ninos, Bebes, Mascotas, Costo_total) VALUES ($codigoDeReservacion, $cabana, $fechaDeEntrada, $fechaDeSalida, $adultos, $ninos, $bebes, $mascotas, $costoTotal)";
    let parametros = {
        $codigoDeReservacion: datos.codigoDeReservacion,
        $cabana: datos.cabana,
        $fechaDeEntrada: datos.fechaDeEntrada,
        $fechaDeSalida: datos.fechaDeSalida,
        $adultos: datos.numeroDeAdultos,
        $ninos: datos.numeroDeNinos,
        $bebes: datos.numeroDeBebes,
        $mascotas: datos.numeroDeMascotas,
        $costoTotal: datos.costoTotal
    }
    db.run(sql, parametros, (error) => {
        if(error){
            console.log(error.message);
            return res.status(400).send(error);
        }else{
            return res.send(`Se publicó la reservación temporal con ID ${this.lastID}`);
        } 
    })
})

app.delete('/reservacion', function(req, res){
    let sql = "DELETE FROM Reservaciones WHERE Codigo_de_reservacion = $codigoDeReservacion"
    let parametros = {$codigoDeReservacion: req.body.codigoDeReservacion}
    db.run(sql, parametros, (error) => {
        if(error){
            console.log(error.message)
            return res.status(404).send(error);
        }else{
            return res.send()
        }
    })
})


app.listen(process.env.PORT || 8080, () =>{
    console.log(`Server is listening`);
});