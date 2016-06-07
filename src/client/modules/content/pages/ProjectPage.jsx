// Libraries
import React from '../../../../../node_modules/react/lib/React';
import Button from '../../../../../node_modules/react-bootstrap/lib/Button';
import ButtonGroup from '../../../../../node_modules/react-bootstrap/lib/ButtonGroup';
import {withRouter} from 'react-router';
// Self defined
import DataTable from './datatable/DataTable.jsx';
import Multiselect from './Multiselect.jsx';
import ProjectDataTableEntry from './datatable/ProjectDataTableEntry.jsx';

class ProjectPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authorizedToAdd: false,
            authorizeButtonGroup: {read: false, write: false, delete: false},
            collaborators: [],
            display: 1, // 1 indicates displaying the user table, 2 indicates the organizations
            formattedUsers: [],
            formattedOrganizations: [],
            numTimesClicked: 0,
            valuesInUsersMultiselect: [],
            valuesInOrganizationsMultiselect: []
        };
        this.handleAuthorizationChange = this.handleAuthorizationChange.bind(this);
        this.handleMultiselectChange = this.handleMultiselectChange.bind(this);
        this.handleSubmitAuthorization = this.handleSubmitAuthorization.bind(this);
        this.handleTableSwitch = this.handleTableSwitch.bind(this);
        this.orderEntries = this.orderEntries.bind(this);
        this.retrieveData = this.retrieveData.bind(this);
    }

    componentDidMount() {
        this.retrieveData();
    }

    retrieveData() {

        // Keep track of user removing self when he/she is only collaborator
        // Have to use this to NOT setState of unmounted components
        let didUserRemoveSelfWhenOnlyCollaborator = false;
        // reset through setState first because user may have just clicked it (needs immediate feedback)
        this.setState({
            authorizeButtonGroup: {read: false, write: false, delete: false},
            valuesInUsersMultiselect: [],
            valuesInOrganizationsMultiselect: []
        });

        let self = this,
            projectId = this.props.params.ownerId + '+' + this.props.params.projectName;

        Promise.all([
            self.props.restClient.users.getUsersWithAccessToProject(projectId),
            self.props.restClient.organizations.getUsersInOrganizationsWithAccessToProject(projectId),
            self.props.restClient.organizations.getOrganizationsWithAccessToProject(projectId)
        ]).then(([usersWithAccess, usersInOrganizationsWithAccess, organizationsWithAccess]) => {

            // Union of rights if in organization
            if (!isEmpty(usersInOrganizationsWithAccess)) {
                for (let key in usersInOrganizationsWithAccess) {
                    if (usersWithAccess[key]) {
                        usersWithAccess[key].read = usersWithAccess[key].read || usersInOrganizationsWithAccess[key].read; // eslint-disable-line max-len
                        usersWithAccess[key].write = usersWithAccess[key].write || usersInOrganizationsWithAccess[key].write; // eslint-disable-line max-len
                        usersWithAccess[key].delete = usersWithAccess[key].delete || usersInOrganizationsWithAccess[key].delete; // eslint-disable-line max-len
                    } else {// If it doesn't exist then simply assign
                        usersWithAccess[key] = usersInOrganizationsWithAccess[key];
                    }
                }
            } else if (isEmpty(usersWithAccess)) { // Case for when project is not owned by any organizations
                didUserRemoveSelfWhenOnlyCollaborator = true;
                this.props.router.replace('/projects/');
            } else {
                // Do nothing because then usersWithAccess is just self and does not need to be modified
            }

            // Check if entries just needs to be the organizations
            if (this.state.display === 2) {
                // One to be converted to entries (using name usersWithAccess so don't have to reallocate)
                usersWithAccess = organizationsWithAccess;
            }

            if (!didUserRemoveSelfWhenOnlyCollaborator) {
                // Convert hashmap into array for data table entries:
                let collaboratorsArrayForm = [];
                for (let keyName in usersWithAccess) {
                    if (usersWithAccess.hasOwnProperty(keyName)) {
                        collaboratorsArrayForm.push({
                            name: keyName,
                            read: usersWithAccess[keyName].read,
                            write: usersWithAccess[keyName].write,
                            delete: usersWithAccess[keyName].delete,
                            inOrg: usersWithAccess[keyName].inOrg
                        });
                    }
                }
                self.setState({
                    collaborators: collaboratorsArrayForm.sort(sortObjectArrayByField('name'))
                });
            }
        });

        // Setting authorization (To set the dropdowns/buttons visibility)
        // If owner is a single user and matches current user
        if (!didUserRemoveSelfWhenOnlyCollaborator) {
            self.props.restClient.getAuthorizationToAdd(self.props.params.ownerId)
                .then(authorization => {
                    self.setState({
                        authorizedToAdd: authorization
                    });
                });

            // User doesn't click dropdown immediately, so can load these after
            Promise.all([
                self.props.restClient.users.getAllUsers(),
                self.props.restClient.organizations.getAllOrganizations()
            ]).then(function([allUsers, allOrganizations]) {
                self.setState({
                    formattedUsers: multiselectFormat(allUsers.sort(sortObjectArrayByField('_id'))),
                    formattedOrganizations: multiselectFormat(allOrganizations.sort(sortObjectArrayByField('_id')))
                });
            });
        }
    }

    handleAuthorizationChange(event) {
        // have to copy whole object and reset the state
        let lowerCaseInnerHTML = event.target.innerHTML.toLowerCase();
        let newButtonGroupState = this.state.authorizeButtonGroup;

        newButtonGroupState[lowerCaseInnerHTML] = !this.state.authorizeButtonGroup[lowerCaseInnerHTML];

        this.setState({
            authorizeButtonGroup: newButtonGroupState
        });
    }

    handleMultiselectChange(value) {
        if (this.state.display === 1) {
            this.setState({
                valuesInUsersMultiselect: value
            });
        } else if (this.state.display === 2) {
            this.setState({
                valuesInOrganizationsMultiselect: value
            });
        }
    }

    handleSubmitAuthorization() {
        let usersOrOrganizations = this.state.display === 1 ? this.state.valuesInUsersMultiselect :
                                                              this.state.valuesInOrganizationsMultiselect;

        // Check if the user chose to authorize users or organizations
        let projectRights = '';
        projectRights += this.state.authorizeButtonGroup.read ? 'r' : null;
        projectRights += this.state.authorizeButtonGroup.write ? 'w' : null;
        projectRights += this.state.authorizeButtonGroup.delete ? 'd' : null;

        let promiseArrayToGrant = [];

        usersOrOrganizations.split(',').forEach(userOrOrgName => {
            if (projectRights === '') { // have to remove rights if none are selected
                promiseArrayToGrant.push(
                    this.props.restClient.projects.removeRightsToProject(this.props.params.ownerId,
                                                                         this.props.params.projectName,
                                                                         userOrOrgName)
                );
            } else {
                promiseArrayToGrant.push(
                    this.props.restClient.projects.grantRightsToProject(this.props.params.ownerId,
                                                                        this.props.params.projectName,
                                                                        userOrOrgName,
                                                                        projectRights)
                );
            }
        });

        Promise.all(promiseArrayToGrant)
            .then(() => {
                // Have to update the list after authorization rights change
                this.retrieveData();
            })
            .catch(() => {
                console.log('Authorization denied.'); // eslint-disable-line no-console
            });

    }

    handleTableSwitch(event) {
        let holdOldDisplayNum = this.state.display;
        let newDisplayNum = event.target.innerHTML === 'Users' ? 1 : 2;

        this.setState({
            display: newDisplayNum
        });

        // If the table changed, then have to retrieve data again
        if (holdOldDisplayNum !== newDisplayNum) {
            this.retrieveData();
        }

    }

    orderEntries() {
        this.setState({
            collaborators: this.state.numTimesClicked % 2 === 0 ? // Switch ordering every click
                this.state.collaborators.sort(sortObjectArrayByField('name')).reverse() :
                this.state.collaborators.sort(sortObjectArrayByField('name')),
            numTimesClicked: this.state.numTimesClicked + 1
        });
    }

    render() {

        let categories = {
            users: [
                {id: 1, name: 'UserID:'},
                {id: 2, name: 'Rights (RWD)'}
            ],
            organizations: [
                {id: 1, name: 'OrganizationID:'},
                {id: 2, name: 'Rights(RWD)'}
            ]
        };

        let noRightsSelected = true;

        for (let accessType in this.state.authorizeButtonGroup) {
            if (this.state.authorizeButtonGroup.hasOwnProperty(accessType) &&
                this.state.authorizeButtonGroup[accessType]) {
                noRightsSelected = false;
            }
        }

        return (

            <section className="content">
                <h3> {this.props.params.projectName} by {this.props.params.ownerId} </h3>

                <DataTable ownerId={this.props.params.ownerId}
                           projectName={this.props.params.projectName}
                           restClient={this.props.restClient}
                           categories={this.state.display === 1 ? categories.users : categories.organizations}
                           whichTable="collaborators"
                           tableName="Collaborators"
                           entries={this.state.collaborators}
                           orderEntries={this.orderEntries}
                           numTimesClicked={this.state.numTimesClicked}
                           display={this.state.display}
                           handleTableSwitch={this.handleTableSwitch}
                           sortable={true}>
                    <ProjectDataTableEntry/>
                </DataTable>

                {/* Loaded only if user is an owner/(admin of org who is the owner))*/}
                {this.state.authorizedToAdd ?
                    (<div>
                        <div className="row">

                            <ButtonGroup>
                                <Button bsStyle={this.state.authorizeButtonGroup.read ? "primary" : null}
                                        onClick={this.handleAuthorizationChange}
                                        id="ur">Read</Button>
                                <Button bsStyle={this.state.authorizeButtonGroup.write ? "primary" : null}
                                        onClick={this.handleAuthorizationChange}
                                        id="uw">Write</Button>
                                <Button bsStyle={this.state.authorizeButtonGroup.delete ? "primary" : null}
                                        onClick={this.handleAuthorizationChange}
                                        id="ud">Delete</Button>
                            </ButtonGroup>

                            <div className="col-sm-5">
                                <Multiselect label={this.state.display === 1 ? "Authorize/Deauthorize Users" : "Authorize/Deauthorize Organizations"}
                                             placeholder={this.state.display === 1 ? "Select one or more users (type to search)" : "Select one or more organizations (type to search)"} // eslint-disable-line no-useless-concat
                                             options={this.state.display === 1 ? this.state.formattedUsers : this.state.formattedOrganizations}
                                             onChange={this.handleMultiselectChange}
                                             valuesInMultiselect={this.state.display === 1 ? this.state.valuesInUsersMultiselect : this.state.valuesInOrganizationsMultiselect}/>
                            </div>

                            <div>
                                <ButtonGroup>
                                    <Button bsStyle="success"
                                            id="submitUser"
                                            onClick={this.handleSubmitAuthorization}>
                                        {this.state.display === 1 ? noRightsSelected ? 'Remove users rights' : 'Authorize users' : noRightsSelected ? 'Remove organizations rights' : 'Authorize organizations'} {/* Need this nest or needs to move out of return */}
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

/**
 * Formats an array of objects to be sent to the multiselect drop-down list
 * @param {Array} allOfOneThing - array of one kind of objects(users/organizations)
 * @return {Object|*|Array} - Formatted array for use with react-select
 */
function multiselectFormat(allOfOneThing) {
    return allOfOneThing.map(oneThing => {
        return Object.assign({}, {
            label: oneThing._id,
            value: oneThing._id
        });
    });
}

/**
 * Custom sort method to sort objects by a chosen field
 * @param {string} field - field of object to be sorted by
 * @return {Function} - to be used as callback for javascript's native sort method
 */
function sortObjectArrayByField(field) {
    return function(a, b) {
        return (a[field].toLowerCase() < b[field].toLowerCase()) ? -1 :
            (a[field].toLowerCase() > b[field].toLowerCase()) ? 1 : 0;
    };
}

/**
 * Check if an object is empty
 * @param {Object} object - object to be checked
 * @return {boolean} - returns whether or not the object is "empty"
 */
function isEmpty(object) {

    if (object === null) {
        return true;
    } else if (object.length > 0) {
        return false;
    } else if (object.length === 0) {
        return true;
    }

    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

// Needs withRouter for component's context (router is contained in there)
export default withRouter(ProjectPage);
