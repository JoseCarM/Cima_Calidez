import React from 'react';
import './App.css';
import Comparador from '../Comparador/Comparador';
import Cabana from '../Cabana/Cabana';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      comparar: true,
      fechasOcupadas: [],
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
    this.cambioDeEstado = this.cambioDeEstado.bind(this);
  }
  cambioDeEstado(objeto){
    this.setState(objeto);
  }
  render() {
    if(this.state.comparar){
      return(
        <div>
          <Comparador fechaDeEntrada={this.state.fechaDeEntrada} fechaDeSalida={this.state.fechaDeSalida} huespedes={this.state.huespedes} cambioDeEstado={this.cambioDeEstado}/>
        </div>
      )
    } else {
      return(
        <div>
          <Cabana fechaDeEntrada={this.state.fechaDeEntrada} fechaDeSalida={this.state.fechaDeSalida} huespedes={this.state.huespedes} cambioDeEstado={this.cambioDeEstado}/>
        </div>
      )
    }
  }
}

export default App;
