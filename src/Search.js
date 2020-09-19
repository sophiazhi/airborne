import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: "api isn't called"
        }
    }

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
}

export default Search;