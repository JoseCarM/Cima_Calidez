import React from "react";
import "./PanelDeReservacion.css";
import nombreDeCabana from "../../util/switchNombreDeCabana";
import fechaLarga from "../../util/fechaLarga";
import generadorDeCodigoTemp from "../../util/generadorDeCodigoTemp";
import generadorDeCodigoReservacion from "../../util/generadorDeCodigoReservacion";
import portadaCab1 from "../../imagenes/portadaCab1.png";
import portadaCab2 from "../../imagenes/portadaCab2.png";
import portadaCab3 from "../../imagenes/portadaCab3.png";
import portadaCab4 from "../../imagenes/portadaCab4.png";
import portadaCab5 from "../../imagenes/portadaCab5.png";
import BotonPaypal from "../BotonPaypal/BotonPaypal";

let imagenesDePortada = [
  "",
  portadaCab1,
  portadaCab2,
  portadaCab3,
  portadaCab4,
  portadaCab5,
];

let porcentajeDePrimerPago = 50;

let reservacionTemporal = {};

function cancelarReservacion(datos) {
  let url = `http://192.168.1.70:8080/reservacion`;
  fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
}

class PanelDeReservacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datosDeUsuarioValidos: false,
      reservacion: {},
      pagoAcreditado: false,
    };
    this.continuarAPaypal = this.continuarAPaypal.bind(this);
    this.cambioSliderAnticipo = this.cambioSliderAnticipo.bind(this);
    this.registrarReservacion = this.registrarReservacion.bind(this);
    this.regresar = this.regresar.bind(this);
    this.setEstadoDePanelDeReservacion = this.setEstadoDePanelDeReservacion.bind(
      this
    );
  }
  setEstadoDePanelDeReservacion(objeto) {
    this.setState(objeto);
  }
  async registrarReservacion(datos) {
    let url = `http://192.168.1.70:8080/reservacion`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    console.log(response);
  }
  renderCabanas() {
    let cabanas = [];
    for (let i = 0; i < this.props.cabanasARentar.length; i++) {
      cabanas.push(
        <div key={this.props.cabanasARentar[i]} className="cabanasARentar">
          <h4>
            Cabaña <br />
            {nombreDeCabana(this.props.cabanasARentar[i])}
          </h4>
          <img
            src={imagenesDePortada[this.props.cabanasARentar[i]]}
            alt="imagen de portada de cabaña"
          />
        </div>
      );
    }
    return cabanas;
  }
  componentDidMount() {
    reservacionTemporal.codigoDeReservacion = generadorDeCodigoTemp();
    reservacionTemporal.estatus = "Pago pendiente";
    reservacionTemporal.cabana = this.props.cabanasARentar.join("-");
    reservacionTemporal.fechaDeEntrada = this.props.fechaDeEntrada;
    reservacionTemporal.fechaDeSalida = this.props.fechaDeSalida;
    reservacionTemporal.numeroDeAdultos = this.props.huespedes.numeroDeAdultos;
    reservacionTemporal.numeroDeNinos = this.props.huespedes.numeroDeNinos;
    reservacionTemporal.numeroDeBebes = this.props.huespedes.numeroDeBebes;
    reservacionTemporal.numeroDeMascotas = this.props.huespedes.numeroDeMascotas;
    reservacionTemporal.costoTotal = this.props.costoTotal;
    this.registrarReservacion(reservacionTemporal);
    porcentajeDePrimerPago = 50;
    document.getElementById("porcentajeDePrimerPago").innerHTML =
      porcentajeDePrimerPago + "%";
    let primerPago = this.props.costoTotal * (0.01 * porcentajeDePrimerPago);
    primerPago = primerPago.toFixed(2);
    let segundoPago =
      this.props.costoTotal * (1 - 0.01 * porcentajeDePrimerPago);
    segundoPago = segundoPago.toFixed(2);
    document.getElementById(
      "textoPrimerPago"
    ).innerHTML = `Primer pago hoy: $${primerPago} MXN`;
    document.getElementById(
      "textoSegundoPago"
    ).innerHTML = `Segundo pago el día de entrada: $${segundoPago} MXN`;
    reservacionTemporal.anticipo = Number(primerPago);
    reservacionTemporal.pagoPendiente = Number(segundoPago);
    setTimeout(() => {
      document.getElementById("panelDeReservacion").style.opacity = 1;
    }, 0);
  }
  cambioSliderAnticipo() {
    porcentajeDePrimerPago = document.getElementById("anticipo").value;
    document.getElementById("porcentajeDePrimerPago").innerHTML =
      porcentajeDePrimerPago + "%";
    let primerPago = this.props.costoTotal * (0.01 * porcentajeDePrimerPago);
    primerPago = primerPago.toFixed(2);
    let segundoPago =
      this.props.costoTotal * (1 - 0.01 * porcentajeDePrimerPago);
    segundoPago = segundoPago.toFixed(2);
    document.getElementById(
      "textoPrimerPago"
    ).innerHTML = `Primer pago hoy: $${primerPago} MXN`;
    document.getElementById(
      "textoSegundoPago"
    ).innerHTML = `Segundo pago el día de entrada: $${segundoPago} MXN`;
    reservacionTemporal.anticipo = Number(primerPago);
    reservacionTemporal.pagoPendiente = Number(segundoPago);
  }
  regresar() {
    cancelarReservacion(reservacionTemporal);
    this.props.buscaFechasOcupadas();
    this.props.cambioDeEstadoApp({
      listoParaReservar: false,
      costoTotal: "",
      cabanasARentar: null,
      fechaDeEntrada: null,
      fechaDeSalida: null,
      fechaOcupadaMasCercanaAFechaDeEntrada: null,
    });
  }
  continuarAPaypal() {
    let reservacion = Object.assign({}, reservacionTemporal);
    let formDatosDelCliente = document.forms["formDatosDelCliente"];
    reservacion.nombre = document.getElementById("nombre").value;
    reservacion.telefono = document.getElementById("telefono").value;
    reservacion.correoElectronico = document.getElementById(
      "correoElectronico"
    ).value;
    reservacion.codigoDeReservacion = generadorDeCodigoReservacion(reservacion);
    if (formDatosDelCliente.reportValidity()) {
      this.setState({
        datosDeUsuarioValidos: true,
        reservacion: reservacion,
      });
    }
  }
  render() {
    let huespedes = this.props.huespedes;
    return (
      <div id="panelDeReservacion">
        <button id="botonRegresar" onClick={this.regresar}>
          Regresar
        </button>
        {!this.state.pagoAcreditado && (
          <div id="reservacion">
            <section id="datosDeReservacion">
              <h1>Informacion de la reservación</h1>
              <div id="contenedorCabanasARentar">{this.renderCabanas()}</div>
              <div>
                <h4>
                  Entrada: {fechaLarga(this.props.fechaDeEntrada)}, 4:00pm hora
                  local
                </h4>
                <h4>
                  Salida: {fechaLarga(this.props.fechaDeSalida)}, 12:00pm hora
                  local
                </h4>
              </div>
              <div id="huespedesDatosDeReservacion">
                {huespedes.numeroDeAdultos > 0 ? (
                  <h4>Adultos: {huespedes.numeroDeAdultos}</h4>
                ) : (
                  ""
                )}
                {huespedes.numeroDeNinos > 0 ? (
                  <h4> / Niños: {huespedes.numeroDeNinos}</h4>
                ) : (
                  ""
                )}
                {huespedes.numeroDeBebes > 0 ? (
                  <h4> / Bebes: {huespedes.numeroDeBebes}</h4>
                ) : (
                  ""
                )}
                {huespedes.numeroDeMascotas > 0 ? (
                  <h4> / Mascotas: {huespedes.numeroDeMascotas}</h4>
                ) : (
                  ""
                )}
              </div>
              {!this.state.datosDeUsuarioValidos && (
                <form id="formAnticipo">
                  <h4>Selecciones un porcentaje de anticipo</h4>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    id="anticipo"
                    name="anticipo"
                    onChange={this.cambioSliderAnticipo}
                  ></input>
                  <label htmlFor="anticipo" id="porcentajeDePrimerPago"></label>
                </form>
              )}
              <h3>Total a pagar: ${this.props.costoTotal} MXN</h3>
              <h4 id="textoPrimerPago">
                Primer pago hoy: ${reservacionTemporal.primerPago} MXN
              </h4>
              <h4 id="textoSegundoPago">
                Segundo pago el día de entrada: $
                {reservacionTemporal.segundoPago} MXN
              </h4>
            </section>
            <section id="datosDelCliente">
              <h1>Información de usuario</h1>
              {!this.state.datosDeUsuarioValidos && (
                <form id="formDatosDelCliente">
                  <label htmlFor="nombre">Nombre completo y apellidos</label>
                  <br />
                  <input type="text" id="nombre" required></input>
                  <br />
                  <label htmlFor="telefono">Telefono o celular</label>
                  <br />
                  <input
                    type="tel"
                    id="telefono"
                    minLength="8"
                    required
                  ></input>
                  <br />
                  <label htmlFor="correoElectronico">email</label>
                  <br />
                  <input type="email" id="correoElectronico" required></input>
                  <br />
                  <input
                    type="checkbox"
                    id="aceptaReglamento"
                    name="aceptaReglamento"
                    required
                  ></input>
                  <label htmlFor="aceptaReglamento" id="labelAceptaReglamento">
                    He leido y acepto el Reglamento interno de Cima Calidez
                  </label>
                  <br />
                  <div id="divBotonContinuarAPaypal">
                    <input
                      type="button"
                      value="Continuar a pago"
                      onClick={this.continuarAPaypal}
                    ></input>
                  </div>
                </form>
              )}
              {this.state.datosDeUsuarioValidos && (
                <div id="datosClienteValidados">
                  <h3>Nombre: {this.state.reservacion.nombre}</h3>
                  <br />
                  <h3>Teléfono: {this.state.reservacion.telefono}</h3>
                  <br />
                  <h3>email: {this.state.reservacion.correoElectronico}</h3>
                  <br />
                  <button
                    onClick={() =>
                      this.setState({ datosDeUsuarioValidos: false })
                    }
                  >
                    Editar
                  </button>
                </div>
              )}
            </section>
          </div>
        )}
        {this.state.datosDeUsuarioValidos && (
          <section id="seccionPaypal">
            <BotonPaypal
              pago={this.state.reservacion.anticipo}
              visibilidad={this.state.datosDeUsuarioValidos}
              reservacion={this.state.reservacion}
              registrarReservacion={this.registrarReservacion}
              setEstadoDePanelDeReservacion={this.setEstadoDePanelDeReservacion}
            />
          </section>
        )}
      </div>
    );
  }
}

window.addEventListener("beforeunload", function (e) {
  cancelarReservacion(reservacionTemporal);
});

export default PanelDeReservacion;
