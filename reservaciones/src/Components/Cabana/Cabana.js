import React from 'react';
import './Cabana.css';
import Calendario from '../Calendario/Calendario';
import CantidadDeHuespedes from '../CantidadDeHuespedes/CantidadDeHuespedes';

class Cabana extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cabana: null
        }
    }
    render() {
        return(
            <div>
                <Calendario fechaDeEntrada={this.props.fechaDeEntrada} fechaDeSalida={this.props.fechaDeSalida} cambioDeEstadoApp={this.props.cambioDeEstadoApp}/>
                <CantidadDeHuespedes huespedes={this.props.huespedes} cambioDeEstadoApp={this.props.cambioDeEstadoApp}/>
            </div>
        );
    }
}

export default Cabana;