//Array de IDs de elementos de los distintos contenidos
let contenidoId = ['contenidoDeAlojamientos', 'contenidoDeServicios', 'contenidoDeUbicacion', 'contenidoDeConocenos'].map(id => document.getElementById(id));
//Array de IDs de elementos de Nav
let botonesNavId = ['navAlojamientos', 'navServicios', 'navUbicacion', 'navConocenos'].map(id => document.getElementById(id));
//Caracteristica default para que al principio solo el contenido de Laojamientos sea visible
contenidoId[1].style.display = 'none';
contenidoId[2].style.display = 'none';
contenidoId[3].style.display = 'none';
//Funcion para cambiar el z-index de los botones nav y para cambiar la propiedad display de los contenidos ligados a cada boton
function botonesNav(boton) {
    boton.onclick = function() {
        botonesNavId.forEach(elemento => elemento.style.zIndex = 0);
        event.target.style.zIndex = 2;
        contenidoId.forEach(elemento => elemento.style.display = 'none');
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
botonesNavId.forEach(botonesNav);



