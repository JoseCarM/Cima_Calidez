import React from 'react';
import './Cabana.css';
import Calendario from '../Calendario/Calendario';
import CantidadDeHuespedes from '../CantidadDeHuespedes/CantidadDeHuespedes';
import MasDetalles from '../MasDetalles/MasDetalles';
import Reservar from '../Reservar/Reservar';
import numeroDeDiasEntreFechas from '../../util/numeroDeDiasEntreFechas.mjs';
import calculadoraDePrecios from '../../util/calculadoraDePrecios.mjs';
import nombreDeCabana from '../../util/switchNombreDeCabana';
import portadaCab1 from '../../imagenes/portadaCab1.png'
import portadaCab2 from '../../imagenes/portadaCab2.png'
import portadaCab3 from '../../imagenes/portadaCab3.png'
import portadaCab4 from '../../imagenes/portadaCab4.png'
import portadaCab5 from '../../imagenes/portadaCab5.png'
let imagenesDePortada = ['', portadaCab1, portadaCab2, portadaCab3, portadaCab4, portadaCab5];

class Cabana extends React.Component {
        render() {
        let precio = calculadoraDePrecios(this.props.preciosBase[`cabana${this.props.cabana}`], this.props.huespedes.numeroDeAdultos, this.props.huespedes.numeroDeNinos, this.props.minimoDeHuespedes[`cabana${this.props.cabana}`], this.props.maximoDeHuespedes[`cabana${this.props.cabana}`], this.props.huespedes.numeroDeMascotas, numeroDeDiasEntreFechas(this.props.fechaDeEntrada, this.props.fechaDeSalida));
        let visibilidad = precio? true : false;
        return(
            <div id='cabana'>
                <div id='cabanaOpciones'>
                    <Calendario fechaDeEntrada={this.props.fechaDeEntrada} fechaDeSalida={this.props.fechaDeSalida} fechasOcupadas={this.props.fechasOcupadas} cambioDeEstadoApp={this.props.cambioDeEstadoApp} />
                    <CantidadDeHuespedes huespedes={this.props.huespedes} cambioDeEstadoApp={this.props.cambioDeEstadoApp}/>
                </div>
                <div id='cabanaInformacion'>
                    <h1>Cabaña {nombreDeCabana(this.props.cabana)}</h1>
                    <img src={imagenesDePortada[this.props.cabana]} alt='Portada de cabaña'></img>
                    <h2 id={precio? 'precioVisible' : 'precioNoVisible'}>{`Total: $${precio}`}</h2>
                    <div id='contenedorDeBotones'>
                        <MasDetalles />
                        <Reservar visibilidad={visibilidad} cambioDeEstadoApp={this.props.cambioDeEstadoApp} precio={precio} cabanasARentar={[this.props.cabana]}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cabana;