import { galeriaSrc } from './GaleriasSrc.js';

//Obtencion de los elementos a manipular
let pantallaCompleta = document.getElementById('pantallaCompleta');
let imagenPantallaCompleta = document.getElementById('imagenPantallaCompleta');
let botonPantallaCompletaCerrar = document.getElementById('botonPantallaCompletaCerrar');
let botonPantallaCompletaIzq = document.getElementById('botonPantallaCompletaIzq');
let botonPantallaCompletaDer = document.getElementById('botonPantallaCompletaDer');


    

//Inicio de extraccion de los src de galerias e introduccion en galeriaActivaSrc en formato de array segun al tabActivo
let tabActivo = document.getElementById('tabActivo').innerHTML.toLocaleLowerCase(); 
let galeriaActivaSrc = ['',''];
switch (tabActivo){
    case 'ultramarina':
        galeriaActivaSrc[0] = (Object.values(galeriaSrc.ultramarina.imagenes));
        galeriaActivaSrc[1] = (Object.values(galeriaSrc.ultramarina.miniaturas));
        break;
    case 'occidentalis':
        galeriaActivaSrc[0] = (Object.values(galeriaSrc.occidentalis.imagenes));
        galeriaActivaSrc[1] = (Object.values(galeriaSrc.occidentalis.miniaturas));
        break;
    case 'melanocephalus':
        galeriaActivaSrc[0] = (Object.values(galeriaSrc.melanocephalus.imagenes));
        galeriaActivaSrc[1] = (Object.values(galeriaSrc.melanocephalus.miniaturas));
        break;    
    case 'leucotis':
        galeriaActivaSrc[0] = (Object.values(galeriaSrc.leucotis.imagenes));
        galeriaActivaSrc[1] = (Object.values(galeriaSrc.leucotis.miniaturas));
        break
    case 'mexicanus':
        galeriaActivaSrc[0] = (Object.values(galeriaSrc.mexicanus.imagenes));
        galeriaActivaSrc[1] = (Object.values(galeriaSrc.mexicanus.miniaturas));
        break;        
}
//Fin de extraccion de los src de galerias e introduccion en galeriaActivaSrc en formato de array segun al tabActivo



//Inicio de logica para transiciones de imagen
const desvanecido = (elemento, cambio, tiempoDeTransicion) => {
    elemento.style.transition = `all ${tiempoDeTransicion}ms`;
    setTimeout(() => { elemento.style.opacity = 0 }, 20);
    setTimeout(cambio, tiempoDeTransicion);   //>>>>>>>> Pendiente de justificar los 100ms adicionals !!!!!!! <<<<<<<<
    setTimeout(() => { elemento.style.opacity = 1 }, tiempoDeTransicion + 100);
}
//Fin de logica para transiciones


//Inicio de render de galeria (REUTILIZABLE CON RESTRICCIONES)
    //RESTRICCION 1: El valor de esta variable esta determinado por la estructura HTML donde se implementa
let numDeMiniaturas = 8; 
let minisGaleriaIds = [];
for (let i = 1; i < numDeMiniaturas + 1; i++){
    //Se contruye el array con los IDs de los elementos <img>, 
    // RESTRICCION 2: esta estructura está ligada a la esctructura HTML donde se implementa, se debe modificar el string del ID y ser numerado iniciando con 1
    minisGaleriaIds.push(document.getElementById(`miniGaleria${i}`))
};
    //Se añaden los src correspondientes a los tags <img> basados en el indice
const renderGaleria = (inicio) => { 
    let indiceDeLoop = inicio; 
    //El indice del loop se encarga de generar una secuencia que solo existe entre 0 y el largo de galeriaActivaSrc
    for(let i = 0; i < numDeMiniaturas; i++){             
        if(indiceDeLoop >= galeriaActivaSrc[1].length){
            indiceDeLoop = 0;
        } else if (indiceDeLoop < 0){
            indiceDeLoop = galeriaActivaSrc[1].length;
        }
        //RESTRICCION 3: Otorgar un array con los src de cada imagen
        minisGaleriaIds[i].src = galeriaActivaSrc[1][indiceDeLoop];
        indiceDeLoop++; 
    }
    imagenPantallaCompleta.src = galeriaActivaSrc[0][inicio];
}
renderGaleria(0); //indice 0 es el default de la galeria
//Fin de render de galeria


