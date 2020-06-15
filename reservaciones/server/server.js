const express = require('express');
const path = require('path');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const app = express();
const sqlToJsDate = require('../src/util/SQLtoNodeDateParser.js');
const jsToSqlDate = require('../src/util/NodeToSQLDateParser.js');
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

const db = new sqlite3.Database('../db/Disponibilidad_y_tarifas.db');


//Se recibe un query con fecha de entrada y salida, retribuye de la base de datos cada reservación en la que su fache de entrada
// o su fecha de salida estan dentro del rango de fechas, o si la fecha de entrada es menor y la de salida mayor. Despues se 
// descartan las cabañas del array de cabañas disponibles segun las cabañas encontradas;
app.get('/', function (req, res) {
    let fechaDeEntrada = jsToSqlDate(req.query.fechaDeEntrada);
    let fechaDeSalida = jsToSqlDate(req.query.fechaDeSalida);
    let sql = "SELECT Cabana FROM Disponibilidad WHERE (Fecha_de_entrada >= $fechaDeEntrada AND Fecha_de_entrada < $fechaDeSalida) OR (Fecha_de_salida > $fechaDeEntrada AND Fecha_de_salida <= $fechaDeSalida) OR (Fecha_de_entrada < $fechaDeEntrada AND Fecha_de_salida > $fechaDeSalida)";
    let parametros = {
        $fechaDeEntrada: fechaDeEntrada,
        $fechaDeSalida: fechaDeSalida
    }
    db.all(sql, parametros, (error, rows) => {
        console.log(rows);
        let cabanasDisponibles = [1, 2, 3, 4, 5];
        rows.forEach(row => {
            let indice = cabanasDisponibles.indexOf(row.Cabana);
            if(indice !== -1){
                cabanasDisponibles.splice(indice,1)
            }
        })
        return res.send(JSON.stringify(cabanasDisponibles));
    })
});


app.listen(process.env.PORT || 8080, () =>{
    console.log(`Server is listening`);
});