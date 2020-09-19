import React from 'react';

class Contribute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {departure: '',
                        arrival: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({departure: event.target.value});
    }

    handleSubmit(event) {
        alert('test submitted ' + this.state.departure);
        // actually need to save to database
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Departure:
                    <input type="text" value={this.state.departure} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default Contribute;