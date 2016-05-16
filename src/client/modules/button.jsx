import React from 'react'
import RestClient from './../restclient/restclients'
//var RestClient = require('../../restclient/restclients.js');

//import RestClient from './restclients'

export default React.createClass({

    constructor: function(props) {
        super(props);
        this.restClient = new RestClient();
    },
    onClick: function(event) {
        this.restClient.user.getUser( function(err, userData) {
            if (err) {
                console.error(err);
            } else {
                console.log("Got user info: ", userData);
            }
        });
    },
    render: function() {
        return <button type="button" className="btn btn-default" onClick ={this.onClick}>{this.props.text}</button>
    }
});