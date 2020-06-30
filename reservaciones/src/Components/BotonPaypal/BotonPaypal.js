import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';
import './BotonPaypal.css';


let Paypal = null;

class BotonPaypal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            botonVisible: false,
            cargando: true,
            pagado: false
        };

        window.React = React;
        window.ReactDOM = ReactDOM;
    }

    componentDidMount(){
        const { isScriptLoaded, isScriptLoadSucceed } = this.props;

        if (isScriptLoaded && isScriptLoadSucceed) {
            Paypal = window.paypal.Buttons.driver("react", { React, ReactDOM });
          this.setState({ cargando: false, pagado: true });
        }
    }

    componentWillReceiveProps(nextProps){
        const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

        const scriptJustLoaded =
          !this.state.botonVisible && !this.props.isScriptLoaded && isScriptLoaded;
    
        if (scriptJustLoaded) {
          if (isScriptLoadSucceed) {
            Paypal = window.paypal.Buttons.driver("react", {
              React,
              ReactDOM
            });
            this.setState({ cargando: false, botonVisible: true });
          }
        }
    }

    createOrder = (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: "Cabañas",
              amount: {
                currency_code: "MXN",
                value: this.props.pago
              }
            }
          ], 
          application_context: {
              shipping_preference: 'NO_SHIPPING'
          }
        });
      };
    
    onApprove = (data, actions) => {
        actions.order.capture().then(details => {
          const paymentData = {
            payerID: data.payerID,
            orderID: data.orderID
          };
          console.log("Payment Approved: ", paymentData);
          this.setState({ botonVisible: false, pagado: true });
          let { reservacion } = this.props;
          reservacion.fechaDeConfirmacion = new Date(Date.now());
          reservacion.estatus = 'Confirmada';
          this.props.registrarReservacion(reservacion)
        });
    };

    render(){
        const { botonVisible, cargando, pagado } = this.state;
        if(this.props.visibilidad && botonVisible){
            setTimeout(() => {
                let seccionPaypal = document.getElementById('seccionPaypal');
                seccionPaypal.style.height = '120px';
                seccionPaypal.style.marginTop = '20px';
                seccionPaypal.style.opacity = 1;
                seccionPaypal.scrollIntoView({behavior: "smooth"});
            }, 2000)
        }
        return (
          <div className="main">
    
            {botonVisible && (
              <div>
                <Paypal
                  createOrder={(data, actions) => this.createOrder(data, actions)}
                  onApprove={(data, actions) => this.onApprove(data, actions)}
                />
              </div>
            )}
    
            {pagado && (
              <div className="main">
                <h2>Gracias por su pago!</h2>
                  <h3>Un correo ha sido enviado a su email con los detalles de la reservación</h3>
                  <h3>Estamos contentos de poder arenderlo, nos vemos pronto.</h3>
              </div>
            )}
          </div>
        );
    }
}

export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=AT1JkWKFSOw2W79mDXVz9-6ueI2ZnT-DEV_F8U5yYKrQ_Mn2Ht619akT4M30UvKClYlSnWkAu8K5Vxse&currency=MXN`)(BotonPaypal);

//sandbox: AT1JkWKFSOw2W79mDXVz9-6ueI2ZnT-DEV_F8U5yYKrQ_Mn2Ht619akT4M30UvKClYlSnWkAu8K5Vxse