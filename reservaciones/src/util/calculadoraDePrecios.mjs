let precioPorHuesped = 250;
let precioPorMascota = 150;

function calculadoraDePrecios(precioBase, numeroDeAdultos, numeroDeNinos, minimoDeHuespedes, maximoDeHuespedes, numeroDeMascotas, numeroDeNoches) {
    let huespedes = numeroDeAdultos + numeroDeNinos;
    if (huespedes < maximoDeHuespedes) {
        if (huespedes < minimoDeHuespedes){
            huespedes = 0;
        } else {
            huespedes -= minimoDeHuespedes;
        }
    } else {
        huespedes = maximoDeHuespedes - minimoDeHuespedes;
    }
    return (precioBase + (huespedes * precioPorHuesped) + (numeroDeMascotas * precioPorMascota))*numeroDeNoches
}

export default calculadoraDePrecios;