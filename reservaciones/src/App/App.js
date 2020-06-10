import React from 'react';
import './App.css';
import Calendario from '../Calendario/Calendario.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mesVisible: new Date(Date.now()).getMonth(),
      anioVisible: new Date(Date.now()).getFullYear()
    }
    this.segundoMesVisible = this.segundoMesVisible.bind(this);
    this.segundoAnioVisible = this.segundoAnioVisible.bind(this)
  }
  segundoMesVisible() {
    if(this.state.mesVisible === 11){
      return 0;
    } else {
      return this.state.mesVisible + 1;
    }
  }
  segundoAnioVisible() {
    if(this.state.mesVisible === 11){
      return this.state.anioVisible + 1;
    } else {
      return this.state.anioVisible;
    }
  }
  render() {
    return (
      <div className="App">
        <Calendario mes={this.state.mesVisible} anio={this.state.anioVisible}/>
        <Calendario mes={this.segundoMesVisible()} anio={this.segundoAnioVisible()}/>
      </div>
    );
  }
}

export default App;
