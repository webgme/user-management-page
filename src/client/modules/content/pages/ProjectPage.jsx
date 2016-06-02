import React from 'react';
import DataTable from './datatable/DataTable.jsx';
import Multiselect from './Multiselect.jsx';

export default class ProjectPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            organizations: [],
            collaborators: [],
            numTimesClicked: 0,
            authorizedToAdd: false
        };
        this.orderEntries = this.orderEntries.bind(this);
    }

    componentDidMount() {

        let self = this,
            projectWithOwnerId = this.props.params.ownerId + '+' + this.props.params.projectName;

        Promise.all([
            self.props.restClient.users.getAllUsers(),
            self.props.restClient.organizations.getAllOrganizations()
        ]).then( ([allUsers, allOrganizations]) => {

            Promise.all([
                getUsersWithAccess(allUsers, projectWithOwnerId),
                getOrganizationsWithAccess(allOrganizations, projectWithOwnerId)
                    .then( organizationMap => {
                        return getUsersInOrganizationsWithAccess(organizationMap, self.props.restClient.organizations);
                    })
            ]).then( ([allUsersWithAccess, allUsersInOrganizationsWithAccess]) => {

                // Case for when project is not owned by any organizations
                if (!allUsersInOrganizationsWithAccess) {
                    return allUsersWithAccess; // Always have self
                } else {
                    for (let key in allUsersInOrganizationsWithAccess) {
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
                for (let keyName in allUsersWithAccess) {
                    collaboratorsArrayForm.push({
                        name: keyName,
                        read: allUsersWithAccess[keyName].read,
                        write: allUsersWithAccess[keyName].write,
                        delete: allUsersWithAccess[keyName].delete,
                        inOrg: allUsersWithAccess[keyName].inOrg
                    });
                }

                self.setState({
                    collaborators: collaboratorsArrayForm
                });
            });
        });

        // If owner is a single user and matches current user
        self.props.restClient.user.getCurrentUser()
            .then( currentUser => {
                if (currentUser['_id'] === self.props.params.ownerId) {
                    self.setState({
                        authorizedToAdd: true
                    });
                } else { // Check if owner is an organization and current user is an admin
                    let findAdminPromiseArray = [];
                    currentUser['orgs'].forEach( orgName =>
                        findAdminPromiseArray.push(self.props.restClient.organizations.getOrganizationData(orgName))
                    );
                    Promise.all(findAdminPromiseArray)
                        .then(adminsOfOrganizationsUserIsIn => {
                            adminsOfOrganizationsUserIsIn.forEach( organizationData => {
                                if (self.props.params.ownerId === organizationData['_id'] && organizationData['admins'].indexOf(currentUser['_id']) !== -1) {
                                    self.setState({
                                        authorizedToAdd: true
                                    });
                                }
                            });
                        });
                }
            });

        // User doesn't click dropdown immediately, so can load these after
        Promise.all([
            self.props.restClient.users.getAllUsers(),
            self.props.restClient.organizations.getAllOrganizations()
        ]).then(function ([allUsers, allOrganizations]) {
            Promise.all([
                multiselectFormat(allUsers),
                multiselectFormat(allOrganizations)
            ]).then( ([formattedUsers, formattedOrganizations]) => {
                self.setState({
                    users: formattedUsers,
                    organizations: formattedOrganizations
                });
            })
        });
    }

    orderEntries(){
        this.setState({
            collaborators: this.state.numTimesClicked % 2 === 1 ? this.state.collaborators.sort(sortByUserId).reverse() : this.state.collaborators.sort(sortByUserId),
            numTimesClicked: this.state.numTimesClicked + 1
        });
    }

    render() {

        let categories = [
            {id: 1, name: 'UserID:'},
            {id: 2, name: 'Rights (RWD)'}
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
                           entries={this.state.collaborators}
                           orderEntries={this.orderEntries}/>

                {this.state.authorizedToAdd ?
                    (<div>
                        <div className="row">
                            <div className="col-sm-5">
                                <Multiselect label="Authorize Users"
                                             placeholder="Select one or more users"
                                             options={this.state.users}/>
                            </div>

                            <div className="col-sm-7">
                                <button name="authorizeUsers">Authorize users</button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-5">
                                <Multiselect label="Authorize organizations"
                                             placeholder="Select one or more organizations"
                                             options={this.state.organizations}/>
                            </div>

                            <div className="col-sm-7">
                                <button name="authorizeUsers">Authorize organizations</button>
                            </div>
                        </div>
                    </div>) : null }

            </section>
        );
    }

}

function getUsersWithAccess(allUsers, projectWithOwnerId) {
    let userMap = {};
    allUsers.forEach( oneUser => {
        if (oneUser.projects.hasOwnProperty(projectWithOwnerId)) {
            userMap[oneUser['_id']] = {
                read: oneUser.projects[projectWithOwnerId].read,
                write: oneUser.projects[projectWithOwnerId].write,
                delete: oneUser.projects[projectWithOwnerId].delete,
                inOrg: false
            };
        }
    });
    return userMap;
}

function getOrganizationsWithAccess(allOrganizations, projectWithOwnerId) {
    let organizationMap = {};

    allOrganizations.forEach( oneOrganization => {
        if (oneOrganization.projects.hasOwnProperty(projectWithOwnerId)) {
            organizationMap[oneOrganization['_id']] = oneOrganization.projects[projectWithOwnerId];
        }
    });
    return Promise.resolve(organizationMap);
}

function getUsersInOrganizationsWithAccess(organizationMap, organizationsRestClient) {
    let userInOrganizationMap = {},
        promiseArray = [];

    for (let organizationId in organizationMap) {
        promiseArray.push(organizationsRestClient.getOrganizationData(organizationId));
    }

    return Promise.all(promiseArray)
        .then( arrayOfDataForOrganizationsWithAccess => {
            arrayOfDataForOrganizationsWithAccess.forEach( oneOrganizationsData => {
                oneOrganizationsData.users.forEach( oneUser => {
                    if (userInOrganizationMap[oneUser]) { //If in multiple organizations
                        userInOrganizationMap[oneUser] = {
                            read: userInOrganizationMap[oneUser].read || organizationMap[oneOrganizationsData['_id']].read,
                            write: userInOrganizationMap[oneUser].write || organizationMap[oneOrganizationsData['_id']].write,
                            delete: userInOrganizationMap[oneUser].delete || organizationMap[oneOrganizationsData['_id']].delete,
                            inOrg: true
                        }
                    } else {
                        userInOrganizationMap[oneUser] = organizationMap[oneOrganizationsData['_id']];
                        userInOrganizationMap[oneUser].inOrg = true;
                    }
                });
            });
            return userInOrganizationMap;
        });
}

function multiselectFormat(allOfOneThing) {
    return allOfOneThing.map( oneThing => {
        return Object.assign({}, {
            label: oneThing['_id'],
            value: oneThing['_id']
        });
    });
}

function sortByUserId(a, b) {
    return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
}