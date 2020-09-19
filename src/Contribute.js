import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

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
        this.state = {"error": ''};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    missingFields() {
        // require departure, arrival, date, time, airline
        // possibly require crowded and safety?
        // don't require comments
        
        const missing = [];
        // very sad manual checking :'(
        if (this.departure.current.value === '') missing.push("departure");
        if (this.arrival.current.value === '') missing.push("arrival");
        if (this.date.current.value === '') missing.push("date");
        if (this.time.current.value === '') missing.push("time");
        if (this.airline.current.value === '') missing.push("airline");
        return missing;
    }

    async handleSubmit(event) {
        const form_data = new Map();
        form_data["departure"] = this.departure.current.value;
        form_data["arrival"] = this.arrival.current.value;
        form_data["date"] = this.date.current.value;
        form_data["time"] = this.time.current.value;
        form_data["airline"] = this.airline.current.value;
        form_data["safety"] = this.safety.current.value;
        form_data["crowded"] = this.crowded.current.value;
        form_data["comments"] = this.comments.current.value;

        const missing = this.missingFields();
        if (missing.length === 0) {
            this.setState({"error": ''});
            // alert for testing
            alert(JSON.stringify(form_data));
            // actual save to database
            const json_param = "json=" + JSON.stringify(form_data);
            console.log(`json data being passed to api ${json_param}`);
            await fetch('/add?' + json_param, { method: 'POST'})
            .then(response => response.json()).then(data => console.log(data));
        } else {
            let missingFields = "";
            missing.forEach((field, i) => missingFields += field + ((i===missing.length-1) ? '.' : ', '));
            this.setState({"error": "Missing fields " + missingFields});
        }
        
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
                <hr></hr>
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
                
                {(this.state.error !== '') ? <Alert variant="danger">{this.state.error}</Alert> : null}
                <Button className="mb-5" onClick={this.handleSubmit}>Submit</Button>
            </Form>
        )
    }
}

export default Contribute;