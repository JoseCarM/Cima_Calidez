import React from 'react';
import './Buscar.css';

class Buscar extends React.Component {
    constructor(props){
        super(props);
        this.buscar = this.buscar.bind(this);
    }
    async buscar(cabana, fechaDeEntrada, fechaDeSalida) {
        const response = await fetch(`http://localhost:8080?cabana=${cabana}&fechaDeEntrada=${fechaDeEntrada}&fechaDeSalida=${fechaDeSalida}`);
        const response_1 = await response.json();
        this.props.cambioDeEstado({ cabanasFechasYPrecios: response_1 });
    }
    render() {
        return (
            <button onClick={this.buscar}>Buscar</button>
        )
    }
}

export default Buscar;