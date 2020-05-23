//Declaración de elementos de contenido de inicio por ID
let contenidoDeAlojamientos = document.getElementById('contenidoDeAlojamientos');
let contenidoDeServicios = document.getElementById('contenidoDeServicios');
let contenidoDeUbicacion = document.getElementById('contenidoDeUbicacion');
let contenidoDeConocenos = document.getElementById('contenidoDeConocenos');

//Ocultar contenidos de inicio
contenidoDeServicios.style.display = 'none';
contenidoDeUbicacion.style.display = 'none';
contenidoDeConocenos.style.display = 'none';

//Arrays de ID
let idBotonesDeNav = ['navAlojamientos', 'navServicios', 'navUbicacion', 'navConocenos'];
let idBotonesDeMiniaturas = [
    'botonMasDetallesCab1', 'botonReservarCab1', 'botonMasDetallesCab2', 'botonReservarCab2', 
    'botonMasDetallesCab3', 'botonReservarCab3', 'botonMasDetallesCab4', 'botonReservarCab4', 
    'botonMasDetallesCab5', 'botonReservarCab5'
];

//Arrays vacios para recibir elementos por ID
let elementosDeNav = [];
let elementosBotonesMiniaturas = [];

//Generación de Array con IDs
//  Elementos de nav
idBotonesDeNav.forEach(function(boton){
    elementosDeNav.push(document.getElementById(boton));
});
//  Elementos de botones de miniaturas
idBotonesDeMiniaturas.forEach(function(boton){
    elementosBotonesMiniaturas.push(document.getElementById(boton));
});

//Event handlers de los botones de index.html
elementosDeNav.forEach(botonesNav)
elementosBotonesMiniaturas.forEach(botonesMiniaturas);

//Funciones para eventos sobre botones
//  Botones Nav
function botonesNav(boton) {
    boton.onclick = function() {
        navAlojamientos.style.zIndex = 0;
        navServicios.style.zIndex = 0;
        navUbicacion.style.zIndex = 0;
        navConocenos.style.zIndex = 0;
        event.target.style.zIndex = 2;
        contenidoDeAlojamientos.style.display = 'none';
        contenidoDeServicios.style.display = 'none';
        contenidoDeUbicacion.style.display = 'none';
        contenidoDeConocenos.style.display = 'none';
        switch (event.target.id) {
            case 'navAlojamientos':
                contenidoDeAlojamientos.style.display = '';
                break;
            case 'navServicios':
                contenidoDeServicios.style.display = '';
                break;
            case 'navUbicacion':
                contenidoDeUbicacion.style.display = '';
            break;
            case 'navConocenos':
                contenidoDeConocenos.style.display = '';
                break;
        }
    }
}
//  Botones de miniaturas
function botonesMiniaturas(boton){
    boton.onmouseenter = function() {
        event.target.style.backgroundColor = 'hsl(0, 0%, 95%)';
        event.target.style.border = 'hsl(0, 0%, 75%) 2px solid';
    }
    boton.onmouseleave = function() {
        event.target.style.backgroundColor = '';
        event.target.style.border = '';
    }
    boton.onmousedown = function() {
        event.target.style.backgroundColor = 'rgb(207,215,191)';
        event.target.style.border = 'hsl(0, 0%, 75%) 5px solid';
    }
    boton.onmouseup = function() {
        event.target.style.backgroundColor = '';
        event.target.style.border = '';
    }
}

