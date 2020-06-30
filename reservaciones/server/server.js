const express = require('express');
const path = require('path');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const app = express();
const jsToSqlDate = require('../src/util/NodeToSQLDateParser.js');
const nodemailer = require('nodemailer');

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
    let sql = "SELECT Cabana FROM Reservaciones WHERE (Fecha_de_entrada >= $fechaDeEntrada AND Fecha_de_entrada < $fechaDeSalida) OR (Fecha_de_salida > $fechaDeEntrada AND Fecha_de_salida <= $fechaDeSalida) OR (Fecha_de_entrada < $fechaDeEntrada AND Fecha_de_salida > $fechaDeSalida)";
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
    let sql = `SELECT Fecha_de_entrada, Fecha_de_salida FROM Reservaciones WHERE Cabana LIKE '%${cabana}%'`;
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
    let datos = req.body;
    datos.fechaDeEntrada = jsToSqlDate(datos.fechaDeEntrada);
    datos.fechaDeSalida = jsToSqlDate(datos.fechaDeSalida);
    let sql = "INSERT INTO Reservaciones (Codigo_de_reservacion, Estatus, Fecha_de_confirmacion, Cliente, Telefono, email, Cabana, Fecha_de_entrada, Fecha_de_salida, Adultos, Ninos, Bebes, Mascotas, Costo_total, Anticipo, Pago_pendiente) VALUES ($codigoDeReservacion, $estatus, $fechaDeConfirmacion, $cliente, $telefono, $correoElectronico, $cabana, $fechaDeEntrada, $fechaDeSalida, $adultos, $ninos, $bebes, $mascotas, $costoTotal, $anticipo, $pagoPendiente)";
    let parametros = {
        $codigoDeReservacion: datos.codigoDeReservacion,
        $estatus: datos.estatus,
        $fechaDeConfirmacion: datos.fechaDeConfirmacion,
        $cliente: datos.cliente,
        $telefono: datos.telefono,
        $correoElectronico: datos.correoElectronico,
        $cabana: datos.cabana,
        $fechaDeEntrada: datos.fechaDeEntrada,
        $fechaDeSalida: datos.fechaDeSalida,
        $adultos: datos.numeroDeAdultos,
        $ninos: datos.numeroDeNinos,
        $bebes: datos.numeroDeBebes,
        $mascotas: datos.numeroDeMascotas,
        $costoTotal: datos.costoTotal,
        $anticipo: datos.anticipo,
        $pagoPendiente: datos.pagoPendiente
    }
    db.run(sql, parametros, (error) => {
        if(error){
            console.log(error.message);
            return res.status(400).send(error);
        }else{
            if(datos.estatus === 'Confirmada'){
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'cimacalidez.info@gmail.com',
                        pass: 'ux}W8yYk]bfx'
                    }
                });
        
                let mailOptions = {
                    from: 'cimacalidez.info@gmail.com',
                    to: 'cimacalidez@gmail.com',
                    subject: 'prueba',
                    text: 'Pruebasssssss'
                }
        
                transporter.sendMail(mailOptions, function(err, data){
                    if(err){
                        console.log('Hay un error, no se envio el correo:', err.message);
                    } else {
                        console.log('Email enviado')
                    }
                })
            }
            return res.send(`Se publicó la reservación con ID ${this.lastID}`);
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