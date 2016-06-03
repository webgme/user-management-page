import React from 'react';
import DataTable from './datatable/DataTable.jsx';
import Multiselect from './Multiselect.jsx';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

export default class ProjectPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            organizations: [],
            collaborators: [],
            numTimesClicked: 0,
            authorizedToAdd: false,
            authorizeUsersButtonGroup: {
                read: false,
                write: false,
                delete: false
            },
            authorizeOrganizationsButtonGroup: {
                read: false,
                write: false,
                delete: false
            },
            valuesInUsersMultiselect: [],
            valuesInOrganizationsMultiselect: []
        };
        this.orderEntries = this.orderEntries.bind(this);
        this.handleAuthorizationChange = this.handleAuthorizationChange.bind(this);
        this.handleMultiselectChange = this.handleMultiselectChange.bind(this);
        this.handleSubmitAuthorization = this.handleSubmitAuthorization.bind(this);
        this.retrieveData = this.retrieveData.bind(this);
    }

    componentDidMount() {
        this.retrieveData();
    }

    retrieveData() {

        // Send setState request first because user may have just clicked it
        this.setState({
            valuesInUsersMultiselect: [],
            valuesInOrganizationsMultiselect: [],
            authorizeUsersButtonGroup: {
                read: false,
                write: false,
                delete: false
            },
            authorizeOrganizationsButtonGroup: {
                read: false,
                write: false,
                delete: false
            }
        });

        let self = this,
            projectWithOwnerId = this.props.params.ownerId + '+' + this.props.params.projectName;

        Promise.all([
            self.props.restClient.users.getAllUsers(),
            self.props.restClient.organizations.getAllOrganizations()
        ]).then(([allUsers, allOrganizations]) => {

            Promise.all([
                getUsersWithAccess(allUsers, projectWithOwnerId),
                getOrganizationsWithAccess(allOrganizations, projectWithOwnerId)
                    .then(organizationMap => {
                        return getUsersInOrganizationsWithAccess(organizationMap, self.props.restClient.organizations);
                    })
            ]).then(([allUsersWithAccess, allUsersInOrganizationsWithAccess]) => {

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
                    collaborators: collaboratorsArrayForm.sort(sortObjectArrayByField('name'))
                });
            });
        });

        // Setting authorization (To set the dropdowns/buttons visibility)
        // If owner is a single user and matches current user
        self.props.restClient.user.getCurrentUser()
            .then(currentUser => {
                if (currentUser['_id'] === self.props.params.ownerId) {
                    self.setState({
                        authorizedToAdd: true
                    });
                } else { // Check if owner is an organization and current user is an admin
                    let findAdminPromiseArray = [];
                    currentUser['orgs'].forEach(orgName =>
                        findAdminPromiseArray.push(self.props.restClient.organizations.getOrganizationData(orgName))
                    );
                    Promise.all(findAdminPromiseArray)
                        .then(adminsOfOrganizationsUserIsIn => {
                            adminsOfOrganizationsUserIsIn.forEach(organizationData => {
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
                multiselectFormat( (allUsers.sort(sortObjectArrayByField('_id'))) ),
                multiselectFormat( (allOrganizations.sort(sortObjectArrayByField('_id'))) )
            ]).then(([formattedUsers, formattedOrganizations]) => {
                self.setState({
                    users: formattedUsers,
                    organizations: formattedOrganizations
                });
            })
        });
    }

    orderEntries() {
        this.setState({
            collaborators: this.state.numTimesClicked % 2 === 0 ? this.state.collaborators.sort(sortObjectArrayByField('name')).reverse() : this.state.collaborators.sort(sortObjectArrayByField('name')),
            numTimesClicked: this.state.numTimesClicked + 1
        });
    }

    handleAuthorizationChange(event) {
        //have to copy whole object and reset the state
        let newButtonGroupState;

        if (event.target.id.indexOf('u') !== -1) {
            newButtonGroupState = this.state.authorizeUsersButtonGroup;
            newButtonGroupState[event.target.innerHTML.toLowerCase()] = !this.state.authorizeUsersButtonGroup[event.target.innerHTML.toLowerCase()];

            this.setState({
                authorizeUsersButtonGroup: newButtonGroupState
            });
        } else {
            newButtonGroupState = this.state.authorizeOrganizationsButtonGroup;
            newButtonGroupState[event.target.innerHTML.toLowerCase()] = !this.state.authorizeOrganizationsButtonGroup[event.target.innerHTML.toLowerCase()];

            this.setState({
                authorizeOrganizationsButtonGroup: newButtonGroupState
            });
        }
    }

    handleMultiselectChange(multiselectId, value) {

        if (multiselectId === 'user') {
            this.setState({
                valuesInUsersMultiselect: value
            });
        } else if (multiselectId === 'organization') {
            this.setState({
                valuesInOrganizationsMultiselect: value
            });
        }
    }

    handleSubmitAuthorization(event) {
        let targetId = event.target.id.toLowerCase();
        let usersOrOrganizations;

        // Check if the user chose to authorize users or organizations
        let projectRights = '';
        if (/user/.test(targetId) ) {
            usersOrOrganizations = this.state.valuesInUsersMultiselect;
            this.state.authorizeUsersButtonGroup.read ? projectRights += 'r' : null;
            this.state.authorizeUsersButtonGroup.write ? projectRights += 'w': null;
            this.state.authorizeUsersButtonGroup.delete ? projectRights += 'd': null;
        } else if (/organization/.test(targetId) ) {
            usersOrOrganizations = this.state.valuesInOrganizationsMultiselect;
            this.state.authorizeOrganizationsButtonGroup.read ? projectRights += 'r' : null;
            this.state.authorizeOrganizationsButtonGroup.write ? projectRights += 'w' : null;
            this.state.authorizeOrganizationsButtonGroup.delete ? projectRights += 'd' : null;
        }

        let promiseArrayToGrant = [];

        usersOrOrganizations.split(',').forEach( userOrOrgName => {
            if (projectRights !== '') {
                promiseArrayToGrant.push(
                    this.props.restClient.projects.grantRightsToProject(this.props.params.ownerId,
                                                                        this.props.params.projectName,
                                                                        userOrOrgName,
                                                                        projectRights)
                );
            } else { // have to remove rights if none are selected
                promiseArrayToGrant.push(
                    this.props.restClient.projects.removeRightsToProject(this.props.params.ownerId,
                                                                         this.props.params.projectName,
                                                                         userOrOrgName)
                );
            }
        });

        Promise.all(promiseArrayToGrant)
            .then(() => {
                this.retrieveData();
            })
            .catch(() => {
                console.log('Authorization denied.');
            });

    }

    render() {

        let categories = [
            {id: 1, name: 'UserID:'},
            {id: 2, name: 'Rights (RWD)'}
        ];

        let usersNoRightsSelected = true,
            organizationsNoRightsSelected = true;


        for(let accessType in this.state.authorizeUsersButtonGroup) {
            if (this.state.authorizeUsersButtonGroup[accessType]) {
                usersNoRightsSelected = false;
            }
        }
        for(let accessType in this.state.authorizeOrganizationsButtonGroup) {
            if (this.state.authorizeOrganizationsButtonGroup[accessType]) {
                organizationsNoRightsSelected = false;
            }
        }


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
                           orderEntries={this.orderEntries}
                           numTimesClicked={this.state.numTimesClicked}/>

                {/*Loaded only if user is an owner/(admin of org who is the owner))*/}
                {this.state.authorizedToAdd ?
                    (<div>
                        <div className="row">

                            <ButtonGroup>
                                <Button bsStyle={this.state.authorizeUsersButtonGroup.read ? "primary" : null}
                                        onClick={this.handleAuthorizationChange}
                                        id="ur">Read</Button>
                                <Button bsStyle={this.state.authorizeUsersButtonGroup.write ? "primary" : null}
                                        onClick={this.handleAuthorizationChange}
                                        id="uw">Write</Button>
                                <Button bsStyle={this.state.authorizeUsersButtonGroup.delete ? "primary" : null}
                                        onClick={this.handleAuthorizationChange}
                                        id="ud">Delete</Button>
                            </ButtonGroup>

                            <div className="col-sm-5">
                                <Multiselect label="Authorize/Deauthorize Users"
                                             placeholder="Select one or more users (type to search)"
                                             options={this.state.users}
                                             multiselectId="user"
                                             onChange={this.handleMultiselectChange}
                                             valuesInMultiselect={this.state.valuesInUsersMultiselect}/>
                            </div>

                            <div>
                                <ButtonGroup>
                                    <Button bsStyle="success"
                                            id="submitUser"
                                            onClick={this.handleSubmitAuthorization}>
                                        {usersNoRightsSelected ? 'Remove users rights' : 'Authorize users'}
                                    </Button>
                                </ButtonGroup>
                            </div>

                        </div>


                        <div className="row">

                            <ButtonGroup>
                                <Button bsStyle={this.state.authorizeOrganizationsButtonGroup.read ? "primary" : null}
                                        onClick={this.handleAuthorizationChange}
                                        id="or">Read</Button>
                                <Button bsStyle={this.state.authorizeOrganizationsButtonGroup.write ? "primary" : null}
                                        onClick={this.handleAuthorizationChange}
                                        id="ow">Write</Button>
                                <Button bsStyle={this.state.authorizeOrganizationsButtonGroup.delete ? "primary" : null}
                                        onClick={this.handleAuthorizationChange}
                                        id="od">Delete</Button>
                            </ButtonGroup>

                            <div className="col-sm-5">
                                <Multiselect label="Authorize/Deauthorize Organizations"
                                             placeholder="Select one or more organizations (type to search)"
                                             options={this.state.organizations}
                                             multiselectId="organization"
                                             onChange={this.handleMultiselectChange}
                                             valuesInMultiselect={this.state.valuesInOrganizationsMultiselect}/>
                            </div>
                            <div>
                                <ButtonGroup>
                                    <Button bsStyle="success"
                                            id="submitOrganization"
                                            onClick={this.handleSubmitAuthorization}>
                                        {organizationsNoRightsSelected ? 'Remove organizations rights' : 'Authorize organizations'}
                                    </Button>
                                </ButtonGroup>
                            </div>

                        </div>
                    </div>) : null
                }

            </section>
        );
    }

}

function getUsersWithAccess(allUsers, projectWithOwnerId) {
    let userMap = {};
    allUsers.forEach(oneUser => {
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

    allOrganizations.forEach(oneOrganization => {
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
        .then(arrayOfDataForOrganizationsWithAccess => {
            arrayOfDataForOrganizationsWithAccess.forEach(oneOrganizationsData => {
                oneOrganizationsData.users.forEach(oneUser => {
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
    return allOfOneThing.map(oneThing => {
        return Object.assign({}, {
            label: oneThing['_id'],
            value: oneThing['_id']
        });
    });
}

function sortObjectArrayByField(field) {
    let paramField = field;

    // If the dot notation is replaced with brackets why does that matter???
    // TODO: figure that out... it has happened in other places too?
    return function(a, b) {
        return (a[paramField].toLowerCase() < b[paramField].toLowerCase()) ? -1 : (a[paramField].toLowerCase() > b[paramField].toLowerCase()) ? 1 : 0;
    }
}