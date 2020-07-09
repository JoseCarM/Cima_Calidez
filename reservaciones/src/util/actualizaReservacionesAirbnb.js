const fetchAirbnb = require("./fetchAirbnb.js");
const jsToSqlDate = require("./NodeToSQLDateParser.js");

async function actualizaReservacionesAirbnb(db, next, cabanas) {
  //Verificamos se incluya la base e datos
  if (!db) {
    throw new Error("No se especificó la base de datos");
  }
  //Preparamos un sql incompleto para insertar multiples filas
  let sql =
    "INSERT INTO ReservacionesAirbnb (Codigo_de_reservacion, Fecha_de_entrada, Fecha_de_salida, UID, Cabana) VALUES ";
  let parametros = {};
  let i = 0;
  let j = 0;
  do {
    //Retibuimos nuestro objeto del archivo.ics
    let objetoIcalAirbnb = await fetchAirbnb(`cabana${cabanas[j]}`);
    //Generamos los parametros y completamos el sql con respecto al tamaño de nuestro objeto u objetos iCal
    for (let uid in objetoIcalAirbnb) {
      if (objetoIcalAirbnb[uid] !== objetoIcalAirbnb["prodid"]) {
        if (objetoIcalAirbnb[uid]["description"]) {
          parametros[`$codigoDeReservacion${i}`] = objetoIcalAirbnb[uid][
            "description"
          ].slice(67, 77);
        } else {
          parametros[`$codigoDeReservacion${i}`] = null;
        }
        parametros[`$fechaDeEntrada${i}`] = jsToSqlDate(
          objetoIcalAirbnb[uid]["start"]
        );
        parametros[`$fechaDeSalida${i}`] = jsToSqlDate(
          objetoIcalAirbnb[uid]["end"]
        );
        parametros[`$uid${i}`] = objetoIcalAirbnb[uid]["uid"];
        parametros[`$cabana${i}`] = cabanas[j];
        //Agregamos la coma en los lugares indicados para evitar errores
        if (i > 1) {
          sql = sql + ", ";
        }
        sql =
          sql +
          `($codigoDeReservacion${i}, $fechaDeEntrada${i}, $fechaDeSalida${i}, $uid${i}, $cabana${i})`;
      }
      i++;
    }
    j++;
  } while (j < cabanas.length);
  //   Borramos toda la información anterior de la cabaña especificada en la base datos para la tabala de ReservacionesAirbnb
  let sqlDelete = `DELETE FROM ReservacionesAirbnb WHERE Cabana = ${cabanas[0]}`;
  if (cabanas.length > 1) {
    for (let i = 1; i < cabanas.length; i++) {
      sqlDelete += ` OR Cabana = ${cabanas[i]}`;
    }
  }
  db.run(sqlDelete, (error) => {
    if (error) {
      console.log(error.message);
    } else {
      //   Ingresamos las reservaciones nuevas
      db.run(sql, parametros, (error) => {
        if (error) {
          console.log(error.message);
        } else {
          //   Si esta especificado continuamos con el siguiente middleware
          if (next) {
            next();
          } else {
            // Si esta especificado devolvemos un string que indica que la funcion termino
            return "finalizado";
          }
        }
      });
    }
  });
}

module.exports = actualizaReservacionesAirbnb;
