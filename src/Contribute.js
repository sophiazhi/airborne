import React from 'react';
//import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

class Contribute extends React.Component {
    constructor(props) {
        super(props);
        this.departure = React.createRef();
        this.arrival = React.createRef();
        this.date = React.createRef();
        this.time = React.createRef();
        this.airline = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        alert('test submitted ' + this.departure.current.value 
                + " to " + this.arrival.current.value
                + " on " + this.date.current.value + ", " + this.time.current.value
                + " with " + this.airline.current.value);
        // actually need to save to database
    }

    render() {
        return (
            <Form className="body">
                <Form.Row>
                    <Col>
                        <Form.Group controlId="formDeparture">
                            <Form.Label>Departure</Form.Label>
                            <Form.Control ref={this.departure} type="text" placeholder="City"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formArrival">
                            <Form.Label>Arrival</Form.Label>
                            <Form.Control ref={this.arrival} type="text" placeholder="City"/>
                        </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Row>
                    <Col>
                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control ref={this.date} type="date" placeholder="MM-DD-YYYY"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formTime">
                            <Form.Label>Departure time</Form.Label>
                            <Form.Control ref={this.time} as="select" custom>
                            <option>Early morning</option>
                            <option>Morning</option>
                            <option>Midday</option>
                            <option>Early afternoon</option>
                            <option>Late afternoon</option>
                            <option>Evening</option>
                            <option>Late night</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Form.Row>
                
                <Form.Group controlId="formAirline">
                    <Form.Label>Airline</Form.Label>
                    <Form.Control ref={this.airline} type="text" placeholder="Company"/>
                </Form.Group>
                
                
                <Button onClick={this.handleSubmit}>Submit</Button>
            </Form>
        )
    }
}

export default Contribute;