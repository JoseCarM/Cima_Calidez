import React from "react";
import "./ResultadoCombinado.css";
import MasDetalles from "../MasDetalles/MasDetalles";
import Reservar from "../Reservar/Reservar";
import nombreDeCabana from "../../util/switchNombreDeCabana";
import portadaCab1 from "../../imagenes/portadaCab1.png";
import portadaCab2 from "../../imagenes/portadaCab2.png";
import portadaCab3 from "../../imagenes/portadaCab3.png";
import portadaCab4 from "../../imagenes/portadaCab4.png";
import portadaCab5 from "../../imagenes/portadaCab5.png";
let imagenesDePortada = [
  "",
  portadaCab1,
  portadaCab2,
  portadaCab3,
  portadaCab4,
  portadaCab5,
];

class ResultadoCombinado extends React.Component {
  constructor(props) {
    super(props);
    this.renderCombinacion = this.renderCombinacion.bind(this);
  }
  renderCombinacion(combinacion) {
    let opcion = [];
    combinacion.forEach((cabana) => {
      opcion.push(
        <div className="cabanaDeOpcion" key={cabana}>
          <p>{`Cabaña ${nombreDeCabana(cabana)}`}</p>
          <img
            className="portadasResultados"
            src={imagenesDePortada[cabana]}
            alt={`Cabaña ${cabana}`}
          />
          <MasDetalles />
        </div>
      );
    });
    return opcion;
  }
  render() {
    return (
      <div className="opcionesResultadosCombinados">
        <div className="cabanasDeOpcion">
          {this.renderCombinacion(this.props.combinacion)}
        </div>
        <p>{`Total: $${this.props.precio}`}</p>
        <Reservar
          visibilidad={true}
          cambioDeEstadoApp={this.props.cambioDeEstadoApp}
          precio={this.props.precio}
          cabanasARentar={this.props.combinacion}
          fechaDeEntrada={this.props.fechaDeEntrada}
          fechaDeSalida={this.props.fechaDeSalida}
        />
      </div>
    );
  }
}

export default ResultadoCombinado;
