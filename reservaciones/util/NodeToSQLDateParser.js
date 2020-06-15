function jsToSqlDate(jsDate) {
    jsDate = new Date(jsDate);
    //Con esta función cuidamos que le formado de sqlDate nunca arroje cosas como YYYY-M-D 
    const menorADiez = (numero) => {    return (Number(numero) < 10)? '-0' : '-'    }
    //Es necesario sumar 1 al mes ya que enero comienza en 0
    let sqlDate = jsDate.getFullYear().toString().concat(menorADiez(jsDate.getMonth() + 1), (jsDate.getMonth() + 1).toString().concat( menorADiez(jsDate.getDate()), jsDate.getDate().toString()));
    return sqlDate;
}

module.exports = jsToSqlDate;