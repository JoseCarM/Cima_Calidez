function nombreDeCabana(numeroDeCabana){
    let nombre;
    switch (numeroDeCabana){
        case 1:
            nombre = 'Ave azul'
            break;
        case 2:
            nombre = 'Jilguero'
            break;
        case 3:
            nombre = 'Tigrillo'
            break;
        case 4:
            nombre = 'Colibrí'
            break;
        case 5:
            nombre = 'Coa'
            break; 
        default:
            break;
    }
    return nombre;
}

export default nombreDeCabana;