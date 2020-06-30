import React from 'react';
import './Calendario.css';
import Mes from '../Mes/Mes';
import botonArribaImg from '../../imagenes/botonArriba.svg'
import botonAbajoImg from '../../imagenes/botonAbajo.svg'


class Calendario extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        mesActual: new Date(Date.now()).getMonth(),
        anioActual: new Date(Date.now()).getFullYear(),
        mesVisible: new Date(Date.now()).getMonth(),
        anioVisible: new Date(Date.now()).getFullYear(),
      }
      this.segundoMesVisible = this.segundoMesVisible.bind(this);
      this.segundoAnioVisible = this.segundoAnioVisible.bind(this);
      this.mesAnterior = this.mesAnterior.bind(this);
      this.mesSiguiente = this.mesSiguiente.bind(this);
    }
    // Funcion dedicada a al componente del siguiente mes
    segundoMesVisible() {
      if(this.state.mesVisible === 11){
        return 0;
      } else {
        return this.state.mesVisible + 1;
      }
    }
    // Le damos un seguimiento a la cronologia del año del segundo mes visible
    segundoAnioVisible() {
      if(this.state.mesVisible === 11){
        return this.state.anioVisible + 1;
      } else {
        return this.state.anioVisible;
      }
    }
    // Funcion para visualizar meses previos, sin visualizar meses que son del pasado
    mesAnterior() {
        if(this.state.mesActual === this.state.mesVisible && this.state.anioActual === this.state.anioVisible){
            // No hace nada, no tiene sentido que la gente navegue fechas viejas
        } else {
            let mes;
            let anio;
            if(this.state.mesVisible === 0){
                mes = 11;
                anio = this.state.anioVisible - 1;
                this.setState({
                    mesVisible: mes,
                    anioVisible: anio
                })
            } else {
                mes = this.state.mesVisible - 1;
                this.setState({mesVisible: mes});
            }
        }  
    }
    // Visualizacion de meses futuros sin limite
    mesSiguiente() {
        let mes;
        let anio;
        if(this.state.mesVisible === 11){
            mes = 0;
            anio = this.state.anioVisible + 1;
            this.setState({
                mesVisible: mes,
                anioVisible: anio
            })
        } else {
            mes = this.state.mesVisible + 1;
            this.setState({mesVisible: mes});
        }
    }
    render() {
      let fechaDeEntrada = this.props.fechaDeEntrada;
      let fechaDeSalida = this.props.fechaDeSalida;
      return (
        <div id='presentacionDeCalendario'>
          <h1>Seleccione sus fechas</h1>
          <div id="contenedorCalendario">
              <button onClick={this.mesAnterior}><img className='botonesCalendario' src={botonArribaImg} alt='Mes anterior'/></button>
              <Mes mes={this.state.mesVisible} anio={this.state.anioVisible} fechaDeEntrada={this.props.fechaDeEntrada} fechaOcupadaMasCercanaAFechaDeEntrada={this.props.fechaOcupadaMasCercanaAFechaDeEntrada} fechaDeSalida={this.props.fechaDeSalida} fechasOcupadas={this.props.fechasOcupadas} cambioDeEstadoComparador={this.props.cambioDeEstadoComparador} cambioDeEstadoApp={this.props.cambioDeEstadoApp}/>
              {/* Aqui hay codigo casi repetitivo, debo buscar una manera de hacerlo DRY */}
              <Mes mes={this.segundoMesVisible()} anio={this.segundoAnioVisible()} fechaDeEntrada={this.props.fechaDeEntrada} fechaOcupadaMasCercanaAFechaDeEntrada={this.props.fechaOcupadaMasCercanaAFechaDeEntrada} fechaDeSalida={this.props.fechaDeSalida} fechasOcupadas={this.props.fechasOcupadas} cambioDeEstadoComparador={this.props.cambioDeEstadoComparador} cambioDeEstadoApp={this.props.cambioDeEstadoApp}/>
              <button onClick={this.mesSiguiente}><img className='botonesCalendario' src={botonAbajoImg} alt='Mes siguiente'/></button>
          </div>
          <div id='fechaDeEntradaYSalida'> 
            <table>
              <thead>
                <tr>
                  <th>Fecha de entrada</th>
                  <th>Fecha de salida</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{fechaDeEntrada? fechaDeEntrada.getDate() + '/' : ''}{fechaDeEntrada? fechaDeEntrada.getMonth() + '/' : ''}{fechaDeEntrada? fechaDeEntrada.getFullYear() : ''}</td>
                  <td>{fechaDeSalida? fechaDeSalida.getDate() + '/' : ''}{fechaDeSalida? fechaDeSalida.getMonth() + '/' : ''}{fechaDeSalida? fechaDeSalida.getFullYear() : ''}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      );
    }
}


export default Calendario;