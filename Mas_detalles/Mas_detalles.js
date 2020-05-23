import { galeriaSrc } from './GaleriasSrc.js';

let numDeMiniaturas = 8;
let tabActivo = document.getElementById('tabActivo').innerHTML.toLocaleLowerCase(); //Ubicar el tab activo para pruebas logicas



//Se extraen los src de galerias y se introducen en los galeriaActivaSrc en formato de array
let galeriaActivaSrc;
switch (tabActivo){
    case 'ultramarina':
        galeriaActivaSrc = Object.values(galeriaSrc.ultramarina.miniaturas);
        break;
    case 'occidentalis':
        galeriaActivaSrc = Object.values(galeriaSrc.occidentalis.miniaturas);
        break;
    case 'melanocephalus':
        galeriaActivaSrc = Object.values(galeriaSrc.melanocephalus.miniaturas);
        break;    
    case 'leucotis':
        galeriaActivaSrc = Object.values(galeriaSrc.leucotis.miniaturas);
        break;
    case 'mexicanus':
        galeriaActivaSrc = Object.values(galeriaSrc.mexicanus.miniaturas);
        break;        
}


let minisGaleriaIds = [];
for (let i = 1; i < numDeMiniaturas + 1; i++){
    //Se contruye el array con los IDs de los elementos <img>
    minisGaleriaIds.push(document.getElementById(`miniGaleria${i}`))
};

const renderGaleria = (posicion) => { //Se añaden los src correspondientes a los tags <img> basados en la posicion
    for(let i = 0; i < numDeMiniaturas; i++){
        minisGaleriaIds[i].src = galeriaActivaSrc[i + posicion];
    }
}

renderGaleria(0); //Posicion 0 es el default de la galeria
