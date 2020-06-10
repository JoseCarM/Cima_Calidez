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
        mesVisible: new Date(Date.now()).getMonth(),
        anioVisible: new Date(Date.now()).getFullYear()
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
        if(this.state.mesActual === this.state.mesVisible){
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
      return (
        <div className="App">
            <button onClick={this.mesAnterior}><img className='botones' src={botonArribaImg}/></button>
            <Mes mes={this.state.mesVisible} anio={this.state.anioVisible}/>
            <Mes mes={this.segundoMesVisible()} anio={this.segundoAnioVisible()}/>
            <button onClick={this.mesSiguiente}><img className='botones' src={botonAbajoImg}/></button>
        </div>
      );
    }
}


export default Calendario;