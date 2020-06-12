import React from 'react';
import './App.css';
import Calendario from '../Calendario/Calendario.js'
import CantidadDeHuespedes from '../CantidadDeHuespedes/CantidadDeHuespedes'
import Buscar from '../Buscar/Buscar';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cabana: 'todas',
      fechasOcupadas: [],
      fechaDeEntrada: null,
      fechaDeSalida: null,
      huespedes: {
        numeroDeAdultos: 2,
        numeroDeNinos: 0,
        numeroDeBebes: 0,
        numeroDeMascotas: 0,
        numeroMaximoDeHuespedes: 12
      },
      cabanasFechasYPrecios: {}
    }
    this.cambioDeEstado = this.cambioDeEstado.bind(this);
  }
  cambioDeEstado(objeto){
    this.setState(objeto);
  }
  render() {
    return (
      <div className="App">
        <Calendario fechaDeEntrada={this.state.fechaDeEntrada} fechaDeSalida={this.state.fechaDeSalida} cambioDeEstado={this.cambioDeEstado}/>
        <CantidadDeHuespedes huespedes={this.state.huespedes} cambioDeEstado={this.cambioDeEstado}/>
        <Buscar cabana={this.state.cabana} fechaDeEntrada={this.state.fechaDeEntrada} fechaDeSalida={this.state.fechaDeSalida} />
      </div>
    );
  }
}

export default App;
