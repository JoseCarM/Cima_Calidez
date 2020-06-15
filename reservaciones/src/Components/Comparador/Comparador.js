import React from 'react';
import './Comparador.css';
import Calendario from '../Calendario/Calendario';
import CantidadDeHuespedes from '../CantidadDeHuespedes/CantidadDeHuespedes';
import Buscar from '../Buscar/Buscar';
import ListaDeResultados from '../ListaDeResultados/ListaDeResultados'
// const numeroDeDiasEntreFechas = require('../../util/numeroDeDiasEntreFechas.mjs');
import numeroDeDiasEntreFechas from '../../util/numeroDeDiasEntreFechas.mjs'

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
            <div id="comparador">
                <div id='calendarioYCantidadDeHuespedes'>
                    <Calendario fechaDeEntrada={this.props.fechaDeEntrada} fechaDeSalida={this.props.fechaDeSalida} cambioDeEstadoComparador={this.cambioDeEstadoComparador} cambioDeEstadoApp={this.props.cambioDeEstadoApp}/>
                    <div id='cantidadDeHuespedesYBuscar'>
                        <CantidadDeHuespedes huespedes={this.props.huespedes} cambioDeEstadoApp={this.props.cambioDeEstadoApp}/>
                        <Buscar huespedes={this.props.huespedes} fechaDeEntrada={this.props.fechaDeEntrada} fechaDeSalida={this.props.fechaDeSalida} cambioDeEstadoComparador={this.cambioDeEstadoComparador} />
                    </div>
                </div>
                <ListaDeResultados resultados={this.state.resultados} huespedes={this.props.huespedes} preciosBase={this.props.preciosBase} minimoDeHuespedes={this.props.minimoDeHuespedes} maximoDeHuespedes={this.props.maximoDeHuespedes} numeroDeNoches={numeroDeDiasEntreFechas(this.props.fechaDeEntrada, this.props.fechaDeSalida)}/>
            </div>
          );
    }
}

export default Comparador;