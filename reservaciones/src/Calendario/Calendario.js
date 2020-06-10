import React from 'react';
import './Calendario.css';
import FechaCal from '../FechaCal/FechaCal';


class Calendario extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            fechaActual: new Date(Date.now())
        }
        this.mesActual = this.mesActual.bind(this);
        this.primerDia = this.diaSemanaPrimeroDelMes.bind(this);
        this.renderizarDias = this.renderizarDias.bind(this);
    }
    mesActual() {
        // Regresa el nombre del mes actual
        let mesNumerico = this.state.fechaActual.getMonth();
        return this.state.meses[mesNumerico - 1];
    }
    diaSemanaPrimeroDelMes() {
        // Regresa el numero de dia de la semana del primer día del mes, empezando 0 con domingo
        let primerDia = new Date(this.state.fechaActual.getFullYear(), this.state.fechaActual.getMonth(), 1);
        return primerDia.getDay();
    }
    renderizarDias() {
        const mesActualNumerico = this.state.fechaActual.getMonth() + 3;
        const anioActual = this.state.fechaActual.getFullYear();
        let primerDia = new Date(anioActual, mesActualNumerico, 1);
        // Normalmante getDay() inicia en domingo, con este operador ternario iniciamos en lunes con valor en 1 hasta domingo con valor 7
        (primerDia.getDay() === 0)? primerDia = 6 : primerDia = primerDia.getDay() - 1;
        const diasDelMes = (anio, mes) => {
            return new Date(anio, mes, 0).getDate();
        }
        const semanas = [];
        const filaSemana = (numeroDeFila) => {
            const fila = [];
            for (let i = 1; i <= 7; i++){
                if(i + numeroDeFila * 7 <= diasDelMes(anioActual, mesActualNumerico + 1) + primerDia){
                    if(i <= primerDia && numeroDeFila == 0){
                        fila.push(<td></td>)
                    } else {
                        fila.push(<td>{i + numeroDeFila * 7 - primerDia}</td>);
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
                        <th colSpan = '7'>{this.mesActual()}</th>
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

export default Calendario;