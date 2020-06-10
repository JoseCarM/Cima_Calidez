import React from 'react';
import './Calendario.css';
import FechaCal from '../FechaCal/FechaCal';


class Calendario extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            fechaActual: new Date(Date.now())
        }
        this.mesActual = this.mesActual.bind(this);
        this.renderizarDias = this.renderizarDias.bind(this);
    }
    mesActual() {
        // Regresa el nombre del mes actual
        let mesNumerico = this.props.mes;
        return this.state.meses[mesNumerico];
    }
    renderizarDias() {
        const mesActualNumerico = this.props.mes;
        const anioActual = this.state.fechaActual.getFullYear();
        let primerDia = new Date(anioActual, mesActualNumerico, 1);
        // Normalmante getDay() inicia en domingo, con este operador ternario iniciamos en lunes con valor en 1 hasta domingo con valor 7
        (primerDia.getDay() === 0)? primerDia = 6 : primerDia = primerDia.getDay() - 1;
        const diasDelMes = (anio, mes) => {
            return new Date(anio, mes, 0).getDate();
        }
        const semanas = [];
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

export default Calendario;