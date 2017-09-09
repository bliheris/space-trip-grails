import React from 'react';
import 'whatwg-fetch';

import { Row, Jumbotron, Button } from 'react-bootstrap';
import { SERVER_URL } from './config';
import headers from './security/headers';

import http from './http'

import Vehicles from './vehicles';
import AddVehicleForm from './AddVehicleForm'


class Garage extends React.Component {

    constructor() {
        super();

        this.state = {
            vehicles: [],
            makes: [],
            models: [],
            drivers: [],
        }
    }

    componentDidMount() {
        http.get('vehicle')
            .then(json => {
                this.setState({vehicles: json})
            })

        http.get('make')
            .then(json => {
                this.setState({makes: json})
            })

        http.get('model')
            .then(json => {
                this.setState({models: json})
            })

        http.get('driver')
            .then(json => {
                this.setState({drivers: json})
            })
    }

    submitNewVehicle = vehicle => {
        http.post('vehicle', vehicle)
            .then(json => {
                let vehicles = this.state.vehicles;
                vehicles.push({id: json.id, name: json.name, make: json.make, model: json.model, driver: json.driver});
                this.setState({vehicles});
            })
    }

    render() {
        const {vehicles, makes, models, drivers} = this.state;

        const logoutButton = <Button bsStyle="warning" className="pull-right" onClick={this.props.logoutHandler} >Log Out</Button>;

        return <Row>
            <Jumbotron>
                <h1>Welcome to the Garage</h1>
                {logoutButton}
            </Jumbotron>
            <Row>
                <AddVehicleForm onSubmit={this.submitNewVehicle} makes={makes} models={models} drivers={drivers}/>
            </Row>
            <Row>
                <Vehicles vehicles={vehicles} />
            </Row>
        </Row>;
    }
}

export default Garage
