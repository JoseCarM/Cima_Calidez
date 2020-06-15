import React from 'react';
import './Resultado.css'

class Resultado extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cabana: '',
            fechaDeEntrada: '',
            fechaDeSalida: ''
        }
    }
    render() {
        return (
            <div className='resultados'>
                <img src='' alt=''/>
                <p>Precio</p>
                <button>Reservar</button>
            </div>
        )
    }
}

export default Resultado;