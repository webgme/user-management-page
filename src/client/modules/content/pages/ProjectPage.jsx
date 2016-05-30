import React from 'react';
import RestClient from '../../../rest_client/restClient.js';
import CollaboratorDataTable from './datatable/CollaboratorDataTable.jsx';

export default class ProjectPage extends React.Component {

    constructor(props) {
        super(props);
        this.restClient = new RestClient();
    }

    render() {

        return (

        <section className="content">
            <h3> {this.props.params.projectName} by {this.props.params.ownerId} </h3>

            <CollaboratorDataTable ownerId={this.props.params.ownerId}
                                   projectName={this.props.params.projectName}
                                   restClient={this.restClient}/>

            <h3>Authorization options go here</h3>
            
        </section>
    );
    }

}
