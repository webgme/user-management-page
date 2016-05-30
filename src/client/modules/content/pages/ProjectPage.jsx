import React from 'react';
import RestClient from '../../../rest_client/restClient.js';
import CollaboratorDataTable from './datatable/CollaboratorDataTable.jsx';
import Multiselect from './Multiselect.jsx';

export default class ProjectPage extends React.Component {

    constructor(props) {
        super(props);
        this.restClient = new RestClient();
        this.state = {
            users: [],
            organizations: []
        }
    }

    componentDidMount() {
        let self = this;
        this.restClient.users.getAllUsers()
            .then(function(userList) {
                userList.forEach(function(user) {
                    self.setState({
                        users: self.state.users.concat({
                            label: user['_id'],
                            value: user['_id']
                        })
                    });
                });
            });

        this.restClient.organizations.getAllOrganizations()
            .then(function(organizationList) {
                organizationList.forEach(function(organization) {
                    self.setState({
                        organizations: self.state.organizations.concat({
                            label: organization['_id'],
                            value: organization['_id']
                        })
                    });
                });
            });

    }

    render() {

        return (

        <section className="content">
            <h3> {this.props.params.projectName} by {this.props.params.ownerId} </h3>

            <CollaboratorDataTable ownerId={this.props.params.ownerId}
                                   projectName={this.props.params.projectName}
                                   restClient={this.restClient}/>

            <div>
                <Multiselect label="Authorize Users"
                             placeholder="Select one or more users"
                             options={this.state.users}
                             style={{display: "inline-block"}}
                />
                <button name="authorizeUsers" style={{display: "inline-block"}}>Authorize users</button>
            </div>


            <div>
                <Multiselect label="Authorize Organizations"
                             placeholder="Select one or more organizations"
                             options={this.state.organizations}/>
                <button name="authorizeUsers">Authorize organizations</button>
            </div>



        </section>
    );
    }

}
