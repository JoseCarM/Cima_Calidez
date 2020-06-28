function generadorDeCodigoTemp() {
    let fecha = new Date(Date.now());
    let codigo = (Math.random() * fecha.getDate()) * (Math.random() * fecha.getMonth()) * (Math.random() * fecha.getFullYear());
    codigo = fecha.getTime() / codigo;
    codigo = Math.ceil(codigo);
    return codigo;
}

export default generadorDeCodigoTemp;

