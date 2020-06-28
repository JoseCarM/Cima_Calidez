import numeroDeDiasEntreFechas from './numeroDeDiasEntreFechas.mjs'

function generadorDeCodigoReservacion (reservacion) {
    let codigo;
    codigo = reservacion.nombre.slice(0,2);
    codigo = codigo.toUpperCase();
    codigo = codigo.concat(reservacion.fechaDeEntrada.getDate().toString().length < 2? '0' + reservacion.fechaDeEntrada.getDate().toString() : reservacion.fechaDeEntrada.getDate().toString());
    codigo = codigo.concat((reservacion.fechaDeEntrada.getMonth() + 1).toString().length < 2? '0' + (reservacion.fechaDeEntrada.getMonth() + 1).toString() : (reservacion.fechaDeEntrada.getMonth() + 1).toString());
    codigo = codigo.concat((reservacion.fechaDeEntrada.getFullYear()).toString().slice(2, 4));
    codigo = codigo.concat((reservacion.numeroDeAdultos + reservacion.numeroDeNinos).toString())
    codigo = codigo.concat(numeroDeDiasEntreFechas(reservacion.fechaDeEntrada, reservacion.fechaDeSalida).toString())
    codigo = codigo.concat(reservacion.cabana);
    return codigo;
}

export default generadorDeCodigoReservacion;