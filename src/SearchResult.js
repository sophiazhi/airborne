import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

class SearchResult extends React.Component{
    constructor(props) {
        super(props);
        //passed from search query
        this.departure = this.props.departure;
        this.arrival = this.props.arrival;
        this.dayOfWeek = this.props.dayOfWeek;
        this.time = this.props.time;
        this.airline = this.props.airline;

        //get these from database
        this.crowded = null;
        this.safety = null;
        this.comments = [];

        //this.handleSubmit = this.handleSubmit.bind(this);
    }
}