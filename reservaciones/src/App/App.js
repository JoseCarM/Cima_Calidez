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
      numeroDeAdultos: 2,
      numeroDeNinos: 0,
      numeroDeBebes: 0,
      numeroDeMascotas: 0,
    }
    this.setFechasDeViaje = this.setFechasDeViaje.bind(this);
  }
  setFechasDeViaje(objeto){
    this.setState(objeto);
  }
  render() {
    return (
      <div className="App">
        <Calendario fechaDeEntrada={this.state.fechaDeEntrada} fechaDeSalida={this.state.fechaDeSalida} setFechasDeViaje={this.setFechasDeViaje}/>
        {/* <CantidadDeHuespedes numeroDeAdultos={this.state.numeroDeAdultos} numeroDeNinos={this.state.numeroDeNinos} numeroDeBebes={this.state.numeroDeBebes} numeroDeMascotas={this.state.numeroDeMascotas}/> */}
      </div>
    );
  }
}

export default App;
