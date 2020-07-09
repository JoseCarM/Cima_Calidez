import React from "react";
import "./Buscar.css";
import iconoCargando from "../../imagenes/cargando.svg";

class Buscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cargando: false };
    this.buscar = this.buscar.bind(this);
  }
  async buscar() {
    let fechaDeEntrada = this.props.fechaDeEntrada;
    let fechaDeSalida = this.props.fechaDeSalida;
    let url = `http://192.168.1.70:8080/comparador?fechaDeEntrada=${fechaDeEntrada}&fechaDeSalida=${fechaDeSalida}`;
    if (fechaDeEntrada !== null && fechaDeSalida !== null) {
      this.setState({ cargando: true });
      const response = await fetch(url);
      const jsonResponse = await response.json();
      this.props.cambioDeEstadoComparador({
        resultados: jsonResponse,
        nuevaBusqueda: false,
      });
      this.setState({ cargando: false });
      let listaDeResultados;
      document.getElementById("listaDeResultadosColumna")
        ? (listaDeResultados = document.getElementById(
            "listaDeResultadosColumna"
          ))
        : (listaDeResultados = document.getElementById(
            "listaDeResultadosFila"
          ));
      listaDeResultados.scrollIntoView({ behavior: "smooth" });
    }
  }
  render() {
    return (
      <button
        id={!this.state.cargando ? "botonBuscar" : "cargandoBotonBuscar"}
        onClick={this.buscar}
      >
        {!this.state.cargando && "Buscar"}
        {this.state.cargando && (
          <div>
            <img
              id="iconoCargandoBotonBuscar"
              src={iconoCargando}
              alt="cargando"
            />
          </div>
        )}
      </button>
    );
  }
}

export default Buscar;
