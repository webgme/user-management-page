import React from 'react';
import DataTable from './datatable/DataTable.jsx';
import Multiselect from './Multiselect.jsx';

export default class ProjectPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            organizations: [],
            collaborators: []
        };
    }

    componentDidMount() {

        let self = this,
            projectWithOwnerId = this.props.params.ownerId + '+' + this.props.params.projectName;

        Promise.all([
            self.props.restClient.users.getAllUsers(),
            self.props.restClient.organizations.getAllOrganizations()
        ]).then(function([allUsers, allOrganizations]) {

            Promise.all([
                getUsersWithAccess(allUsers, projectWithOwnerId),
                getOrganizationsWithAccess(allOrganizations, projectWithOwnerId)
                    .then(function(organizationMap) {
                        return getUsersInOrganizationsWithAccess(organizationMap, self.props.restClient.organizations);
                    })
            ]).then(function([allUsersWithAccess, allUsersInOrganizationsWithAccess]) {

                // Case for when project is not owned by any organizations
                if (!allUsersInOrganizationsWithAccess) {
                    return allUsersWithAccess; // Always have self
                } else {
                    for(let key in allUsersInOrganizationsWithAccess) {
                        if (!allUsersWithAccess[key]) { // If it doesn't exist then assign
                            allUsersWithAccess[key] = allUsersInOrganizationsWithAccess[key];
                        } else {
                            allUsersWithAccess[key].read = allUsersWithAccess[key].read || allUsersInOrganizationsWithAccess[key].read;
                            allUsersWithAccess[key].write = allUsersWithAccess[key].write || allUsersInOrganizationsWithAccess[key].write;
                            allUsersWithAccess[key].delete = allUsersWithAccess[key].delete || allUsersInOrganizationsWithAccess[key].delete;
                        }
                    }
                }

                // Convert hashmap into array for data table entries:
                let collaboratorsArrayForm = [];
                for(let keyName in allUsersWithAccess) {
                    collaboratorsArrayForm.push({
                        name: keyName,
                        read: allUsersWithAccess[keyName].read,
                        write: allUsersWithAccess[keyName].write,
                        delete: allUsersWithAccess[keyName].delete
                    });
                }

                self.setState({
                    collaborators: collaboratorsArrayForm
                });
            });
        });

        // User doesn't click dropdown immediately, so can load these after
        Promise.all([
            self.props.restClient.users.getAllUsers(),
            self.props.restClient.organizations.getAllOrganizations()
        ]).then(function([allUsers, allOrganizations]) {
            Promise.all([
                multiselectFormat(allUsers),
                multiselectFormat(allOrganizations)
            ]).then(function([formattedUsers, formattedOrganizations]) {
                self.setState({
                    users: formattedUsers,
                    organizations: formattedOrganizations
                });
            })
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
                           restClient={this.props.restClient}
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

function getUsersWithAccess(allUsers, projectWithOwnerId) {
    let userMap = {};
    allUsers.forEach(function(oneUser) {
        if (oneUser.projects.hasOwnProperty( projectWithOwnerId )) {
            userMap[oneUser['_id']] = {
                read: oneUser.projects[projectWithOwnerId].read,
                write: oneUser.projects[projectWithOwnerId].write,
                delete: oneUser.projects[projectWithOwnerId].delete
            };
        }
    });
    return userMap;
}

function getOrganizationsWithAccess(allOrganizations, projectWithOwnerId) {
    let organizationMap = {};

    allOrganizations.forEach(function(oneOrganization) {
        if (oneOrganization.projects.hasOwnProperty( projectWithOwnerId )) {
            organizationMap[oneOrganization['_id']] = {
                read: oneOrganization.projects[projectWithOwnerId].read,
                write: oneOrganization.projects[projectWithOwnerId].write,
                delete: oneOrganization.projects[projectWithOwnerId].delete
            };
        }
    });
    return Promise.resolve(organizationMap);
}

function getUsersInOrganizationsWithAccess(organizationMap, organizationsRestClient) {
    let userInOrganizationMap = {},
        promiseArray = [];

    for(let organizationId in organizationMap) {
        promiseArray.push(organizationsRestClient.getOrganizationData(organizationId) );
    }

    return Promise.all(promiseArray)
        .then(function(arrayOfDataForOrganizationsWithAccess) {
            arrayOfDataForOrganizationsWithAccess.forEach(function(oneOrganizationsData) {
                oneOrganizationsData.users.forEach(function(oneUser) {
                    userInOrganizationMap[oneUser] = organizationMap[oneOrganizationsData['_id']];
                });
            });
            return userInOrganizationMap;
        });
}

function multiselectFormat(allOfOneThing) {
    return allOfOneThing.map(function(oneThing) {
        return Object.assign({}, {
            label: oneThing['_id'],
            value: oneThing['_id']
        });
    });
}
