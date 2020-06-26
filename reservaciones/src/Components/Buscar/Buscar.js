import React from 'react';
import './Buscar.css';

class Buscar extends React.Component {
    constructor(props){
        super(props);
        this.buscar = this.buscar.bind(this);
    }
    async buscar() {
        let fechaDeEntrada = this.props.fechaDeEntrada;
        let fechaDeSalida = this.props.fechaDeSalida;
        let url = `http://192.168.1.70:8080/comparador?fechaDeEntrada=${fechaDeEntrada}&fechaDeSalida=${fechaDeSalida}`;
        if(fechaDeEntrada !== null && fechaDeSalida !== null){
            const response = await fetch(url);
            const jsonResponse = await response.json();
            this.props.cambioDeEstadoComparador({ 
                resultados: jsonResponse,
                nuevaBusqueda: false
             });
            let listaDeResultados;
            document.getElementById('listaDeResultadosColumna')? listaDeResultados = document.getElementById('listaDeResultadosColumna') : listaDeResultados = document.getElementById('listaDeResultadosFila');
            listaDeResultados.scrollIntoView({behavior: 'smooth'});
        }
    }
    render() {
        return (
            <button id='botonBuscar' onClick={this.buscar}>Buscar</button>
        )
    }
}

export default Buscar;