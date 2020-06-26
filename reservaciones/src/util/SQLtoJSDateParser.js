function sqlToJsDate(sqlDate)  {
    let arrayDeFecha = sqlDate.split('-');
    //Es necesario restar 1 al mes ya que el mes de Enero comienza con el valor 0
    let jsDate = new Date(Number(arrayDeFecha[0]), Number(arrayDeFecha[1] - 1), Number(arrayDeFecha[2]))
    return jsDate;
}
export default sqlToJsDate;


