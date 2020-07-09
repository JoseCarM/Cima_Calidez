import React from "react";
import "./ListaDeResultados.css";
import Resultado from "../Resultado/Resultado";
import ResultadoCombinado from "../ResultadoCombinado/ResultadoCombinado";
import calculadoraDePrecios from "../../util/calculadoraDePrecios";
import combinador from "../../util/combinadorParaArray";

class ListaDeResultados extends React.Component {
  constructor(props) {
    super(props);
    this.renderResultados = this.renderResultados.bind(this);
    this.mensaje = this.mensaje.bind(this);
  }
  renderResultados() {
    let resultados = this.props.resultados;
    let huespedes =
      this.props.huespedes.numeroDeAdultos + this.props.huespedes.numeroDeNinos;
    let opciones = [];
    let precio;
    if (!this.props.busquedaCombinada) {
      resultados.forEach((resultado) => {
        if (huespedes <= this.props.maximoDeHuespedes[`cabana${resultado}`]) {
          precio = calculadoraDePrecios(
            this.props.preciosBase[`cabana${resultado}`],
            this.props.huespedes.numeroDeAdultos,
            this.props.huespedes.numeroDeNinos,
            this.props.minimoDeHuespedes[`cabana${resultado}`],
            this.props.maximoDeHuespedes[`cabana${resultado}`],
            this.props.huespedes.numeroDeMascotas,
            this.props.numeroDeNoches
          );
          opciones.push(
            <Resultado
              cabana={resultado}
              key={resultado}
              precio={precio}
              fechaDeEntrada={this.props.fechaDeEntrada}
              fechaDeSalida={this.props.fechaDeSalida}
              cambioDeEstadoApp={this.props.cambioDeEstadoApp}
            />
          );
        }
      });
      return opciones;
    } else if (this.props.busquedaCombinada) {
      const sumar = (propiedad) => (acumulador, valorActual) =>
        acumulador + propiedad[`cabana${valorActual}`];
      resultados = combinador(resultados);
      resultados = resultados.filter(
        (combinacion) =>
          combinacion.reduce(sumar(this.props.maximoDeHuespedes), 0) >=
          huespedes
      );
      let numeroDeOpcion = 1;
      resultados.forEach((combinacion) => {
        precio = combinacion.reduce(sumar(this.props.preciosBase), 0);
        precio +=
          huespedes -
            combinacion.reduce(sumar(this.props.minimoDeHuespedes), 0) <
          0
            ? 0
            : (huespedes -
                combinacion.reduce(sumar(this.props.minimoDeHuespedes), 0)) *
              250;
        precio += this.props.huespedes.numeroDeMascotas * 150;
        precio *= this.props.numeroDeNoches;
        opciones.push(
          <div className="opcionDeCombinacion" key={numeroDeOpcion}>
            <p>Opción {numeroDeOpcion}</p>
            <ResultadoCombinado
              combinacion={combinacion}
              key={combinacion}
              precio={precio}
              fechaDeEntrada={this.props.fechaDeEntrada}
              fechaDeSalida={this.props.fechaDeSalida}
              cambioDeEstadoApp={this.props.cambioDeEstadoApp}
            />
          </div>
        );
        numeroDeOpcion++;
      });
      return opciones;
    }
  }
  mensaje() {
    let maximoDeHuespedesDisponible = 0;
    let cabana;
    this.props.resultados.forEach((numero) => {
      if (this.props.busquedaCombinada === false) {
        if (
          this.props.maximoDeHuespedes[`cabana${numero}`] >
          maximoDeHuespedesDisponible
        ) {
          maximoDeHuespedesDisponible = this.props.maximoDeHuespedes[
            `cabana${numero}`
          ];
          cabana = `Cabaña ${numero}`;
        }
      } else {
        const reductor = (acumulador, numero) =>
          acumulador + this.props.maximoDeHuespedes[`cabana${numero}`];
        maximoDeHuespedesDisponible = this.props.resultados.reduce(reductor, 0);
      }
    });
    if (
      this.props.resultados.length === 0 &&
      this.props.nuevaBusqueda === false
    ) {
      return (
        <div className="mensajes">
          <h2>
            Lo sentimos, no hay cabañas disponibles para ese rango de fechas y
            la cantidad de huespedes señalados
          </h2>
        </div>
      );
    } else if (
      maximoDeHuespedesDisponible !== 0 &&
      this.props.huespedes.numeroDeAdultos +
        this.props.huespedes.numeroDeNinos >
        maximoDeHuespedesDisponible &&
      this.props.resultados.length > 1
    ) {
      if (this.props.busquedaCombinada === false) {
        return (
          <div className="mensajes">
            <h2>
              La cabaña disponible para estas fechas con mayor capacidad es la{" "}
              {cabana}, que tiene una capacidad máxima de{" "}
              {maximoDeHuespedesDisponible} huespedes contando adultos y niños
            </h2>
            <br />
            <h2>
              Haz click en "Cambiar a busqueda combinada", donde te ofrecemos
              varias cabañas para alojar a todos los huespedes
            </h2>
          </div>
        );
      } else {
        return (
          <div className="mensajes">
            <h2>
              Lo sentimos, no hay cabañas disponibles para ese rango de fechas y
              la cantidad de huespedes señalados
            </h2>
          </div>
        );
      }
    }
  }
  render() {
    return (
      <div
        id={
          this.props.busquedaCombinada
            ? "listaDeResultadosColumna"
            : "listaDeResultadosFila"
        }
      >
        {this.mensaje()}
        {this.renderResultados()}
      </div>
    );
  }
}

export default ListaDeResultados;
