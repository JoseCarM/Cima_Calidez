import React from 'react';
import './PanelDeReservacion.css';
import nombreDeCabana from '../../util/switchNombreDeCabana';
import fechaLarga from '../../util/fechaLarga';
import portadaCab1 from '../../imagenes/portadaCab1.png'
import portadaCab2 from '../../imagenes/portadaCab2.png'
import portadaCab3 from '../../imagenes/portadaCab3.png'
import portadaCab4 from '../../imagenes/portadaCab4.png'
import portadaCab5 from '../../imagenes/portadaCab5.png'
import BotonPaypal from '../BotonPaypal/BotonPaypal';
let imagenesDePortada = ['', portadaCab1, portadaCab2, portadaCab3, portadaCab4, portadaCab5];


class PanelDeReservacion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            datosDeUsuarioValidos: false,
            datosDeUsuario: {
                nombre: '',
                telefono: '',
                correoElectronico: ''
            }
        }
        this.continuarAPaypal = this.continuarAPaypal.bind(this);
    }
    renderCabanas(){
        let cabanas = [];
        for(let i = 0; i < this.props.cabanasARentar.length; i++){
            cabanas.push(<div key={this.props.cabanasARentar[i]} className='cabanasARentar'><h2>Cabaña {nombreDeCabana(this.props.cabanasARentar[i])}</h2><img src={imagenesDePortada[this.props.cabanasARentar[i]]} alt='imagen de portada de cabaña'/></div>);
        }
        return cabanas;
    }
    componentDidMount(){
        setTimeout(() => {document.getElementById('panelDeReservacion').style.opacity = 1}, 0);
    }
    continuarAPaypal(){
        let formDatosDelCliente = document.forms['formDatosDelCliente'];
        if(formDatosDelCliente.reportValidity()){
            this.setState({
                datosDeUsuarioValidos: true,
                datosDeUsuario: {
                    nombre: document.getElementById('nombre').value,
                    telefono: document.getElementById('telefono').value,
                    correoElectronico: document.getElementById('correoElectronico').value
                }
            })
        }
    } 
    render(){
        let huespedes = this.props.huespedes;
        return(
            <div id='panelDeReservacion'>
                <button id='botonRegresar' onClick={() => this.props.cambioDeEstadoApp({listoParaReservar: false, costoTotal: '', cabanasARentar: null})}>Regresar</button>
                <div id='reservacion'>
                    <section id='datosDeReservacion'>
                        <h1>Informacion de la reservación</h1>
                        <div id='contenedorCabanasARentar'>{this.renderCabanas()}</div>
                        <div>
                            <h3>Entrada: {fechaLarga(this.props.fechaDeEntrada)}, 4:00pm hora local</h3>
                            <h3>Salida: {fechaLarga(this.props.fechaDeSalida)}, 12:00pm hora local</h3>
                        </div>
                        <div>
                            {(huespedes.numeroDeAdultos > 0)? <h3>Adultos: {huespedes.numeroDeAdultos}</h3> : ''}
                            {(huespedes.numeroDeNinos > 0)? <h3>Niños: {huespedes.numeroDeNinos}</h3> : ''}
                            {(huespedes.numeroDeBebes > 0)? <h3>Bebes: {huespedes.numeroDeBebes}</h3> : ''}
                            {(huespedes.numeroDeMascotas > 0)? <h3>Mascotas: {huespedes.numeroDeMascotas}</h3> : ''}  
                        </div>
                        <h3>Total a pagar: ${this.props.costoTotal} MXN</h3>
                    </section>
                    <section id='datosDelCliente'>
                        <h1>Información de usuario</h1>
                        {!this.state.datosDeUsuarioValidos && (
                            <form id='formDatosDelCliente'>
                                <label htmlFor='nombre'>Nombre completo y apellidos</label>
                                <br/>
                                <input type='text' id='nombre' required></input>
                                <br/>
                                <label htmlFor='telefono'>Telefono o celular</label>
                                <br/>
                                <input type='tel' id='telefono' minLength='8' required></input>
                                <br/>
                                <label htmlFor='correoElectronico'>email</label>
                                <br/>
                                <input type='email' id='correoElectronico' required></input>
                                <br/>
                                <input type='checkbox' id='aceptaReglamento' name='aceptaReglamento' required></input><label htmlFor='aceptaReglamento'>He leido y acepto el </label><a>Reglamento interno de Cima Calidez</a>
                                <br/>
                                <input type='button' value='Continuar a pago' onClick={this.continuarAPaypal}></input>
                            </form>
                        )}
                        {this.state.datosDeUsuarioValidos && (
                            <div>
                                <h2>Nombre: {this.state.datosDeUsuario.nombre}</h2>
                                <br/>
                                <h2>Teléfono: {this.state.datosDeUsuario.telefono}</h2>
                                <br/>
                                <h2>email: {this.state.datosDeUsuario.correoElectronico}</h2>
                                <br/>
                                <button onClick={() => this.setState({datosDeUsuarioValidos: false})}>Editar</button>
                            </div>
                        )}
                    </section>
                </div>
                {this.state.datosDeUsuarioValidos && (
                    <section id='seccionPaypal'>
                        <BotonPaypal costoTotal={this.props.costoTotal} visibilidad={this.state.datosDeUsuarioValidos}/>
                    </section>
                )}
            </div>
        );
    }
}

export default PanelDeReservacion;