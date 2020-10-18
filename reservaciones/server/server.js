const express = require("express");
const path = require("path");
const cors = require("cors");
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");
const app = express();
const jsToSqlDate = require("../src/util/NodeToSQLDateParser.js");
const actualizaReservacionesAirbnb = require("../src/util/actualizaReservacionesAirbnb.js");
const nodemailer = require("nodemailer");
const fechaLarga = require("../src/util/fechaLargaNode.js");
const ip = require("ip");

app.use(express.static(path.join(__dirname, "build")));
app.use(cors());
app.use(bodyParser.json());

// app.options('/', cors())

// app.all('*', (req, res, next)=> {

//   res.header('Access-Control-Allow-Origin', '*');

//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, PATCH, OPTIONS');

//   res.header('Access-Control-Allow-Headers', '*');

//   res.header('Access-Control-Allow-Credentials', true);

//   next();

// })

const db = new sqlite3.Database("../db/Disponibilidad_y_tarifas.db");

let sqlParaComparadorOVerificador =
  "SELECT Cabana FROM Reservaciones WHERE ((Fecha_de_entrada >= $fechaDeEntrada AND Fecha_de_entrada < $fechaDeSalida) OR (Fecha_de_salida > $fechaDeEntrada AND Fecha_de_salida <= $fechaDeSalida) OR (Fecha_de_entrada < $fechaDeEntrada AND Fecha_de_salida > $fechaDeSalida)) UNION SELECT Cabana FROM ReservacionesAirbnb WHERE ((Fecha_de_entrada >= $fechaDeEntrada AND Fecha_de_entrada < $fechaDeSalida) OR (Fecha_de_salida > $fechaDeEntrada AND Fecha_de_salida <= $fechaDeSalida) OR (Fecha_de_entrada < $fechaDeEntrada AND Fecha_de_salida > $fechaDeSalida))";

// Los siguientes dos middlewares actualizan la tabla ReservacionesAirbnb de la base de datos
app.get("/disponibilidad_de_cabana", function (req, res, next) {
  try {
    let cabana = [Number(req.query.cabana)];
    actualizaReservacionesAirbnb(db, next, cabana);
    console.log(
      Date.now(),
      `Actualización exitosa de reservaciones de Cabaña ${cabana} desde Airbnb`
    );
  } catch (error) {
    console.log(`Hubo un error al actualizar las reservaciones de la Cabaña ${cabana} desde Airbnb`)
  }
});

app.get("/comparador", function (req, res, next) {
  try {
    actualizaReservacionesAirbnb(db, next, [1, 2, 3, 4, 5]);
    console.log(
      Date.now(),
      "Actualización exitosa de reservaciones de todas la cabañas desde Airbnb"
    );
  } catch (error) {
    console.log(
      Date.now(),
      "Hubo un error al intentar actualizar las reservaciones de todas la cabañas desde Airbnb",
      error
    );
  }
});

app.get("/verificador", function (req, res, next) {
  let cabanasARentar = req.query.cabanasARentar.split(",");
  cabanasARentar = cabanasARentar.map((cabana) => Number(cabana));
  actualizaReservacionesAirbnb(db, next, cabanasARentar);
});
//Se recibe un query con fecha de entrada y salida, retribuye de la base de datos cada reservación en la que su feche de entrada
// o su fecha de salida estan dentro del rango de fechas, o si la fecha de entrada es menor y la de salida mayor. Despues se
// descartan las cabañas del array de cabañas disponibles segun las cabañas encontradas;
app.get("/comparador", function (req, res) {
  try {
    let fechaDeEntrada = jsToSqlDate(req.query.fechaDeEntrada);
    let fechaDeSalida = jsToSqlDate(req.query.fechaDeSalida);
    let sql = sqlParaComparadorOVerificador;
    let parametros = {
      $fechaDeEntrada: fechaDeEntrada,
      $fechaDeSalida: fechaDeSalida,
    };
    db.all(sql, parametros, (error, rows) => {
      let cabanasDisponibles = [1, 2, 3, 4, 5];
      rows.forEach((row) => {
        let cabana = row.Cabana.split("-");
        cabana = cabana.map((cabana) => Number(cabana));
        cabana.forEach((numero) => {
          let indice = cabanasDisponibles.indexOf(numero);
          if (indice !== -1) {
            cabanasDisponibles.splice(indice, 1);
          }
        });
      });
      if (error) {
        console.log(
          Date.now(),
          "Hubo un error al solicitar la información en la base de datos en el comparador :",
          error
        );
        return res.send(error.message);
      }
      console.log(
        Date.now(),
        "Infomación de base de datos en comparador solicitada exitosamente"
      );
      return res.send(JSON.stringify(cabanasDisponibles));
    });
  } catch (error) {
    console.log(
      Date.now(),
      "Hubo un error al retribuir la información de las reservaciones en el comparador :",
      error
    );
  }
});

// Si se solicita el calendario de una cabaña, este middleware regresa las fechas ocupadas para dicha cabaña en formato SQL
app.get("/disponibilidad_de_cabana", function (req, res) {
  let cabana = req.query.cabana;
  let sql = `SELECT Fecha_de_entrada, Fecha_de_salida FROM Reservaciones WHERE Cabana LIKE '%${cabana}%' UNION SELECT Fecha_de_entrada, Fecha_de_salida FROM ReservacionesAirbnb WHERE Cabana LIKE '%${cabana}%'`;
  db.all(sql, (error, rows) => {
    let reservaciones = [];
    rows.forEach((row) => {
      reservaciones.push({
        fechaDeEntrada: row.Fecha_de_entrada,
        fechaDeSalida: row.Fecha_de_salida,
      });
    });
    if (error) {
      return res.send(error.message);
    }
    return res.send(JSON.stringify(reservaciones));
  });
});

