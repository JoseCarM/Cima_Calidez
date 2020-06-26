import React from 'react';
import './Menu.css';
import logo from '../../imagenes/logo.png';
import iconoComparador from '../../imagenes/compare.svg';
import cabezaAveAzul from '../../imagenes/cabezaAveAzul.png';
import cabezaJilguero from '../../imagenes/cabezaJilguero.png';
import cabezaTigrillo from '../../imagenes/cabezaTigrillo.png';
import cabezaColibri from '../../imagenes/cabezaColibri.png';
import cabezaCoa from '../../imagenes/cabezaCoa.png';

class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {desplegado: false};
        this.desplegarMenu = this.desplegarMenu.bind(this);
        this.cerrarMenu = this.cerrarMenu.bind(this);
        this.abrirComparador = this.abrirComparador.bind(this);
        this.cerrarComparador = this.cerrarComparador.bind(this);
        this.abrirCabana = this.abrirCabana.bind(this);
    }
    desplegarMenu(){
        this.setState({desplegado: true});
    }
    cerrarMenu(){
        this.setState({desplegado: false});
    }
    abrirComparador(){
        this.props.cambioDeEstadoApp({comparar: true});
    }
    cerrarComparador(){
        this.props.cambioDeEstadoApp({comparar: false});
    }
    abrirCabana(event){
        this.abrirComparador();
        this.cerrarComparador();
        let cabana;
        if(event.target.id === 'menuCab1' || event.target.id === 'imgMenuCab1' || event.target.id === 'textoMenuCab1'){
            cabana = 1;
        } else if(event.target.id === 'menuCab2' || event.target.id === 'imgMenuCab2' || event.target.id === 'textoMenuCab2'){
            cabana = 2;
        } else if(event.target.id === 'menuCab3' || event.target.id === 'imgMenuCab3' || event.target.id === 'textoMenuCab3'){
            cabana = 3;
        } else if(event.target.id === 'menuCab4' || event.target.id === 'imgMenuCab4' || event.target.id === 'textoMenuCab4'){
            cabana = 4;
        } else if(event.target.id === 'menuCab5' || event.target.id === 'imgMenuCab5' || event.target.id === 'textoMenuCab5'){
            cabana = 5;
        }
        this.props.cambioDeEstadoApp({cabana: cabana});
    }
    render(){
        return(
            <div id='menu'>
                <button onFocus={this.desplegarMenu} onBlur={this.cerrarMenu} id='botonMenu'>
                    <p>Menú</p>
                </button>
                <div id='contenedorOpcionesMenu'>
                    <div id={this.state.desplegado? 'menuInicio' : 'menuInicioNoVisible'} className={this.state.desplegado? 'itemsDeMenu' : 'itemsDeMenuNoVisibles'}>
                        <img src={logo} alt='Logo Cima Calidez' />
                        <p>Inicio</p>
                    </div>
                    <div id={(this.state.desplegado && !this.props.comparar)? 'menuComparador' : 'menuComparadorNoVisible'} className={this.state.desplegado && !this.props.comparar? 'itemsDeMenu' : 'itemsDeMenuNoVisibles'} onMouseDown={this.abrirComparador}>
                        <img src={iconoComparador} alt='Comparar precios y disponibilidad' />
                        <p>Comparar</p>
                    </div>
                    <div onMouseDown={this.abrirCabana} id='menuCab1' className={this.state.desplegado? 'itemsDeMenu' : 'itemsDeMenuNoVisibles'}>
                        <img id='imgMenuCab1' src={cabezaAveAzul} alt='Portada Cabaña Ave azul' />
                        <p id='textoMenuCab1'>Cabaña Ave azul</p>
                    </div>
                    <div onMouseDown={this.abrirCabana} id='menuCab2' className={this.state.desplegado? 'itemsDeMenu' : 'itemsDeMenuNoVisibles'}>
                        <img id='imgMenuCab2' src={cabezaJilguero} alt='Portada Cabaña Jilguero' />
                        <p id='textoMenuCab2'>Cabaña Jilguero</p>
                    </div>
                    <div onMouseDown={this.abrirCabana} id='menuCab3' className={this.state.desplegado? 'itemsDeMenu' : 'itemsDeMenuNoVisibles'}>
                        <img id='imgMenuCab3' src={cabezaTigrillo} alt='Portada Cabaña Tigrillo' />
                        <p id='textoMenuCab3'>Cabaña Tigrillo</p>
                    </div>
                    <div onMouseDown={this.abrirCabana} id='menuCab4' className={this.state.desplegado? 'itemsDeMenu' : 'itemsDeMenuNoVisibles'}>
                        <img id='imgMenuCab4' src={cabezaColibri} alt='Portada Cabaña Colibrí' />
                        <p id='textoMenuCab4'>Cabaña Colibrí</p>
                    </div>
                    <div onMouseDown={this.abrirCabana} id='menuCab5' className={this.state.desplegado? 'itemsDeMenu' : 'itemsDeMenuNoVisibles'}>
                        <img id='imgMenuCab5' src={cabezaCoa} alt='Portada Cabaña Coa' />
                        <p id='textoMenuCab5'>Cabaña Coa</p>
                    </div>
                </div>
            </div>

        )
    }
}

export default Menu;