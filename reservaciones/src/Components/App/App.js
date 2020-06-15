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
        numeroMaximoDeHuespedes: 40
      },
      preciosBase: {
        cabana1: 1000,
        cabana2: 750,
        cabana3: 1000,
        cabana4: 850,
        cabana5: 950,
      },
      minimoDeHuespedes: {
        cabana1: 3,
        cabana2: 2,
        cabana3: 3,
        cabana4: 2,
        cabana5: 2
      },
      maximoDeHuespedes: {
        cabana1: 12,
        cabana2: 6,
        cabana3: 8,
        cabana4: 6,
        cabana5: 8
      }
    }
    this.cambioDeEstadoApp = this.cambioDeEstadoApp.bind(this);
  }
  cambioDeEstadoApp(objeto){
    this.setState(objeto);
  }
  render() {
    if(this.state.comparar){
      return(
        <div className='app'>
          <Comparador fechaDeEntrada={this.state.fechaDeEntrada} fechaDeSalida={this.state.fechaDeSalida} huespedes={this.state.huespedes} preciosBase={this.state.preciosBase} minimoDeHuespedes={this.state.minimoDeHuespedes} maximoDeHuespedes={this.state.maximoDeHuespedes} cambioDeEstadoApp={this.cambioDeEstadoApp}/>
        </div>
      )
    } else {
      return(
        <div className='app'>
          <Cabana fechaDeEntrada={this.state.fechaDeEntrada} fechaDeSalida={this.state.fechaDeSalida} huespedes={this.state.huespedes} cambioDeEstadoApp={this.cambioDeEstadoApp}/>
        </div>
      )
    }
  }
}

export default App;
