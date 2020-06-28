import React from 'react';
import './PanelDeReservacion.css';
import nombreDeCabana from '../../util/switchNombreDeCabana';
import fechaLarga from '../../util/fechaLarga';
import generadorDeCodigoTemp from '../../util/generadorDeCodigoTemp';
import portadaCab1 from '../../imagenes/portadaCab1.png'
import portadaCab2 from '../../imagenes/portadaCab2.png'
import portadaCab3 from '../../imagenes/portadaCab3.png'
import portadaCab4 from '../../imagenes/portadaCab4.png'
import portadaCab5 from '../../imagenes/portadaCab5.png'
import BotonPaypal from '../BotonPaypal/BotonPaypal';
let imagenesDePortada = ['', portadaCab1, portadaCab2, portadaCab3, portadaCab4, portadaCab5];
let reservacion = {};
function cancelarReservacion(datos){
    let url = `http://192.168.1.70:8080/reservacion`;
    fetch(url, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(datos)
    });
}


class PanelDeReservacion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            datosDeUsuarioValidos: false,
            datosDeUsuario: {
                nombre: '',
                telefono: '',
                correoElectronico: ''
            },
            porcentajeDePrimerPago: 50,
        }
        this.continuarAPaypal = this.continuarAPaypal.bind(this);
        this.cambioSliderAnticipo = this.cambioSliderAnticipo.bind(this);
        this.registrarReservacion = this.registrarReservacion.bind(this);
        this.regresar  = this.regresar.bind(this)
    }
    async registrarReservacion(datos){
        let url = `http://192.168.1.70:8080/reservacion`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datos)
        });
        console.log(response);
    }
    renderCabanas(){
        let cabanas = [];
        for(let i = 0; i < this.props.cabanasARentar.length; i++){
            cabanas.push(<div key={this.props.cabanasARentar[i]} className='cabanasARentar'><h2>Cabaña {nombreDeCabana(this.props.cabanasARentar[i])}</h2><img src={imagenesDePortada[this.props.cabanasARentar[i]]} alt='imagen de portada de cabaña'/></div>);
        }
        return cabanas;
    }
    componentDidMount(){
        reservacion.codigoDeReservacion = generadorDeCodigoTemp();
        reservacion.cabana = this.props.cabanasARentar.join('-');
        reservacion.fechaDeEntrada = this.props.fechaDeEntrada;
        reservacion.fechaDeSalida = this.props.fechaDeSalida;
        reservacion.numeroDeAdultos = this.props.huespedes.numeroDeAdultos;
        reservacion.numeroDeNinos = this.props.huespedes.numeroDeNinos;
        reservacion.numeroDeBebes = this.props.huespedes.numeroDeBebes;
        reservacion.numeroDeMascotas = this.props.huespedes.numeroDeMascotas;
        reservacion.costoTotal = this.props.costoTotal;
        this.registrarReservacion(reservacion);
        setTimeout(() => {document.getElementById('panelDeReservacion').style.opacity = 1}, 0);
        document.getElementById('porcentajeDePrimerPago').innerHTML = this.state.porcentajeDePrimerPago + '%';
        let primerPago = this.props.costoTotal * (0.01 * this.state.porcentajeDePrimerPago);
        primerPago = primerPago.toFixed(2);
        let segundoPago = this.props.costoTotal * ( 1 - (0.01 * this.state.porcentajeDePrimerPago))
        segundoPago = segundoPago.toFixed(2);
        document.getElementById('textoPrimerPago').innerHTML = `Primer pago hoy: $${primerPago} MXN`;
        document.getElementById('textoSegundoPago').innerHTML = `Segundo pago el día de entrada: $${segundoPago} MXN`;
        reservacion.anticipo = primerPago;
        reservacion.pagoPendiente = segundoPago;
    }
    cambioSliderAnticipo() {
        this.setState({porcentajeDePrimerPago: document.getElementById('anticipo').value})
        document.getElementById('porcentajeDePrimerPago').innerHTML = this.state.porcentajeDePrimerPago + '%';
        let primerPago = this.props.costoTotal * (0.01 * this.state.porcentajeDePrimerPago);
        primerPago = primerPago.toFixed(2);
        let segundoPago = this.props.costoTotal * ( 1 - (0.01 * this.state.porcentajeDePrimerPago));
        segundoPago = segundoPago.toFixed(2);
        document.getElementById('textoPrimerPago').innerHTML = `Primer pago hoy: $${primerPago} MXN`;
        document.getElementById('textoSegundoPago').innerHTML = `Segundo pago el día de entrada: $${segundoPago} MXN`;
        reservacion.anticipo = primerPago;
        reservacion.pagoPendiente = segundoPago;
    }
    regresar(){
        cancelarReservacion(reservacion);
        this.props.cambioDeEstadoApp({listoParaReservar: false, costoTotal: '', cabanasARentar: null})
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
                <button id='botonRegresar' onClick={this.regresar}>Regresar</button>
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
                        {!this.state.datosDeUsuarioValidos && (
                            <form>
                                <p>Selecciones un porcentaje de anticipo</p><input type='range' min='50' max='100' id='anticipo' name='anticipo' onChange={this.cambioSliderAnticipo}></input>
                                <label htmlFor='anticipo' id='porcentajeDePrimerPago'></label>
                            </form>
                        )}
                        <h4 id='textoPrimerPago'>Primer pago hoy: ${reservacion.primerPago} MXN</h4>
                        <h4 id='textoSegundoPago'>Segundo pago el día de entrada: ${reservacion.segundoPago} MXN</h4>
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
                                <input type='checkbox' id='aceptaReglamento' name='aceptaReglamento' required></input><label htmlFor='aceptaReglamento'>He leido y acepto el Reglamento interno de Cima Calidez</label>
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
                        <BotonPaypal costoTotal={this.props.costoTotal * (0.01 * this.state.porcentajeDePrimerPago).toFixed(2)} visibilidad={this.state.datosDeUsuarioValidos}/>
                    </section>
                )}
            </div>
        );
    }
}

window.addEventListener('beforeunload', function (e) {
    cancelarReservacion(reservacion)
  });

export default PanelDeReservacion;