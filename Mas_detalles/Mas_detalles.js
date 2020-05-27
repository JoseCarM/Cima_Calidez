import { galeriaSrc } from './GaleriasSrc.js';

//Obtencion de los elementos a manipular
let pantallaCompleta = document.getElementById('pantallaCompleta');
let imagenPantallaCompleta1 = document.getElementById('imagenPantallaCompleta1');
let galeriaMiniNoVisible = document.getElementById('galeriaMiniNoVisible');
let botonPantallaCompletaCerrar = document.getElementById('botonPantallaCompletaCerrar');
let botonPantallaCompletaIzq = document.getElementById('botonPantallaCompletaIzq');
let botonPantallaCompletaDer = document.getElementById('botonPantallaCompletaDer');

console.time("Body");

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
let numDeMiniaturasVisibles = 8;
let longitudDeGaleria = galeriaActivaSrc[1].length;
let minisGaleriaIds = [];
let galeriaPantallaCompletaIds = [];

for (let i = 1; i <= longitudDeGaleria; i++){
    //Se contruye el array con los IDs de los elementos <img>, 
    if (i <= 8) {
        //Se generan los primero id de los elementos existentes
        minisGaleriaIds.push(document.getElementById(`miniGaleria${i}`))
    } else if ( i > 8 ) {
        // Se generan lo nuevos elementos invisibles de la galeria mini
        let nuevoImgTag = document.createElement("img");
        nuevoImgTag.setAttribute('id', `miniGaleria${i}`);
        galeriaMiniNoVisible.appendChild(nuevoImgTag);
        minisGaleriaIds.push(nuevoImgTag);
    }
    if (i > 1){
        // Se generan los nuevos elementos invisibles de la pantalla completa
        let nuevoImgTag = document.createElement("img");
        nuevoImgTag.setAttribute('id', `imagenPantallaCompleta${i}`);
        nuevoImgTag.setAttribute('class', 'galeriaNoVisible');
        pantallaCompleta.appendChild(nuevoImgTag);
        galeriaPantallaCompletaIds.push(nuevoImgTag);
    }
};




//Cambio de ids entre img tags
const renderGaleria = (inicio) => { 
    let indiceDeLoop = inicio; 
    //El indice del loop se encarga de generar una secuencia que solo existe entre 0 y el largo de galeriaActivaSrc
    for(let i = 0; i < longitudDeGaleria; i++){             
        if(indiceDeLoop >= longitudDeGaleria){
            indiceDeLoop = 0;
        } else if (indiceDeLoop < 0){
            indiceDeLoop = longitudDeGaleria;
        }
        //RESTRICCION 3: Otorgar un array con los src de cada imagen
            minisGaleriaIds[i].src = galeriaActivaSrc[1][indiceDeLoop].src;
            indiceDeLoop++;   
    }
    imagenPantallaCompleta1.src = galeriaActivaSrc[0][inicio].src;
}



//Inicio de eventos para botones de galeria
let indice = 0;
renderGaleria(indice);
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
    //Boton para visualizar a la derecha
botonesDeGaleria[0].onclick = () => {   
    disminuyeIndice();
}
    //Boton para visualizar a la izquierda
botonesDeGaleria[1].onclick = () => {   
    incrementaIndice();
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
    desvanecido(imagenPantallaCompleta1, () => {
        incrementaIndice();
        renderGaleria(indice);
    }, 250);
}

botonPantallaCompletaDer.onclick = () => {
    desvanecido(imagenPantallaCompleta1, () => {
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



//Una vez que termina de cargar el elemento body se inicia la carga de todas la imagenes no visibles
document.querySelector('body').onload = () => {
    console.timeLog("Body");
    console.time("imgMiniInv"); //Se agregan timers para control
    console.time("imgFullInv");
    for(let i = numDeMiniaturasVisibles; i < longitudDeGaleria; i++){             
        minisGaleriaIds[i].src = galeriaActivaSrc[1][i].src;
        minisGaleriaIds[i].onload = () => {
            console.log(`${minisGaleriaIds[i].id} finalizo la carga`);
            console.timeLog("imgMiniInv");
        }
    }
    for(let i = 0; i < longitudDeGaleria - 1; i++){
        galeriaPantallaCompletaIds[i].src = galeriaActivaSrc[0][i + 1].src;
        galeriaPantallaCompletaIds[i].onload = () => {
            console.log(`${galeriaPantallaCompletaIds[i].id} finalizo la carga`);
            console.timeLog("imgFullInv");
        }
    }
}