import React from 'react';
import './Comparador.css';
import Calendario from '../Calendario/Calendario';
import CantidadDeHuespedes from '../CantidadDeHuespedes/CantidadDeHuespedes';
import Buscar from '../Buscar/Buscar';

class Comparador extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            resultados: []
        }
        this.cambioDeEstadoComparador = this.cambioDeEstadoComparador.bind(this);
    }
    cambioDeEstadoComparador(objeto) {
        this.setState(objeto);
    }
    render() {
        return (
            <div className="App">
              <Calendario fechaDeEntrada={this.props.fechaDeEntrada} fechaDeSalida={this.props.fechaDeSalida} cambioDeEstado={this.props.cambioDeEstado}/>
              <CantidadDeHuespedes huespedes={this.props.huespedes} cambioDeEstado={this.props.cambioDeEstado}/>
              <Buscar huespedes={this.props.huespedes} fechaDeEntrada={this.props.fechaDeEntrada} fechaDeSalida={this.props.fechaDeSalida} cambioDeEstadoComparador={this.cambioDeEstadoComparador} />
            </div>
          );
    }
}

export default Comparador;