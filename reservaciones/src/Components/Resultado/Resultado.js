import React from 'react';
import './Resultado.css';
import MasDetalles from '../MasDetalles/MasDetalles';
import Reservar from '../Reservar/Reservar';
import nombreDeCabana from '../../util/switchNombreDeCabana';
import portadaCab1 from '../../imagenes/portadaCab1.png'
import portadaCab2 from '../../imagenes/portadaCab2.png'
import portadaCab3 from '../../imagenes/portadaCab3.png'
import portadaCab4 from '../../imagenes/portadaCab4.png'
import portadaCab5 from '../../imagenes/portadaCab5.png'
let imagenesDePortada = ['', portadaCab1, portadaCab2, portadaCab3, portadaCab4, portadaCab5];

class Resultado extends React.Component {
    render() {
        return (
            <div className='resultados'>
                <p>{`Cabaña ${nombreDeCabana(this.props.cabana)}`}</p>
                <img className='portadasResultados' src={imagenesDePortada[this.props.cabana]} alt='Portada de cabaña'/>
                <p>{`Total: $${this.props.precio}`}</p>
                <Reservar visibilidad={true} cambioDeEstadoApp={this.props.cambioDeEstadoApp} precio={this.props.precio} cabanasARentar={[this.props.cabana]}/>
                <MasDetalles />
            </div>
        )
    }
}

export default Resultado;