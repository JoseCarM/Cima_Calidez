import React from 'react';
import './Reservar.css';

class Reservar extends React.Component {
    render(){
        return <button id={this.props.visibilidad?'botonReservar' : 'botonReservarNoVisible'} onClick={() => this.props.cambioDeEstadoApp({listoParaReservar: true, costoTotal: this.props.precio, cabanasARentar: this.props.cabanasARentar})}>Reservar</button>
    }
}

export default Reservar;