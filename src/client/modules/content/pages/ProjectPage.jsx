import React from 'react';
import RestClient from '../../../rest_client/restClient.js';

export default class ProjectPage extends React.Component {

    constructor(props) {
        super(props);
        this.restClient = new RestClient();
    }

    render() {

        return (

        <section className="content">
            <h2>Singular project page Content</h2>
            <h3>Owner: {this.props.params.ownerId}</h3>
            <h4>Project Name: {this.props.params.projectName}</h4>

            <h1> table </h1>
            {/* <CommitDataTable restClient={this.restClient}/> */}
        </section>
    );
    }

}
