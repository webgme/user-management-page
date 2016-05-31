import React from 'react';
import DataTable from './datatable/DataTable.jsx';
import Multiselect from './Multiselect.jsx';

export default class ProjectPage extends React.Component {

    constructor(props) {
        super(props);
        this.restClient = this.props.restClient;
        this.state = {
            users: [],
            organizations: [],
            collaborators: []
        };
    }

    componentDidMount() {
        let self = this;
        let projectWithOwnerId = this.props.params.ownerId + '+' + this.props.params.projectName;
        // First checking through list of all users and seeing if each has access to the project
        this.restClient.users.getAllUsers()
            .then(function(users) {
                users.forEach(function(userData) {
                    self.setState({
                        users: self.state.users.concat({
                            label: userData['_id'],
                            value: userData['_id']
                        })
                    });
                    if (userData['_id'] === self.ownerId) {
                    }
                    if (userData['projects'].hasOwnProperty( projectWithOwnerId )) {
                        self.setState({
                            collaborators: (self.state.collaborators.concat( {
                                name: userData['_id'],
                                read: userData.projects[projectWithOwnerId].read,
                                write: userData.projects[projectWithOwnerId].write,
                                delete: userData.projects[projectWithOwnerId].delete
                            }))
                        });
                    }
                });
            })
            .then(function() {
                return self.restClient.organizations.getAllOrganizations();
            })
            // Then checking all organizations and seeing if each has access to the project
            .then(function(allOrganizations) {
                allOrganizations.forEach(function(singleOrganization) {
                    self.setState({
                        organizations: self.state.organizations.concat({
                            label: singleOrganization['_id'],
                            value: singleOrganization['_id']
                        })
                    });
                    if (singleOrganization.projects.hasOwnProperty( projectWithOwnerId )) {
                        let orgRights = {
                            read: singleOrganization.projects[projectWithOwnerId].read,
                            write: singleOrganization.projects[projectWithOwnerId].write,
                            delete: singleOrganization.projects[projectWithOwnerId].delete
                        };
                        self.restClient.organizations.getOrganizationData(singleOrganization['_id'])
                            .then(function(orgData) {
                                orgData.users.forEach(function(username) {
                                    // Checking if name is already in collaborators list
                                    for(let i = 0; i < self.state.collaborators.length; i++) {
                                        if (self.state.collaborators[i].name !== username) {
                                            self.setState({
                                                collaborators: self.state.collaborators.concat( {
                                                    name: username,
                                                    read: orgRights.read,
                                                    write: orgRights.write,
                                                    delete: orgRights.delete
                                                })
                                            });
                                        } else {
                                            let oldRights = {
                                                read: self.state.collaborators[i].read,
                                                write: self.state.collaborators[i].write,
                                                delete: self.state.collaborators[i].delete
                                            };
                                            //copy state without that person
                                            let collaboratorsWithoutDuplicate = self.state.collaborators.filter( each => {
                                                return each.name !== self.state.collaborators[i].name;
                                            });
                                            self.setState({
                                                collaborators: collaboratorsWithoutDuplicate.concat( {
                                                    name: username,
                                                    read: oldRights.read || orgRights.read,
                                                    write: oldRights.write || orgRights.write,
                                                    delete: oldRights.delete || orgRights.delete
                                                })
                                            });
                                        }
                                    }

                                });
                            });
                    }
                });
            });
    }

    render() {

        let categories = [
            {id: 1, name: 'UserID:'},
            {id: 2, name: 'Rights (RWD)'}
            // TODO: add icon indicating whether rights are from an organization or self
        ];

        return (

            <section className="content">
                <h3> {this.props.params.projectName} by {this.props.params.ownerId} </h3>

                <DataTable ownerId={this.props.params.ownerId}
                           projectName={this.props.params.projectName}
                           restClient={this.restClient}
                           categories={categories}
                           whichTable="project"
                           tableName="Collaborators"
                           entries={this.state.collaborators}/>

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
