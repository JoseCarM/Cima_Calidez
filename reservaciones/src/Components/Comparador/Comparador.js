import React from 'react';
import './Comparador.css';
import Calendario from '../Calendario/Calendario';
import CantidadDeHuespedes from '../CantidadDeHuespedes/CantidadDeHuespedes';
import Buscar from '../Buscar/Buscar';
import ListaDeResultados from '../ListaDeResultados/ListaDeResultados'
import numeroDeDiasEntreFechas from '../../util/numeroDeDiasEntreFechas.mjs'


class Comparador extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            resultados: [],
            nuevaBusqueda: true,
            busquedaCombinada: false
        }
        this.cambioDeEstadoComparador = this.cambioDeEstadoComparador.bind(this);
        this.toggleTipoDeBusqueda = this.toggleTipoDeBusqueda.bind(this);
    }
    cambioDeEstadoComparador(objeto) {
        this.setState(objeto);
    }
    toggleTipoDeBusqueda(){
        (this.state.busquedaCombinada)? this.setState({busquedaCombinada: false}) : this.setState({busquedaCombinada: true})
    }
    componentDidMount(){
        let huespedes = this.props.huespedes;
        huespedes.numeroDeAdultos = 2;
        huespedes.numeroDeNinos = 0;
        huespedes.numeroDeBebes = 0;
        huespedes.numeroDeMascotas = 0;
        huespedes.numeroMaximoDeHuespedes = 40;
        this.props.cambioDeEstadoApp({
            cabana: null,
            huespedes: huespedes,
            fechasOcupadas: [],
            fechaDeEntrada: null,
            fechaDeSalida: null
        })
    }
    render() {
        return (
            <div id="comparador">
                <div id='calendarioYCantidadDeHuespedes'>
                    <Calendario fechaDeEntrada={this.props.fechaDeEntrada} fechaDeSalida={this.props.fechaDeSalida} fechasOcupadas={this.props.fechasOcupadas} cambioDeEstadoComparador={this.cambioDeEstadoComparador} cambioDeEstadoApp={this.props.cambioDeEstadoApp}/>
                    <div id='cantidadDeHuespedesYBuscar'>
                        <CantidadDeHuespedes huespedes={this.props.huespedes} cambioDeEstadoApp={this.props.cambioDeEstadoApp}/>
                        <button onClick={this.toggleTipoDeBusqueda} className='botonTipoDeBusqueda'>{(this.state.busquedaCombinada)? 'Cambiar a busqueda normal' : 'Cambiar a busqueda combinada'}</button>
                        <Buscar huespedes={this.props.huespedes} fechaDeEntrada={this.props.fechaDeEntrada} fechaDeSalida={this.props.fechaDeSalida} cambioDeEstadoComparador={this.cambioDeEstadoComparador} />
                    </div>
                </div>
                <ListaDeResultados resultados={this.state.resultados} nuevaBusqueda={this.state.nuevaBusqueda} busquedaCombinada={this.state.busquedaCombinada} huespedes={this.props.huespedes} preciosBase={this.props.preciosBase} minimoDeHuespedes={this.props.minimoDeHuespedes} maximoDeHuespedes={this.props.maximoDeHuespedes} numeroDeNoches={numeroDeDiasEntreFechas(this.props.fechaDeEntrada, this.props.fechaDeSalida)} fechaDeEntrada={this.props.fechaDeEntrada} fechaDeSalida={this.props.fechaDeSalida} cambioDeEstadoApp={this.props.cambioDeEstadoApp}/>
            </div>
          );
    }
}

export default Comparador;