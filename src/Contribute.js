import React from 'react';
//import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Contribute extends React.Component {
    constructor(props) {
        super(props);
        /*this.state = {departure: '',
                        arrival: ''};*/
        this.departure = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        //this.setState({departure: event.target.value});
        const departure = this.departure.current.value;
    }

    handleSubmit(event) {
        //alert('test submitted ' + this.state.departure + ' to ' + this.state.arrival);
        alert('test submitted ' + this.departure.current.value);
        // actually need to save to database
    }

    render() {
        return (
            /*<form onSubmit={this.handleSubmit}>
                <label>
                    Departure:
                    <input type="text" id="departure" value={this.state.departure} onChange={this.handleChange} />
                </label>
                <label>
                    Arrival:
                    <input type="text" id="arrival" value={this.state.arrival} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>*/
            <div>
                <Form.Control ref={this.departure} type="text" />
                <Button onClick={this.handleSubmit}>Submit</Button>
            </div>
        )
    }
}

export default Contribute;