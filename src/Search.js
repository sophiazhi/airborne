import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.departure = React.createRef();
        this.arrival = React.createRef();
        this.dayOfWeek = React.createRef();
        this.time = React.createRef();
        this.airline = React.createRef();

        //fake map
        /*this.searchResult = new Map()
        this.searchResult['airline'] = 'delta'
        this.searchResult['arrival'] = 'nyc'
        this.searchResult['departure'] = 'boston'
        this.searchResult['safety'] = '68'
        this.searchResult['crowded'] = '19'
        this.searchResult['date'] = '9/19/20'
        this.searchResult['time'] = 'Early morning'
        this.searchResult['comments'] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eleifend aliquam quam non placerat. Pellentesque sodales vulputate urna sit amet molestie. Proin bibendum posuere ligula id laoreet. Donec pretium eros ut arcu porttitor fermentum. Nam congue neque at justo blandit suscipit. Nam tempus eu erat non faucibus. Donec mauris enim, faucibus id maximus a, tempus id turpis. Suspendisse bibendum ex eu sapien vulputate venenatis in at felis. Fusce hendrerit lorem eget imperdiet gravida. Suspendisse cursus malesuada tortor sodales vulputate. Nullam facilisis eros et libero mollis interdum."
*/
        //gen fake array
        this.searchResults = []
        /*for (let i = 0; i < 10; i++) {
            this.searchResults.push(this.searchResult);
        }*/

        this.state = {
            departure: 'any',
            arrival: 'any',
            dayOfWeek: 'any',
            time: 'any',
            airline: 'any',
            searchResults: this.searchResults,
        }

        this.result = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderSearchContainer = this.renderSearchContainer.bind(this);
    }

    handleSubmit() {
        this.setState({
            departure: this.departure.current.value,
            arrival: this.arrival.current.value,
            dayOfWeek: this.dayOfWeek.current.value,
            time: this.time.current.value,
            airline: this.airline.current.value,
        });
        this.renderSearchContainer();
    }

    renderSearchContainer() {
        //only render if none in state aren't empty
        const results = Object.assign({}, this.state);
        for (const i in results) {
            if (results[i] === '') {
                return null;
            }
        }
        /*
        const queryData = new Map();
        queryData["departure"] = (this.state.departure !== "") ? this.state.departure : "any";
        queryData["arrival"] = (this.state.arrival !== "") ? this.state.arrival : "any";
        queryData["date"] = (this.state.date !== "") ? this.state.date : "any";
        queryData["time"] = (this.state.time !== "") ? this.state.time : "any";
        queryData["airline"] = (this.state.airline !== "") ? this.state.airline : "any";

        //const queryParam = "query=" + JSON.stringify queryData);
        console.log(`json data being passed to api ${JSON.stringify(queryData)}`);
        const params = "query=" + JSON.stringify(queryData);
        fetch('/list?' + params, { method: 'GET'}, {headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }})
        .then(response => response.json()).then(data => console.log(data));
        */
        return(
            <SearchContainer
                searchResults={this.state.searchResults}       
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
            </div>
        )
    }
}



class SearchContainer extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            avgCrowded: 30,
            avgSafety: 60,
        }
    }

    render() {

        // const crowdedValues = this.props.searchResults.map(result => result["crowded"]);
        // const avgCrowded = crowdedValues.reduce((sumSoFar, currentValue) => sumSoFar + parseInt(currentValue), 0) / crowdedValues.length;

        // const safetyValues = this.props.searchResults.map(result => result["safety"]);
        // const avgSafety = safetyValues.reduce((sumSoFar, currentValue) => sumSoFar + parseInt(currentValue), 0) / safetyValues.length;

        const avgCrowded = 50;

        return (
            <div className='body'>
                <ProgressBar now={avgCrowded} />
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
        const crowdedness = "Crowdedness: " + this.props.crowded + "/100\n";
        const easeOfMind =  "Ease of mind: " + this.props.safety + "/100\n";
        const extraComments = "Comments: " + this.props.comments;
        return (
            <Card className="mt-2 mb-2" style={{"backgroundColor": "#f2edf8"}}>
                <Card.Header className="pt-4">
                    <Card.Title>{title}</Card.Title>
                </Card.Header>
                <Card.Body className="pt-4">
                    <Card.Subtitle className="pb-3" >{subtitle}</Card.Subtitle>
                    <Card.Text>{crowdedness}</Card.Text>
                    <Card.Text className="pb-3">{easeOfMind}</Card.Text>
                    <Card.Text>{extraComments}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default Search;