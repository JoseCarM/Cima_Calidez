import React from 'react';
import './Mes.css';
import FechaCal from '../FechaCal/FechaCal';



class Mes extends React.Component {
    constructor(props){
        super(props);
        this.mesActual = this.mesActual.bind(this);
        this.renderizarDias = this.renderizarDias.bind(this);
    }
    mesActual() {
        // Regresa el nombre del mes actual
        let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        let mesNumerico = this.props.mes;
        return meses[mesNumerico];
    }
    renderizarDias() {
        // Genera los dias segun la logica del calendario gregoriano, tomando como prioridad el día de la semana para
        // hacer un acomodo estetico
        const mesActualNumerico = this.props.mes;
        const anioActual = this.props.anio;
        let primerDia = new Date(anioActual, mesActualNumerico, 1);
        // Normalmante getDay() inicia en domingo, con este operador ternario iniciamos en lunes con valor en 1 hasta domingo con valor 7
        (primerDia.getDay() === 0)? primerDia = 6 : primerDia = primerDia.getDay() - 1;
        // Este es un hack de la función Date para determinar la cantidad de dias que tiene el mes señalado
        // incluye años viciestos
        const diasDelMes = (anio, mes) => {
            return new Date(anio, mes, 0).getDate();
        }
        const semanas = [];
        // La primera fila asume la logica para determinar en que dia de la semana comienza el mes
        // las siguientes filas mantienen su numero consecutivo y lo pasan como props al componente FechaCal
        // toma en cuenta la cantidad de dias del mes señalado y no renderiza mas dias despues de este.
        const filaSemana = (numeroDeFila) => {
            let diasTranscurridos = numeroDeFila * 7;
            const fila = [];
            for (let i = 1; i <= 7; i++){
                if(diasTranscurridos + i <= diasDelMes(anioActual, mesActualNumerico + 1) + primerDia){
                    if(i <= primerDia && numeroDeFila == 0){
                        fila.push(<td></td>)
                    } else {
                        fila.push(<td><FechaCal diaDelMes={diasTranscurridos + i - primerDia}/></td>);
                    }
                }
            }
            return fila;
        }
        for(let i = 0; i < 6; i++){
            semanas.push(<tr>{filaSemana(i)}</tr>)
        }
        return semanas;
    }
    render(){
        return (
            <div>
                <table>
                    <thead>
                        <th colSpan = '7'>{this.mesActual()} {this.props.anio}</th>
                        <tr>
                            <td>Lun</td>
                            <td>Mar</td>
                            <td>Mie</td>
                            <td>Jue</td>
                            <td>Vie</td>
                            <td>Sab</td>
                            <td>Dom</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderizarDias()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Mes;