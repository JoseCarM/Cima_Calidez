import React from 'react';
import './Resultado.css'
import portadaCab1 from './portadaCab1.png'
import portadaCab2 from './portadaCab2.png'
import portadaCab3 from './portadaCab3.png'
import portadaCab4 from './portadaCab4.png'
import portadaCab5 from './portadaCab5.png'
import iconoReservar from './booking.svg'
import iconoMasDetalles from './armchair.svg'
let imagenesDePortada = ['', portadaCab1, portadaCab2, portadaCab3, portadaCab4, portadaCab5];

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
                <p>{`Cabaña ${this.props.cabana}`}</p>
                <img className='portadasResultados' src={imagenesDePortada[this.props.cabana]} alt='Portada de cabaña'/>
                <p>{`Total: $${this.props.precio}`}</p>
                <button>Reservar<img className='iconosDeBotones' src={iconoReservar} alt='Reservar' /></button><button>Más detalles<img className='iconosDeBotones' src={iconoMasDetalles} alt='Más detalles' /></button>
            </div>
        )
    }
}

export default Resultado;