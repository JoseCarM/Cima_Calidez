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
        let url = `http://localhost:8080?fechaDeEntrada=${fechaDeEntrada}&fechaDeSalida=${fechaDeSalida}`;
        const response = await fetch(url);
        const jsonResponse = await response.json();
        this.props.cambioDeEstadoComparador({ resultados: jsonResponse });
    }
    render() {
        return (
            <button onClick={this.buscar}>Buscar</button>
        )
    }
}

export default Buscar;