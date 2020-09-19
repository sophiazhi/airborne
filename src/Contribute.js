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
        this.crowded = React.createRef();
        this.safety = React.createRef();
        this.comments = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        // require departure, arrival, date, time, airline
        // possibly require crowded and safety?
        // don't require comments
        alert('test submitted ' + this.departure.current.value 
                + " to " + this.arrival.current.value
                + " on " + this.date.current.value + ", " + this.time.current.value
                + " with " + this.airline.current.value
                + " at " + this.safety.current.value + " safety and " + this.crowded.current.value + " crowded"
                + this.comments.current.value);
        // actually need to save to database
    }

    render() {
        return (
            <Form className="body">
                <h1>Share your flight experience</h1>
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
                <Form.Row>
                    <Col>No other passengers in sight</Col>
                    <Col xs={8}>
                        <Form.Group controlId="formCrowded">
                            <Form.Label>How full was the flight?</Form.Label>
                            <Form.Control ref={this.crowded} type="range" custom />
                        </Form.Group>
                    </Col>
                    <Col>Every seat was filled</Col>
                </Form.Row>
                <Form.Row>
                    <Col>If someone had coronavirus I definitely contracted it</Col>
                    <Col xs={8}>
                        <Form.Group controlId="formSafety">
                            <Form.Label>How safe did you feel?</Form.Label>
                            <Form.Control ref={this.safety} type="range" custom />
                        </Form.Group>
                    </Col>
                    <Col>No contact with other people</Col>
                </Form.Row>

                <Form.Group controlId="formComments">
                    <Form.Label>Other comments</Form.Label>
                    <Form.Control ref={this.comments} type="text" placeholder="Thoughts" />
                </Form.Group>
                
                
                <Button onClick={this.handleSubmit}>Submit</Button>
            </Form>
        )
    }
}

export default Contribute;