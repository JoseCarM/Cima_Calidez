import { galeriaSrc } from './GaleriasSrc.js';

//Obtencion de los elementos a manipular
let pantallaCompleta = document.getElementById('pantallaCompleta');
let imagenPantallaCompleta = document.getElementById('imagenPantallaCompleta');
let botonPantallaCompletaCerrar = document.getElementById('botonPantallaCompletaCerrar');
let botonPantallaCompletaIzq = document.getElementById('botonPantallaCompletaIzq');
let botonPantallaCompletaDer = document.getElementById('botonPantallaCompletaDer');


    

//Inicio de extraccion de los src de galerias e introduccion en galeriaActivaSrc en formato de array segun al tabActivo
let tabActivo = document.getElementById('tabActivo').innerHTML.toLocaleLowerCase(); 
let galeriaActivaSrc = [[],[]];
//Función para preecargar las imagenes que se utilizaran
const  preloadGaleria = (galeria, objetoSrc) => {
    let i = 0;
    for (const propiedad in objetoSrc) {
        // Primero hay que crear el objeto vacio antes de agregar propiedades.
        galeria[i] = {};
        galeria[i].src = objetoSrc[propiedad];
        i++;
    }
}
switch (tabActivo){
    case 'ultramarina':
        preloadGaleria(galeriaActivaSrc[0], galeriaSrc.ultramarina.imagenes);
        preloadGaleria(galeriaActivaSrc[1], galeriaSrc.ultramarina.miniaturas);
        break;
    case 'occidentalis':
        preloadGaleria(galeriaActivaSrc[0], galeriaSrc.occidentalis.imagenes);
        preloadGaleria(galeriaActivaSrc[1], galeriaSrc.occidentalis.miniaturas);
        break;
    case 'melanocephalus':
        preloadGaleria(galeriaActivaSrc[0], galeriaSrc.melanocephalus.imagenes);
        preloadGaleria(galeriaActivaSrc[1], galeriaSrc.melanocephalus.miniaturas);
        break;    
    case 'leucotis':
        preloadGaleria(galeriaActivaSrc[0], galeriaSrc.leucotis.imagenes);
        preloadGaleria(galeriaActivaSrc[1], galeriaSrc.leucotis.miniaturas);
        break
    case 'mexicanus':
        preloadGaleria(galeriaActivaSrc[0], galeriaSrc.mexicanus.imagenes);
        preloadGaleria(galeriaActivaSrc[1], galeriaSrc.mexicanus.miniaturas);
        break;        
}
//Fin de extraccion de los src de galerias e introduccion en galeriaActivaSrc en formato de array segun al tabActivo



//Inicio de logica para transiciones de imagen
const desvanecido = (elemento, cambio, tiempoDeTransicion) => {
    elemento.style.transition = `all ${tiempoDeTransicion}ms`;
    setTimeout(() => { elemento.style.opacity = 0 }, 20);
    setTimeout(cambio, tiempoDeTransicion);
    elemento.onload = () => {setTimeout(() => { elemento.style.opacity = 1 }, tiempoDeTransicion)}
}
//Fin de logica para transiciones


//Inicio de render de galeria (REUTILIZABLE CON RESTRICCIONES)
    //RESTRICCION 1: El valor de esta variable esta determinado por la estructura HTML donde se implementa
let numDeMiniaturas = 10; //8 visibles + 2 invisibles
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
        minisGaleriaIds[i].src = galeriaActivaSrc[1][indiceDeLoop].src;
        indiceDeLoop++; 
    }
    imagenPantallaCompleta.src = galeriaActivaSrc[0][inicio].src;
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


// Inicio de eventos Header
let tabMovil = document.getElementById('tabMovil');
let header = document.querySelector('header');
let menuMovilDesplegado = false;
tabMovil.onclick = () => {
    menuMovilDesplegado ? tabMovil.innerHTML = 'Desplegar menú' : tabMovil.innerHTML = 'Cerrar menu';
    menuMovilDesplegado ? header.style.height = '' : header.style.height = '400px';
    menuMovilDesplegado ? menuMovilDesplegado = false : menuMovilDesplegado = true;
}
// Fin de eventos Header
