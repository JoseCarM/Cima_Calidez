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
        // Las primeras dos lineas generan la fecha actual con 0 horas, 0 minutos, 0 segundos, 0 milisegundos
        let fechaActual = new Date(Date.now());
        fechaActual.setHours(0,0,0,0);
        // Para poder trabajar las igualdades obtenemos su valor numerico           DRY!!!!!
        let fecha = this.props.fecha.getTime();
        fechaActual = fechaActual.getTime();
        if(fecha >= fechaActual){
            this.props.seleccionarFecha(this.props.fecha);
        }
    }
    clasePorFecha(){
        // Las primeras dos lineas generan la fecha actual con 0 horas, 0 minutos, 0 segundos, 0 milisegundos
        let fechaActual = new Date(Date.now());
        fechaActual.setHours(0,0,0,0);
        // Para poder trabajar las igualdades obtenemos su valor numerico           DRY!!!!!
        let fecha = this.props.fecha.getTime();
        fechaActual = fechaActual.getTime();
        if(fecha >= fechaActual){
            return (this.props.fecha >= this.props.fechaDeEntrada && this.props.fecha <= this.props.fechaDeSalida)? 'fechasSeleccionadas' : 'fechasNoSeleccionadas';
        } else {
            return 'fechasPasadas';
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