// Este es un hack de la función Date para determinar la cantidad de dias que tiene el mes señalado incluye años viciestos
const diasDelMes = (anio, mes) => {
    return new Date(anio, mes + 1, 0).getDate();
}
export default diasDelMes;