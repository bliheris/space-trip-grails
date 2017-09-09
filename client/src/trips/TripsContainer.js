import React from 'react';
import { Row, Jumbotron, Table, Button } from 'react-bootstrap';

import http from '../http'

class Trips extends React.Component {

    constructor() {
        super();

        this.state = {
            trips: [],
            origin: '',
            destination: '',
        }
    }

    componentDidMount() {
        http.get('trip')
            .then(json => {
                this.setState({trips: json})
            })
    }

    addNewTrip = (event) => {
        event.preventDefault();
        http.post('trip', { origin: this.state.origin, destination: this.state.destination })
            .then(json => {
                let trips = this.state.trips;
                trips.push({id: json.id, origin: json.origin, destination: json.destination });
                this.setState({trips});
            })
    }

    handleInputChange = (event) => {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        })
    };

    render() {
        const { trips } = this.state;

        return (
            <Row>
            <Jumbotron>
                <h1>Trips management</h1>
            </Jumbotron>
            <Row>
                <div>
                    <h3>Add a Trip:</h3>
                    <form className="form " onSubmit={this.addNewTrip}  >

                        <label>Origin</label>
                        <input
                            className="form-control"
                            name="origin"
                            type="text"
                            value={ this.state.origin }
                            onChange={ this.handleInputChange }
                        />

                        <label>Destination</label>
                        <input
                            className="form-control"
                            name="destination"
                            type="text"
                            value={ this.state.destination }
                            onChange={ this.handleInputChange }
                        />

                        <input className="btn btn-success"  type="submit" value="Add Trip" />
                    </form>
                </div>
            </Row>
            <Row>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Origin</th>
                        <th>Destination</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        trips.map(t => {
                            return <tr key={t.id}>
                                <td>{t.id}</td>
                                <td>{t.origin}</td>
                                <td>{t.destination}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </Table>
            </Row>
        </Row>
        )
    }
}

export default Trips
