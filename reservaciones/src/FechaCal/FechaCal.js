import React from 'react';
import './FechaCal.css';

class FechaCal extends React.Component {
    render() {
        return (
            <div>
                {this.props.diaDelMes}
            </div>
        )
    }
}

export default FechaCal;