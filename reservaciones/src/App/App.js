import React from 'react';
import './App.css';
import Calendario from '../Calendario/Calendario.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className="App">
        <Calendario />
      </div>
    );
  }
}

export default App;
