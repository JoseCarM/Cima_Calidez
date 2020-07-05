import React from 'react';
import numeroDeDiasEntreFechas from '../../util/numeroDeDiasEntreFechas'
import './FechaCal.css';

class FechaCal extends React.Component {
    constructor(props){
        super(props);
        this.defineFechaMaximaDeSalida = this.defineFechaMaximaDeSalida.bind(this);
        this.seleccionarFecha = this.seleccionarFecha.bind(this);
        this.clasePorFecha = this.clasePorFecha.bind(this);
        this.IdEntradaOSalida = this.IdEntradaOSalida.bind(this);
    }
    defineFechaMaximaDeSalida(){
        if(this.props.fechasOcupadas.length > 0){
            let fechaOcupadaMasCercana = null;
            this.props.fechasOcupadas.forEach(fechaOcupada => {
                if(fechaOcupada.getTime() > this.props.fecha.getTime()){
                    if(fechaOcupadaMasCercana === null || numeroDeDiasEntreFechas(this.props.fecha, fechaOcupada) < numeroDeDiasEntreFechas(this.props.fecha, fechaOcupadaMasCercana)){
                        fechaOcupadaMasCercana = fechaOcupada;
                    }
                }
            })
            this.props.cambioDeEstadoApp({fechaOcupadaMasCercanaAFechaDeEntrada: fechaOcupadaMasCercana})
        }
    }
    // Si no traslado la función original seleccionarFecha a una nueva dentro del mismo elemento, genero un loop infinito de setState
    seleccionarFecha() {
        //Borro los resultados de busqueda cuando vuelvo a hacer clic en las fechas
        if(this.props.cambioDeEstadoComparador){
            this.props.cambioDeEstadoComparador({
              resultados: [],
              nuevaBusqueda: true
            })
        }
        // Si ya hay fechas seleccionadas, al hacer clic estas se borran para empezar de nuevo 
        if(this.props.fechaDeEntrada !== null && this.props.fechaDeSalida !== null){
            this.defineFechaMaximaDeSalida();
            this.props.cambioDeEstadoApp({
              fechaDeEntrada: null,
              fechaDeSalida: null,
              fechaOcupadaMasCercanaAFechaDeEntrada: null
            })
        //No puedo seleccionar las fechas ocupadas con respecto a la base de datos
        } else if(this.props.fechasOcupadas.some(fechaOcupada => fechaOcupada.getTime() === this.props.fecha.getTime()) === false){
            //Si aún no esta definida la fecha de entrada entonces se define
            if(this.props.fechaDeEntrada === null){
                this.defineFechaMaximaDeSalida();
                this.props.cambioDeEstadoApp({fechaDeEntrada: this.props.fecha});
            } else if(this.props.fechaDeEntrada !== null && this.props.fechaDeSalida === null){
                //Si ya esta definida la fecha de entrada pero no la de salida y selecciono una fecha previa a la fecha de entrada, esta sera la nueva fecha de entrada
                if(this.props.fecha < this.props.fechaDeEntrada){
                    this.defineFechaMaximaDeSalida();
                    this.props.cambioDeEstadoApp({fechaDeEntrada: this.props.fecha})
                //Si selecciono la fecha de entrada ya definida previamente, esta se deseleccionará
                } else if(this.props.fecha.getTime() === this.props.fechaDeEntrada.getTime()){
                    this.props.cambioDeEstadoApp({
                        fechaDeEntrada: null,
                        fechaOcupadaMasCercanaAFechaDeEntrada: null
                    })
                } else {
                //Como fecha de salida solo puedo seleccionar fechas anteriores o iguales a la fecha ocupada mas cercana a la fecha de entrada
                  if(this.props.fecha <= this.props.fechaOcupadaMasCercanaAFechaDeEntrada){
                    this.props.cambioDeEstadoApp({fechaDeSalida: this.props.fecha})
                    document.getElementById('presentacionDeHuespedes').scrollIntoView({behavior: "smooth"});
                  } 
                }
            } 
        } else if(this.props.fechaOcupadaMasCercanaAFechaDeEntrada){
            //Puedo seleccionar como fecha de salida la fecha ocupada más cercana la fecha de entrada, un cliente sale y otro entra
            if(this.props.fecha.getTime() === this.props.fechaOcupadaMasCercanaAFechaDeEntrada.getTime() && this.props.fechaDeEntrada !== null && this.props.fechaDeSalida === null){
                this.props.cambioDeEstadoApp({fechaDeSalida: this.props.fecha})
                document.getElementById('presentacionDeHuespedes').scrollIntoView({behavior: "smooth"});
            }
        }
        //Si no existen fechas ocupadas posteriores a la fecha de entrada, puedo escoger cualquier fecha, menos la fecha de entrada
        if(!this.props.fechaOcupadaMasCercanaAFechaDeEntrada){
            if(this.props.fechaDeEntrada !== null && this.props.fechaDeSalida === null && this.props.fecha > this.props.fechaDeEntrada){
                this.props.cambioDeEstadoApp({fechaDeSalida: this.props.fecha})
                document.getElementById('presentacionDeHuespedes').scrollIntoView({behavior: "smooth"});
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
        if(this.props.fechaOcupadaMasCercanaAFechaDeEntrada){
            if(this.props.fecha > this.props.fechaOcupadaMasCercanaAFechaDeEntrada){fechaReservada = true}
            if(this.props.fecha.getTime() === this.props.fechaOcupadaMasCercanaAFechaDeEntrada.getTime()){fechaReservada = false}
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