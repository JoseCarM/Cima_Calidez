import React from 'react';
import './App.css';
import Calendario from '../Calendario/Calendario.js'
import CantidadDeHuespedes from '../CantidadDeHuespedes/CantidadDeHuespedes'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cabana: 'todas',
      fechaDeEntrada: null,
      fechaDeSalida: null,
      huespedes: {
        numeroDeAdultos: 2,
        numeroDeNinos: 0,
        numeroDeBebes: 0,
        numeroDeMascotas: 0,
        numeroMaximoDeHuespedes: 12
      }
    }
    this.setFechasDeViaje = this.setFechasDeViaje.bind(this);
    this.setNumeroDeHuespedes = this.setNumeroDeHuespedes.bind(this);
  }
  setFechasDeViaje(objeto){
    this.setState(objeto);
  }
  setNumeroDeHuespedes(objeto){
    this.setState(objeto);
  }
  render() {
    return (
      <div className="App">
        <Calendario fechaDeEntrada={this.state.fechaDeEntrada} fechaDeSalida={this.state.fechaDeSalida} setFechasDeViaje={this.setFechasDeViaje}/>
        <CantidadDeHuespedes huespedes={this.state.huespedes} setNumeroDeHuespedes={this.setNumeroDeHuespedes}/>
      </div>
    );
  }
}

export default App;
