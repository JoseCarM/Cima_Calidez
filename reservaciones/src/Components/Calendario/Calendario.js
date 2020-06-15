import React from 'react';
import './Calendario.css';
import Mes from '../Mes/Mes';
import botonArribaImg from './botonArriba.svg'
import botonAbajoImg from './botonAbajo.svg'


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
      this.seleccionarFecha = this.seleccionarFecha.bind(this);
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
    seleccionarFecha(fecha) {
      //Este reset evita que despues de mostrar resultados el usuario pueda seleccionar otras fechas y los 
      //resultados se sigan mostrando aunque no estén disponibles.
      this.props.cambioDeEstadoComparador({resultados: []})
      if(this.props.fechaDeEntrada === null){
        this.props.cambioDeEstadoApp({fechaDeEntrada: fecha});
      } else if(this.props.fechaDeEntrada !== null && this.props.fechaDeSalida === null){
        if(fecha <= this.props.fechaDeEntrada){
          this.props.cambioDeEstadoApp({fechaDeEntrada: fecha})
        } else {
          this.props.cambioDeEstadoApp({fechaDeSalida: fecha})
        }
      } else if(this.props.fechaDeEntrada !== null && this.props.fechaDeSalida !== null){
        this.props.cambioDeEstadoApp({
          fechaDeEntrada: fecha,
          fechaDeSalida: null
        })
      }
    }
    render() {
      return (
        <div id='presentacionDeCalendario'>
          <h1>Seleccione sus fechas</h1>
          <div id="contenedorCalendario">
              <button onClick={this.mesAnterior}><img className='botonesCalendario' src={botonArribaImg} alt='Mes anterior'/></button>
              <Mes mes={this.state.mesVisible} anio={this.state.anioVisible} fechaDeEntrada={this.props.fechaDeEntrada} fechaDeSalida={this.props.fechaDeSalida} seleccionarFecha={this.seleccionarFecha}/>
              {/* Aqui hay codigo casi repetitivo, debo buscar una manera de hacerlo DRY */}
              <Mes mes={this.segundoMesVisible()} anio={this.segundoAnioVisible()} fechaDeEntrada={this.props.fechaDeEntrada} fechaDeSalida={this.props.fechaDeSalida} seleccionarFecha={this.seleccionarFecha}/>
              <button onClick={this.mesSiguiente}><img className='botonesCalendario' src={botonAbajoImg} alt='Mes siguiente'/></button>
          </div>
        </div>

      );
    }
}


export default Calendario;