import React from "react";
import "./Reservar.css";

class Reservar extends React.Component {
  constructor(props) {
    super(props);
    this.verificar = this.verificar.bind(this);
  }
  async verificar() {
    this.props.cambioDeEstadoApp({ cargando: true });
    let fechaDeEntrada = this.props.fechaDeEntrada;
    let fechaDeSalida = this.props.fechaDeSalida;
    let cabanasARentar = this.props.cabanasARentar;
    let precio = this.props.precio;
    let url = `http://192.168.1.74/verificador?fechaDeEntrada=${fechaDeEntrada}&fechaDeSalida=${fechaDeSalida}&cabanasARentar=${cabanasARentar}`;
    const response = await fetch(url);
    let aunDisponible = await response.json();
    if (aunDisponible === "Disponible") {
      this.props.cambioDeEstadoApp({
        cargando: false,
        listoParaReservar: true,
        costoTotal: precio,
        cabanasARentar: cabanasARentar,
      });
    } else if (aunDisponible === "Ocupado") {
      this.props.cambioDeEstadoApp({
        cargando: false,
        seReservoEnElMomento: true,
      });
    }
  }
  render() {
    return (
      <button
        id={this.props.visibilidad ? "botonReservar" : "botonReservarNoVisible"}
        onClick={this.verificar}
      >
        Reservar
      </button>
    );
  }
}

export default Reservar;
