import { galeriaSrc } from './GaleriasSrc.js';

//Inicio de extraccion de los src de galerias e introduccion en galeriaActivaSrc en formato de array segun al tabActivo
let tabActivo = document.getElementById('tabActivo').innerHTML.toLocaleLowerCase(); 
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
//Fin de extraccion de los src de galerias e introduccion en galeriaActivaSrc en formato de array segun al tabActivo



//Inicio de render de galeria (REUTILIZABLE CON RESTRICCIONES)
let numDeMiniaturas = 8; //  <-- RESTRICCION 1: El valor de esta variable esta determinado por la estructura HTML donde se implementa
let minisGaleriaIds = [];
for (let i = 1; i < numDeMiniaturas + 1; i++){
    //Se contruye el array con los IDs de los elementos <img>, 
    // RESTRICCION 2: esta estructura está ligada a la esctructura HTML donde se implementa, se debe modificar el string del ID y ser numerado iniciando con 1
    minisGaleriaIds.push(document.getElementById(`miniGaleria${i}`))
};
const renderGaleria = (inicio) => { //Se añaden los src correspondientes a los tags <img> basados en el indice
    let indiceDeLoop = inicio;
    //El indice de Loop se encarga de generar una secuencia que solo existe entre 0 y el largo de galeriaActivaSrc
    for(let i = 0; i < numDeMiniaturas; i++){               
        if(indiceDeLoop >= galeriaActivaSrc.length){
            indiceDeLoop = 0;
        } else if (indiceDeLoop < 0){
            indiceDeLoop= galeriaActivaSrc.length;
        }
        console.log(indiceDeLoop);
        minisGaleriaIds[i].src = galeriaActivaSrc[indiceDeLoop];
        indiceDeLoop++; //          ^RESTRICCION 3: Otorgar un array con los src de cada imagen
    }
}
renderGaleria(0); //indice 0 es el default de la galeria
//Fin de render de galeria



//Inicio de eventos onclick para botones de galeria
let indice = 0;
let botonesDeGaleria = [document.getElementById('botonGaleriaIzq'), document.getElementById('botonGaleriaDer')];

botonesDeGaleria[0].onclick = () => {   //Boton para visualizar a la izquierda
    if (indice <= galeriaActivaSrc.length && indice >= 0){
        indice++;
    }
    if (indice > galeriaActivaSrc.length) {
        indice = 0;
    } 
    renderGaleria(indice);
}
botonesDeGaleria[1].onclick = () => {   //Boton para visualizar a la derecha
    if (indice <= galeriaActivaSrc.length && indice >= 0){
        indice--;
    }
    if (indice < 0) {
        indice = galeriaActivaSrc.length;
    }
    renderGaleria(indice);
}
//Fin de eventos onclick para botones de galeria 

