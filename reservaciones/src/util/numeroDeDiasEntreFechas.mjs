function numeroDeDiasEntreFechas(fechaMenor, fechaMayor) {
    if(fechaMenor !== null && fechaMayor !== null){
        fechaMenor = fechaMenor.getTime();
        fechaMayor = fechaMayor.getTime();
        let dias = (fechaMayor - fechaMenor)/(1000*60*60*24);
        return dias;
    } else {
        return 0;
    }
}

export default numeroDeDiasEntreFechas;