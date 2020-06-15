import React from 'react';
import './ListaDeResultados.css';
import Resultado from '../Resultado/Resultado';
import calculadoraDePrecios from '../../util/calculadoraDePrecios';

class ListaDeResultados extends React.Component {
    constructor(props){
        super(props)
        this.renderResultados = this.renderResultados.bind(this);
    }
    renderResultados() {
        let resultados = this.props.resultados;
        let cabanas = [];
        let precio;
        resultados.forEach(resultado => {
            if(this.props.huespedes.numeroDeAdultos + this.props.huespedes.numeroDeNinos <= this.props.maximoDeHuespedes[`cabana${resultado}`]){
                precio = calculadoraDePrecios(this.props.preciosBase[`cabana${resultado}`], this.props.huespedes.numeroDeAdultos, this.props.huespedes.numeroDeNinos, this.props.minimoDeHuespedes[`cabana${resultado}`], this.props.maximoDeHuespedes[`cabana${resultado}`], this.props.huespedes.numeroDeMascotas, this.props.numeroDeNoches);
                cabanas.push(<Resultado cabana={resultado} key={resultado} precio={precio}/>);
            }
        });
        return cabanas;
    }
    render(){
        return(
            <div id='listaDeResultados'>
                {this.renderResultados()}
            </div>
        )
    }
}

export default ListaDeResultados;
