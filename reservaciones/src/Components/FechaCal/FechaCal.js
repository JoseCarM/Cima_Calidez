import React from 'react';
import './FechaCal.css';

class FechaCal extends React.Component {
    constructor(props){
        super(props);
        this.seleccionarFecha = this.seleccionarFecha.bind(this);
        this.clasePorFecha = this.clasePorFecha.bind(this);
        this.IdEntradaOSalida = this.IdEntradaOSalida.bind(this);
    }
    // Si no traslado la función original seleccionarFecha a una nueva dentro del mismo elemento, genero un loop infinito de setState
    seleccionarFecha() {
        // Para poder trabajar la igualdad obtenemos su valor numerico 
        if(this.props.fechasOcupadas.some(fechaOcupada => fechaOcupada.getTime() === this.props.fecha.getTime()) === false){
            if(this.props.cambioDeEstadoComparador){
                this.props.cambioDeEstadoComparador({
                  resultados: [],
                  nuevaBusqueda: true
                })
            }
            if(this.props.fechaDeEntrada === null){
                this.props.cambioDeEstadoApp({fechaDeEntrada: this.props.fecha});
            } else if(this.props.fechaDeEntrada !== null && this.props.fechaDeSalida === null){
                if(this.props.fecha <= this.props.fechaDeEntrada){
                  this.props.cambioDeEstadoApp({fechaDeEntrada: this.props.fecha})
                } else {
                  if(this.props.fechasOcupadas.some(fechaOcupada => (fechaOcupada > this.props.fechaDeEntrada && fechaOcupada < this.props.fecha))){
                      alert('Hay fechas no disponibles dentro del rango que seleccionaste. Por favor selecciona una fecha de salida diferente.');
                      this.props.cambioDeEstadoApp({
                        fechaDeEntrada: null,
                        fechaDeSalida: null
                      })
                  } else {
                    this.props.cambioDeEstadoApp({fechaDeSalida: this.props.fecha})
                    document.getElementById('presentacionDeHuespedes').scrollIntoView({behavior: "smooth"});
                  } 
                }
            } else if(this.props.fechaDeEntrada !== null && this.props.fechaDeSalida !== null){
                this.props.cambioDeEstadoApp({
                  fechaDeEntrada: this.props.fecha,
                  fechaDeSalida: null
                })
            }
        }
    }
    
    clasePorFecha(){
        // Las primeras dos lineas generan la fecha actual con 0 horas, 0 minutos, 0 segundos, 0 milisegundos
        let fechaActual = new Date(Date.now());
        fechaActual.setHours(0,0,0,0);
        let fechaReservada = false;
        for(let i = 0; i < this.props.fechasOcupadas.length; i++){
            // Para poder trabajar la igualdad obtenemos su valor numerico 
            if(this.props.fechasOcupadas[i].getTime() === this.props.fecha.getTime()){fechaReservada = true}
        }
        if(this.props.fecha < fechaActual){
            return 'fechasPasadas';
        } else if(fechaReservada){
            return 'fechasReservadas';
        } else if(this.props.fecha >= fechaActual){
            return (this.props.fecha >= this.props.fechaDeEntrada && this.props.fecha <= this.props.fechaDeSalida)? 'fechasSeleccionadas' : 'fechasNoSeleccionadas';
        }
    }
    IdEntradaOSalida(){
        // Dos puntos importantes:
        // 1.- Los operadores ternarios me evitan aplicar .getTime() a null, cosa que arroja un error
        // 2.- No puedo comparar la igualdad de las fechas sin sus valores getTime() o de lo contrario arroja falso
        let fechaDeEntrada = (this.props.fechaDeEntrada === null)? 0 : this.props.fechaDeEntrada.getTime();
        let fechaDeSalida = (this.props.fechaDeSalida === null)? 0 : this.props.fechaDeSalida.getTime();
        if(this.props.fecha.getTime() === fechaDeEntrada){
            return 'fechaDeEntrada';
        } else if(this.props.fecha.getTime() === fechaDeSalida){
            return 'fechaDeSalida';
        }
    }
    render() {
        return (
            <div onClick={this.seleccionarFecha} className={this.clasePorFecha()} id={this.IdEntradaOSalida()}>
                <p id='diaDelMes'>{this.props.fecha.getDate()}</p>
            </div>
        )
    }
}

export default FechaCal;