import React from 'react';
import './CantidadDeHuespedes.css';

class CantidadDeHuespedes extends React.Component {
    constructor(props){
        super(props);
        this.renderizaOpciones = this.renderizaOpciones.bind(this);
        this.cambiarNumeroDeHuespedes = this.cambiarNumeroDeHuespedes.bind(this);
    }
    // Un switch que decide que valor afectara el boton presionado
    cambiarNumeroDeHuespedes(tipo, cantidad, cambio) {
        let huespedes = this.props.huespedes;
        switch(tipo){
            case 'Adultos':
                if(cantidad + huespedes.numeroDeNinos < huespedes.numeroMaximoDeHuespedes && cambio === 'aumenta'){
                    cantidad++;
                    huespedes.numeroDeAdultos = cantidad;
                } else if(cantidad > 1 && cambio === 'disminuye'){
                    cantidad--;
                    huespedes.numeroDeAdultos = cantidad;
                }
                break;
            case 'Niños':
                if(huespedes.numeroDeAdultos + cantidad < huespedes.numeroMaximoDeHuespedes && cambio === 'aumenta'){
                    cantidad++;
                    huespedes.numeroDeNinos = cantidad;
                } else if(cantidad > 0 && cambio === 'disminuye'){
                    cantidad--;
                    huespedes.numeroDeNinos = cantidad;
                }
                break;
            case 'Bebes':
                if(cantidad < 5 && cambio === 'aumenta'){
                    cantidad++;
                    huespedes.numeroDeBebes = cantidad;
                } else if(cantidad > 0 && cambio === 'disminuye'){
                    cantidad--;
                    huespedes.numeroDeBebes = cantidad;
                }
                break;
            case 'Mascotas':
                if(cantidad < 5 && cambio === 'aumenta'){
                    cantidad++;
                    huespedes.numeroDeMascotas = cantidad;
                } else if(cantidad > 0 && cambio === 'disminuye'){
                    cantidad--;
                    huespedes.numeroDeMascotas = cantidad;
                }
                break;
            default:
                let err = new Error('Debe haber un Bug en cambiarNumeroDeHuespedes de CantidadDeHuespedes');
                console.log(err);
        }
        this.props.cambioDeEstado(huespedes);
    }
    // Estructura de las opciones
    renderizaOpciones(tipo, cantidad){
        return (
                <div>
                    <p>{`${tipo}: `}</p><button onClick={() => this.cambiarNumeroDeHuespedes(tipo, cantidad, 'disminuye')}>-</button><p>{cantidad}</p><button onClick={() => this.cambiarNumeroDeHuespedes(tipo, cantidad, 'aumenta')}>+</button>
                </div>
        )
    }
    render(){
        return(
            <div>
                {this.renderizaOpciones('Adultos', this.props.huespedes.numeroDeAdultos)}
                {this.renderizaOpciones('Niños', this.props.huespedes.numeroDeNinos)}
                {this.renderizaOpciones('Bebes', this.props.huespedes.numeroDeBebes)}
                {this.renderizaOpciones('Mascotas', this.props.huespedes.numeroDeMascotas)}
            </div>
        )
    }
}

export default CantidadDeHuespedes