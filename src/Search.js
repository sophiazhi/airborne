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


        this.state = {
            departure: '',
            arrival: '',
            dayOfWeek: '',
            time: '',
            airline: '',
        }



        this.result = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderSearchResult = this.renderSearchResult.bind(this);
        
    }

    handleSubmit() {
        this.setState({
            departure: this.departure.current.value,
            arrival: this.arrival.current.value,
            dayOfWeek: this.dayOfWeek.current.value,
            time: this.time.current.value,
            airline: this.airline.current.value,
        });
    }

    renderSearchResult(){
        const results = Object.assign({}, this.state);
        for (const i in results) {
            if (results[i] == '') {
                return null;
            }
        }
        return(
            <SearchResult departure={this.state.departure}
                          
            />
        )
    }

    render() {
        return (
            <div>
                <Form className="searchbar-container" className="body" >
                    <Form.Row className="searchbar d-flex text-left">
                        <Col>
                            <Form.Group controlId="formAirline">
                                <Form.Label className="">Airline:</Form.Label>
                                <Form.Control ref={this.airline} type="text" placeholder="Airline"/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formDeparture">
                                <Form.Label>Departure:</Form.Label>
                                <Form.Control ref={this.departure} type="text" placeholder="Departure"/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formArrival">
                                <Form.Label>Arrival:</Form.Label>
                                <Form.Control ref={this.arrival} type="text" placeholder="Arrival"/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formDayOfWeek">
                                <Form.Label>Day of the week:</Form.Label>
                                <Form.Control ref={this.dayOfWeek} as="select" defaultValue="Day of Week">
                                    <option>Any</option>
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
                                <Form.Label>Time of day:</Form.Label>
                                <Form.Control ref={this.time} as="select" defaultValue="Time">
                                    <option>Any</option>
                                    <option>2:00 AM - 5:59 AM</option>
                                    <option>6:00 AM - 9:59 AM</option>
                                    <option>10:00 AM - 1:59 PM</option>
                                    <option>2:00 PM - 5:59 PM</option>
                                    <option>6:00 PM - 9:59 PM</option>
                                    <option>10:00 PM - 1:59 AM</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col className="col-sm-1 align-to-end">
                            <Button className="group-margin" onClick={this.handleSubmit}>Search</Button>
                        </Col>
                    </Form.Row>
                </Form>
                {this.renderSearchResult()}
            </div>
        )
    }
    
}


class SearchResult extends React.Component {
    constructor() {
        this.comments = []
        this.crowded = 0
        this.safety = 0
    }
    render() {
        return (
            <div>
                <p>{this.props.departure}</p>
            </div>
        )
    }
}

export default Search;