import React from 'react'
import RestClient from '../restclient/restClient'

export default class Button extends React.Component {

    constructor(props) {
        super(props);

        // The binding is necessary in ES6 to allow the usage of 'this' inside the function
        this.onClick = this.onClick.bind(this);

        this.restClient = new RestClient();

        this.state = {
            label: this.props.text
        };
    }

    onClick(/*event*/) {
        var self = this;
        // This is an example for state changes.
        self.setState({label: 'getting...'});

        self.restClient.user.getUser(function (err, userData) {
            if (err) {
                console.error(err);
            } else {
                console.log("Got user info: ", userData);

                //This is an example state change.
                self.setState({label: userData._id});
            }
        });
    }

    render() {
        return <button type="button" className="btn btn-default" onClick={this.onClick}>{this.state.label}</button>
    }
}