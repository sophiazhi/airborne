import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.departure = React.createRef();
        this.arrival = React.createRef();
        this.dayOfWeek = React.createRef();
        this.time = React.createRef();
        this.airline = React.createRef();

        /*
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            time: "api isn't called"
        }
        */
    }
    render() {
        return (
            <Form className="searchbar">
                <Form.Row>
                    <Col>
                        <Form.Group controlId="formAirline">
                            <Form.Control ref={this.airline} type="text" placeholder="Airline"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formDeparture">
                            <Form.Control ref={this.departure} type="text" placeholder="Departure"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formArrival">
                            <Form.Control ref={this.arrival} type="text" placeholder="Arrival"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formDayOfWeek">
                            <Form.Control ref={this.dayOfWeek} as="select" defaultValue="Day of Week">
                                <option>Day of Week</option>
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                <option>Thursday</option>
                                <option>Friday</option>
                                <option>Saturday</option>
                                <option>Sunday</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    
                    <Col>
                        <Form.Group controlId="formTime">
                            <Form.Control ref={this.time} as="select" defaultValue="Time">
                                <option>Time</option>
                                <option>2:00 AM - 5:59 AM</option>
                                <option>6:00 AM - 9:59 AM</option>
                                <option>10:00 AM - 1:59 PM</option>
                                <option>2:00 PM - 5:59 PM</option>
                                <option>6:00 PM - 9:59 PM</option>
                                <option>10:00 PM - 1:59 AM</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Form.Row>
            </Form>
        )
    }
    /*
    componentDidMount() {
        fetch('/time').then(res => res.json()).then(data => {
            console.log(data);
            this.setState({time: data.time});
        });
    }
    
    render() {
        return (
        <div>
            <p>Search component</p>
            <p>Test api: {this.state.time}</p>
        </div>
        );
    }
    */
}

export default Search;