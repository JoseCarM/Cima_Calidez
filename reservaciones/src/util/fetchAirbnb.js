const fetch = require("node-fetch");
const util = require("util");
const fs = require("fs");
const streamAirbnb = util.promisify(require("stream").pipeline);
const ical = require("node-ical");


async function fetchAirbnb(cabana) {
    let url;
    let icalPathCabana = `./calendarioAirbnb-${cabana}.ics`
    // Determinamos el calendario que vamos a actualizar
    switch(cabana){
        case 'cabana1':
            url = `https://www.airbnb.mx/calendar/ical/24749764.ics?s=9edd3bd8a5e501681431fdc3dd532d31`;
            break;
        case 'cabana2':
            url = `https://www.airbnb.mx/calendar/ical/11378940.ics?s=64135998a07eaff8ae24522b646bf161`;
            break;
        case 'cabana3':
            url = `https://www.airbnb.mx/calendar/ical/13607521.ics?s=b6bf605e23e0b3087bf15421320233c7`;
            break;
        case 'cabana4':
            url = `https://www.airbnb.mx/calendar/ical/11399056.ics?s=5564f251535afc77ec5a45e125024bff`;
            break;
        case 'cabana5':
            url = `https://www.airbnb.mx/calendar/ical/11379649.ics?s=17560b934782b1229bac766cfa5ce7ee`;
            break;
        default:
            throw new Error(`El parametro ${cabana} no es valido para la función fetchAirbnb, porfavor ingrese solo: 'cabana1', 'cabana2', 'cabana3', 'cabana4' ó 'cabana5'`);
    }
    const response = await fetch(url);
    if (!response.ok){
      throw new Error(`unexpected response ${response.statusText}`);
    }
    // Escribe un archivo .ics del calendario de Airbnb de cabaña, si ya existe, este se sobre escribe
    const archivo = await streamAirbnb(
      response.body,
      fs.createWriteStream(icalPathCabana)
    );
    // regresa un objeto que representa el archivo .ics
    return ical.async.parseFile(icalPathCabana);
}

module.exports = fetchAirbnb;
