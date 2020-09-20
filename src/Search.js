import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Alert from 'react-bootstrap/Alert';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.departure = React.createRef();
        this.arrival = React.createRef();
        this.date = React.createRef();
        this.time = React.createRef();
        this.airline = React.createRef();

        //gen fake array
        this.searchResults = []

        this.state = {
            departure: 'any',
            arrival: 'any',
            date: 'any',
            time: 'any',
            airline: 'any',
            searchResults: this.searchResults,
            error: ''
        }

        this.result = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getSearchResults = this.getSearchResults.bind(this);
    }

    handleSubmit() {
        this.setState({
            departure: this.departure.current.value,
            arrival: this.arrival.current.value,
            date: this.date.current.value,
            time: this.time.current.value,
            airline: this.airline.current.value,
        });
        this.getSearchResults();
    }

    getSearchResults() {
        const queryData = new Map();
        queryData["departure"] = (this.departure.current.value !== "") ? this.departure.current.value : "any";
        queryData["arrival"] = (this.arrival.current.value !== "") ? this.arrival.current.value : "any";
        queryData["date"] = (this.date.current.value !== "") ? this.date.current.value : "any";
        queryData["time"] = (this.time.current.value !== "") ? this.time.current.value : "any";
        queryData["airline"] = (this.airline.current.value !== "") ? this.airline.current.value : "any";

        console.log(`json data being passed to api ${JSON.stringify(queryData)}`);
        const params = "query=" + JSON.stringify(queryData);
        fetch('/list?' + params, { method: 'GET'}, {headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }})
        .then(response => response.json()).then(data => {
            console.log(data);
            let queriedForms = []
            if (data.queried_forms !== undefined) {
                data.queried_forms.forEach(form => form["dateQuery"] = "any")
                queriedForms = data.queried_forms;
            } else {
                data.close_date_forms.forEach(form => form["dateQuery"] = "closeDay");
                data.same_weekday_forms.forEach(form => form["dateQuery"] = "sameWeekday");
                queriedForms = data.close_date_forms.concat(data.same_weekday_forms);
            }
            console.log(queriedForms);
            this.setState({"searchResults": queriedForms});
            this.setState({"error": queriedForms.length === 0 ? "Sorry there are zero submissions with those parameters." : ""})
        }); 
    }

    render() {
        return (
            <div>
                <Form className="searchbar-container body" >
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
                            <Form.Group controlId="formDate">
                                <Form.Label>Date:</Form.Label>
                                <Form.Control ref={this.date} type="date" placeholder="MM-DD-YYYY"/>
                            </Form.Group>
                        </Col>
                        
                        <Col>
                            <Form.Group controlId="formTime">
                                <Form.Label>Time of day:</Form.Label>
                                <Form.Control ref={this.time} as="select" defaultValue="Time">
                                    <option>Any</option>
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
                        <Col className="col-sm-1 align-to-end">
                            <Button className="group-margin" onClick={this.handleSubmit}>Search</Button>
                        </Col>
                    </Form.Row>
                </Form>
                {(this.state.searchResults.length !== 0) ? <SearchContainer searchResults={this.state.searchResults} dateQuery={this.state.date}/> : null}
                {(this.state.error !== "") ? <Alert variant="danger">{this.state.error}</Alert> : null}
            </div>
        )
    }
}

class SearchContainer extends React.Component {
    render() {
        const crowdedValues = this.props.searchResults.map(result => result["crowded"]);
        const easeOfMindValues = this.props.searchResults.map(result => result["safety"])
        let totalCrowd = 0;
        let totalEaseOfMindValues = 0;
        for(let i = 0; i < crowdedValues.length; i++) {
            totalCrowd += parseInt(crowdedValues[i], 10);
            totalEaseOfMindValues += parseInt(easeOfMindValues[i], 10);
        }
        const avgCrowd = (crowdedValues.length !== 0) ? totalCrowd / crowdedValues.length : 0;
        const avgEaseOfMind = (crowdedValues.length !== 0) ? totalEaseOfMindValues / crowdedValues.length : 0;

        const crowdPoints = avgCrowd < 25 ? "low" : (avgCrowd < 75 ? "medium" : "high");
        const easeOfMindPoints = avgEaseOfMind < 25 ? "low" : (avgEaseOfMind < 75 ? "medium" : "high");

        return (
            <div className='body pb-5'>
                <h3>Average Crowdedness:</h3>
                <ProgressBar className={'mb-4 ' + crowdPoints} now={avgCrowd} />
                <h3>Average Safety:</h3>
                <ProgressBar className={'mb-4 ' + easeOfMindPoints} now={avgEaseOfMind} />
                {this.props.searchResults.map((result, index) => (
                    <SearchResult
                        key = {index}
                        airline = {result.airline}
                        arrival = {result.arrival}
                        departure = {result.departure}
                        safety = {result.safety}
                        crowded = {result.crowded}
                        time = {result.time}
                        date = {result.date}
                        comments = {result.comments}
                        dateQuery = {result.dateQuery}
                    />
                ))}
            </div>
        )
    }
}

class SearchResult extends React.Component {
    render() {
        const title = this.props.airline + " from " + this.props.departure + " to " + this.props.arrival;
        const subtitle = this.props.time + " flight on " + this.props.date;
        const crowdedness = "Crowdedness: ";
        const safety =  "Safety: ";
        const extraComments = "Comments: " + this.props.comments;
        const backgroundColor = this.props.dateQuery === "sameWeekday" ? "#f2fafe" : "#f2edf8";
        const crowdPoints = this.props.crowded < 25 ? "low" : (this.props.crowded < 75 ? "medium" : "high");
        const easeOfMindPoints = this.props.safety < 25 ? "low" : (this.props.safety < 75 ? "medium" : "high");
        return (
            <Card className="mt-2 mb-2" style={{"backgroundColor": backgroundColor}}>
                <Card.Header className="pt-4">
                    <Card.Title>{title}</Card.Title>
                </Card.Header>
                <Card.Body className="pt-4">
                    <Card.Subtitle className="pb-3" >{subtitle}</Card.Subtitle>
                    <Card.Text className='mb-2'>{crowdedness}</Card.Text>
                    <ProgressBar className={'progress-bar-card mt-0 mb-2 ' + crowdPoints} now={this.props.crowded}/>
                    <Card.Text className='mb-2'>{safety}</Card.Text>
                    <ProgressBar className={'progress-bar-card mt-0 mb-3 ' + easeOfMindPoints} now={this.props.safety}/>
                    <Card.Text>{extraComments}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default Search;