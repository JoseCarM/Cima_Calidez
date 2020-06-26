import React from 'react';
import './App.css';
import PanelDeReservacion from '../PanelDeReservacion/PanelDeReservacion';
import Comparador from '../Comparador/Comparador';
import Cabana from '../Cabana/Cabana';
import Menu from '../Menu/Menu';
import diasDelMes from '../../util/diasDelMes';
import numeroDeDiasEntreFechas from '../../util/numeroDeDiasEntreFechas.mjs';
import sqlToJsDate from '../../util/SQLtoJSDateParser';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listoParaReservar: false,
      cabanasARentar: null,
      comparar: true,
      cabana: null,
      fechasOcupadas: [],
      fechaDeEntrada: null,
      fechaDeSalida: null,
      huespedes: {
        numeroDeAdultos: 2,
        numeroDeNinos: 0,
        numeroDeBebes: 0,
        numeroDeMascotas: 0,
        numeroMaximoDeHuespedes: ''
      },
      costoTotal: '',
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
    this.cambiarNumeroMaximoDeHuespedes = this.cambiarNumeroMaximoDeHuespedes.bind(this);
    this.buscaFechasOcupadas = this.buscaFechasOcupadas.bind(this);
  }
  cambioDeEstadoApp(objeto){
    this.setState(objeto);
  }
  cambiarNumeroMaximoDeHuespedes(){
    if(this.state.cabana !== null){
      //Cambiamos el numero maximo de huespedes permitido según la cabaña
      let huespedes = this.state.huespedes;
      huespedes.numeroMaximoDeHuespedes = this.state.maximoDeHuespedes[`cabana${this.state.cabana}`];
      this.cambioDeEstadoApp({huespedes: huespedes});
    }
  }
  async buscaFechasOcupadas(){
    //Iniciamos nuestra consulta
    let url = `http://192.168.1.70:8080/disponibilidad_de_cabana?cabana=${this.state.cabana}`;
    if(this.state.cabana !== null){
        const response = await fetch(url);
        const jsonResponse = await response.json();
        const reservaciones = await jsonResponse;
        let fechasOcupadas = [];
        reservaciones.forEach(reservacion => {
            let fechaDeEntrada = sqlToJsDate(reservacion.fechaDeEntrada);
            let fechaDeSalida = sqlToJsDate(reservacion.fechaDeSalida);
                let diaDelMes = fechaDeEntrada.getDate();
                let numeroDeMes = fechaDeEntrada.getMonth();
                let anio = fechaDeEntrada.getFullYear();
                fechasOcupadas.push(new Date(anio, numeroDeMes, diaDelMes));
                //Muy importante restar 1 al numero de días entre fechas ya que la fecha de salida no se cuenta como ocupada
            for(let i = 0; i < numeroDeDiasEntreFechas(fechaDeEntrada, fechaDeSalida) - 1; i++){
                if(diaDelMes + 1 > diasDelMes(numeroDeMes)){
                    diasDelMes = 1;
                    if(numeroDeMes + 1 > 11){
                        numeroDeMes = 1;
                        anio++;
                    } else {
                        numeroDeMes++;
                    }
                } else {
                    diaDelMes++;
                }
                fechasOcupadas.push(new Date(anio, numeroDeMes, diaDelMes));
            }
        })
        this.cambioDeEstadoApp({fechasOcupadas: fechasOcupadas})
    }
  }
  componentDidMount(){
    this.cambiarNumeroMaximoDeHuespedes();
    this.buscaFechasOcupadas();
  }
  componentDidUpdate(prevProps, prevState){
    if(this.state.cabana !== prevState.cabana){
      this.cambiarNumeroMaximoDeHuespedes();
      this.buscaFechasOcupadas();
      let huespedes = this.state.huespedes;
      huespedes.numeroDeAdultos = 2;
      huespedes.numeroDeNinos = 0;
      huespedes.numeroDeBebes = 0;
      huespedes.numeroDeMascotas = 0;
      this.setState({
        huespedes: huespedes,
        fechaDeEntrada: null,
        fechaDeSalida: null
      })
    }
  }
  render() {
    if(this.state.listoParaReservar){
      return(
        <PanelDeReservacion cabanasARentar={this.state.cabanasARentar} fechaDeEntrada={this.state.fechaDeEntrada} fechaDeSalida={this.state.fechaDeSalida} huespedes={this.state.huespedes} costoTotal={this.state.costoTotal} cambioDeEstadoApp={this.cambioDeEstadoApp}/>
      )
    } else {
      if(this.state.comparar){
        return(
          <div id='app'>
            <Menu comparar={this.state.comparar} cambioDeEstadoApp={this.cambioDeEstadoApp}/>
            <Comparador fechaDeEntrada={this.state.fechaDeEntrada} fechaDeSalida={this.state.fechaDeSalida} huespedes={this.state.huespedes} preciosBase={this.state.preciosBase} minimoDeHuespedes={this.state.minimoDeHuespedes} maximoDeHuespedes={this.state.maximoDeHuespedes} fechasOcupadas={this.state.fechasOcupadas} cambioDeEstadoApp={this.cambioDeEstadoApp} />
          </div>
        )
      } else {
        return(
          <div id='app'>
            <Menu cambioDeEstadoApp={this.cambioDeEstadoApp} />
            <Cabana cabana={this.state.cabana} fechaDeEntrada={this.state.fechaDeEntrada} fechaDeSalida={this.state.fechaDeSalida} huespedes={this.state.huespedes} preciosBase={this.state.preciosBase} minimoDeHuespedes={this.state.minimoDeHuespedes} maximoDeHuespedes={this.state.maximoDeHuespedes} fechasOcupadas={this.state.fechasOcupadas} cambioDeEstadoApp={this.cambioDeEstadoApp}/>
          </div>
        )
      }
    }
  }
}

export default App;