//Inicio de eventos para botones de galeria
let indice = 0;
let play = true;
let botonesDeGaleria = ['botonGaleriaIzq', 'botonGaleriaDer', 'botonGaleriaPausaPlay'].map(Id => document.getElementById(Id));
    //Función logica para incrementar el indice global por 1 sin salir del rango 0-galeriaActivaSrc
const incrementaIndice = () => {
    if (indice <= galeriaActivaSrc[1].length && indice >= 0){
        indice ++;
    }
    if (indice >= galeriaActivaSrc[1].length) {
        indice = 0;
    }
    renderGaleria(indice);
}
    //Función logica para disminuir el indice global por 1 sin salir del rango 0-galeriaActivaSrc
const disminuyeIndice = () => {
    if (indice <= galeriaActivaSrc[1].length && indice >= 0){
        indice --;
    }
    if (indice < 0) {
        indice = galeriaActivaSrc[1].length - 1;
    }
    renderGaleria(indice);
}
    //Función para iterar el estado del boton play y la variable play
const playPausa = () => {
    if (play){
        botonesDeGaleria[2].src = "../recursos/Mas_detalles/iconos/botonGaleriaPlay.svg";
        play = false;
    } else if (!play){
        botonesDeGaleria[2].src = "../recursos/Mas_detalles/iconos/botonGaleriaPause.svg";
        play = true;
    }
}
    //Boton para visualizar a la izquierda
botonesDeGaleria[0].onclick = () => {   
    incrementaIndice();
}
    //Boton para visualizar a la derecha
botonesDeGaleria[1].onclick = () => {   
    disminuyeIndice();
}   
    //Boton play-pausa
botonesDeGaleria[2].onclick = () => {   
    playPausa();
}
    //Funcion para animar carrete
setInterval(() => {  
    if (play){
        incrementaIndice(); 
    }
}, 5000);
//Fin de eventos para botones de galeria 



//Inicia eventos para pantalla completa
    //Al hacer click en cualquer imagen de la galeria
minisGaleriaIds.forEach((mini) => {mini.onclick = () => {
    //El boton pausa cambia a play y se detiene la secuencia del carrete
    botonesDeGaleria[2].src = "../recursos/Mas_detalles/iconos/botonGaleriaPlay.svg";
    play = false;
    //Se identifica el indice de la imagen seleccionada y se le da un valor con el que se actualiza el inidce global
    let IndiceDeMiniatura = minisGaleriaIds.indexOf(document.getElementById(event.target.id));
    console.log(indice, IndiceDeMiniatura, galeriaActivaSrc[1].length)
    //El indice no debe ser mayor o igual al valor del largo de la galeriaActivaSrc
    if (indice + IndiceDeMiniatura >= galeriaActivaSrc[1].length){
        indice = indice + IndiceDeMiniatura - galeriaActivaSrc[1].length;
    } else {
        indice += IndiceDeMiniatura;
    }
    //Se actualiza la galeria
    renderGaleria(indice);
    //Se hace visible la pantalla completa
    pantallaCompleta.style.display = 'flex';
    //Sin el setTimeout no se veria la transición
    setTimeout(() => { pantallaCompleta.style.opacity = 1 }, 20)
}})
    //Eventos para el boton de cerrar
botonPantallaCompletaCerrar.onclick = () => {
    pantallaCompleta.style.opacity = '';
    setTimeout(() => {
        pantallaCompleta.style.display = '';
    }, 500);
}

botonPantallaCompletaIzq.onclick = () => {
    desvanecido(imagenPantallaCompleta, () => {
        incrementaIndice();
        renderGaleria(indice);
    }, 250);
}

botonPantallaCompletaDer.onclick = () => {
    desvanecido(imagenPantallaCompleta, () => {
        disminuyeIndice();
        renderGaleria(indice);
    }, 250);
}
//Fin eventos para pantalla completa
