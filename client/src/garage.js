import React from 'react';
import 'whatwg-fetch';

import Vehicles from './vehicles';


class Garage extends React.Component {

    constructor() {
        super();

        this.state = {
            vehicles: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/vehicle')
            .then(r => r.json())
            .then(json => this.setState({vehicles: json}))
            .catch(error => console.error('Error retrieving vehicles: ' + error));
    }

    render() {
        const {vehicles} = this.state;

        return <div>
            <Vehicles vehicles={vehicles} />
        </div>;
    }
}

export default Garage