app.get("/verificador", function (req, res) {
  let fechaDeEntrada = jsToSqlDate(req.query.fechaDeEntrada);
  let fechaDeSalida = jsToSqlDate(req.query.fechaDeSalida);
  let cabanasARentar = req.query.cabanasARentar.split(",");
  cabanasARentar = cabanasARentar.map((cabana) => Number(cabana));
  let sql = sqlParaComparadorOVerificador;
  let parametros = {
    $fechaDeEntrada: fechaDeEntrada,
    $fechaDeSalida: fechaDeSalida,
  };
  db.all(sql, parametros, (error, rows) => {
    let aunDisponibles = true;
    rows.forEach((row) => {
      let cabana = row.Cabana.split("-");
      cabana = cabana.map((cabana) => Number(cabana));
      cabana.forEach((numero) => {
        if (cabanasARentar.includes(numero)) {
          aunDisponibles = false;
        }
      });
    });
    if (error) {
      return res.send(error.message);
    }
    if (aunDisponibles) {
      return res.send(JSON.stringify("Disponible"));
    } else {
      return res.send(JSON.stringify("Ocupado"));
    }
    console.log(res);
  });
});

// Middleware para registrar una reservación en la tabla Reservaciones
app.post("/reservacion", function (req, res) {
  let datos = req.body;
  datos.fechaDeEntrada = jsToSqlDate(datos.fechaDeEntrada);
  datos.fechaDeSalida = jsToSqlDate(datos.fechaDeSalida);
  let sql =
    "INSERT INTO Reservaciones (Codigo_de_reservacion, Estatus, Fecha_de_confirmacion, Cliente, Telefono, email, Cabana, Fecha_de_entrada, Fecha_de_salida, Adultos, Ninos, Bebes, Mascotas, Costo_total, Anticipo, Pago_pendiente) VALUES ($codigoDeReservacion, $estatus, $fechaDeConfirmacion, $cliente, $telefono, $correoElectronico, $cabana, $fechaDeEntrada, $fechaDeSalida, $adultos, $ninos, $bebes, $mascotas, $costoTotal, $anticipo, $pagoPendiente)";
  let parametros = {
    $codigoDeReservacion: datos.codigoDeReservacion,
    $estatus: datos.estatus,
    $fechaDeConfirmacion: datos.fechaDeConfirmacion,
    $cliente: datos.nombre,
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
    $pagoPendiente: datos.pagoPendiente,
  };
  db.run(sql, parametros, (error) => {
    if (error) {
      return res.status(400).send(error);
    } else {
      if (datos.estatus === "Confirmada") {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "cimacalidez.info@gmail.com",
            pass: "ux}W8yYk]bfx",
          },
        });
        let mailOptions = {
          from: "cimacalidez.info@gmail.com",
          to: "cimacalidez@gmail.com",
          subject: "prueba",
          html: `<div style={display: "flex", justifyContent: "center", textAlign: "center"}>
                  <h1>Muchas gracias por su preferencia</h1>\n
                  <h2>A continuacion le presentamos los datos de su reservación:</h2>\n
                  <h2>Código de reservacion: ${datos.codigoDeReservacion}</h2>\n
                  <h2>Huesped: ${datos.nombre}</h2>\n<h2>Cabaña: ${datos.cabana}</h2>\n
                  <h2>Fecha de entrada: ${datos.fechaDeEntrada}</h2>\n
                  <h2>Fecha de salida: ${datos.fechaDeSalida}</h2>\n
                  <h2>Número de adultos: ${datos.numeroDeAdultos}</h2>\n
                  <h2>Número de niños: ${datos.numeroDeNinos}</h2>\n
                  <h2>Número de bebés: ${datos.numeroDeBebes}</h2>\n
                  <h2>Número de mascotas: ${datos.numeroDeMascotas}</h2>\n
                  <h3>El costo total de su reservación es de $${datos.costoTotal} MXN, del cual ya se realizó un pago anticipado de $${datos.anticipo} MXN, los restantes $${datos.pagoPendiente} MXN los puede cubrir el día de entrada.</h3>\n
          </div>`,
        };

        transporter.sendMail(mailOptions, function (err, data) {
          if (err) {
            console.log("Hay un error, no se envio el correo:", err.message);
          } else {
            console.log("Email enviado");
          }
        });
      }
      return res.send(`Se publicó la reservación con ID ${this.lastID}`);
    }
  });
});

// Middleware para eleminar una reservación con respecto a su código de reservación
app.delete("/reservacion", function (req, res) {
  let sql =
    "DELETE FROM Reservaciones WHERE Codigo_de_reservacion = $codigoDeReservacion";
  let parametros = { $codigoDeReservacion: req.body.codigoDeReservacion };
  db.run(sql, parametros, (error) => {
    if (error) {
      return res.status(404).send(error);
    } else {
      return res.send();
    }
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log(
    `El servidor esta listo para recibir solicitudes\nhttp://${ip.address()}:${
      process.env.PORT || 8080
    }/`
  );
});
