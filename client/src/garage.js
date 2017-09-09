import React from 'react';
import 'whatwg-fetch';

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

    submitNewVehicle = vehicle => {
        fetch('http://localhost:8080/vehicle', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vehicle)
        }).then(r => r.json())
            .then(json => {
                let vehicles = this.state.vehicles;
                vehicles.push({id: json.id, name: json.name, make: json.make, model: json.model, driver: json.driver});
                this.setState({vehicles});
            })
            .catch(ex => console.error('Unable to save vehicle', ex));
    };

    componentDidMount() {
        fetch('http://localhost:8080/vehicle')
            .then(r => r.json())
            .then(json => this.setState({vehicles: json}))
            .catch(error => console.error('Error retrieving vehicles: ' + error));

        fetch('http://localhost:8080/make')
            .then(r => r.json())
            .then(json => this.setState({makes: json}))

        fetch('http://localhost:8080/model')
            .then(r => r.json())
            .then(json => this.setState({models: json}))

        fetch('http://localhost:8080/driver')
            .then(r => r.json())
            .then(json => this.setState({drivers: json}))
    }

    render() {
        const {vehicles, makes, models, drivers} = this.state;

        return (
            <div>
                <AddVehicleForm
                    onSubmit={this.submitNewVehicle}
                    makes={makes}
                    models={models}
                    drivers={drivers}
                />
                <Vehicles vehicles={vehicles} />
            </div>
        )
    }
}

export default Garage
