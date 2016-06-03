// Libraries
import React from '../../../../../node_modules/react/lib/React';
import Button from '../../../../../node_modules/react-bootstrap/lib/Button';
import ButtonGroup from '../../../../../node_modules/react-bootstrap/lib/ButtonGroup';
// Self defined
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
            authorizedToAdd: false,
            authorizeUsersButtonGroup:         {read: false, write: false, delete: false}, // eslint-disable-line key-spacing, max-len
            authorizeOrganizationsButtonGroup: {read: false, write: false, delete: false},
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
        // reset through setState first because user may have just clicked it (needs immediate feedback)
        this.setState({
            valuesInUsersMultiselect: [],
            valuesInOrganizationsMultiselect: [],
            authorizeUsersButtonGroup:         {read: false, write: false, delete: false}, // eslint-disable-line key-spacing, max-len
            authorizeOrganizationsButtonGroup: {read: false, write: false, delete: false}
        });

        let self = this,
            projectId = this.props.params.ownerId + '+' + this.props.params.projectName;

        Promise.all([
            self.props.restClient.users.getUsersWithAccessToProject(projectId),
            self.props.restClient.organizations.getUsersInOrganizationsWithAccessToProject(projectId)
        ]).then(([usersWithAccess, usersInOrganizationsWithAccess]) => {

            // Union of rights if in organization
            if (usersInOrganizationsWithAccess) {
                for (let key in usersInOrganizationsWithAccess) {
                    if (usersWithAccess[key]) {
                        usersWithAccess[key].read = usersWithAccess[key].read || usersInOrganizationsWithAccess[key].read; // eslint-disable-line max-len
                        usersWithAccess[key].write = usersWithAccess[key].write || usersInOrganizationsWithAccess[key].write; // eslint-disable-line max-len
                        usersWithAccess[key].delete = usersWithAccess[key].delete || usersInOrganizationsWithAccess[key].delete; // eslint-disable-line max-len
                    } else {// If it doesn't exist then simply assign
                        usersWithAccess[key] = usersInOrganizationsWithAccess[key];
                    }
                }
            } else { // Case for when project is not owned by any organizations
                return usersWithAccess; // Always have self
            }

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
        });

        // Setting authorization (To set the dropdowns/buttons visibility)
        // If owner is a single user and matches current user
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

            Promise.all([
                multiselectFormat(allUsers.sort(sortObjectArrayByField('_id'))),
                multiselectFormat(allOrganizations.sort(sortObjectArrayByField('_id')))
            ]).then(([formattedUsers, formattedOrganizations]) => {
                self.setState({
                    users: formattedUsers,
                    organizations: formattedOrganizations
                });
            });
        });
    }

    orderEntries() {
        this.setState({
            collaborators: this.state.numTimesClicked % 2 === 0 ? // Switch ordering every click
                this.state.collaborators.sort(sortObjectArrayByField('name')).reverse() :
                this.state.collaborators.sort(sortObjectArrayByField('name')),
            numTimesClicked: this.state.numTimesClicked + 1
        });
    }

    handleAuthorizationChange(event) {
        // have to copy whole object and reset the state
        let newButtonGroupState,
            lowerCaseInnerHTML = event.target.innerHTML.toLowerCase();

        if (event.target.id.indexOf('u') === -1) { // The ids of the buttons with user rights have u in them
            newButtonGroupState = this.state.authorizeOrganizationsButtonGroup;
            newButtonGroupState[lowerCaseInnerHTML] = !this.state.authorizeOrganizationsButtonGroup[lowerCaseInnerHTML];

            this.setState({
                authorizeOrganizationsButtonGroup: newButtonGroupState
            });
        } else {

            newButtonGroupState = this.state.authorizeUsersButtonGroup;
            newButtonGroupState[lowerCaseInnerHTML] = !this.state.authorizeUsersButtonGroup[lowerCaseInnerHTML];

            this.setState({
                authorizeUsersButtonGroup: newButtonGroupState
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
        if (/user/.test(targetId)) {
            usersOrOrganizations = this.state.valuesInUsersMultiselect;
            this.state.authorizeUsersButtonGroup.read ? projectRights += 'r' : null; // eslint-disable-line no-unused-expressions, max-len
            this.state.authorizeUsersButtonGroup.write ? projectRights += 'w' : null; // eslint-disable-line no-unused-expressions, max-len
            this.state.authorizeUsersButtonGroup.delete ? projectRights += 'd' : null; // eslint-disable-line no-unused-expressions, max-len
        } else if (/organization/.test(targetId)) {
            usersOrOrganizations = this.state.valuesInOrganizationsMultiselect;
            this.state.authorizeOrganizationsButtonGroup.read ? projectRights += 'r' : null; // eslint-disable-line no-unused-expressions, max-len
            this.state.authorizeOrganizationsButtonGroup.write ? projectRights += 'w' : null; // eslint-disable-line no-unused-expressions, max-len
            this.state.authorizeOrganizationsButtonGroup.delete ? projectRights += 'd' : null; // eslint-disable-line no-unused-expressions, max-len
        }

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

    render() {

        let categories = [
            {id: 1, name: 'UserID:'},
            {id: 2, name: 'Rights (RWD)'}
        ];

        let usersNoRightsSelected = true,
            organizationsNoRightsSelected = true;

        for (let accessType in this.state.authorizeUsersButtonGroup) {
            if (this.state.authorizeUsersButtonGroup.hasOwnProperty(accessType) &&
                this.state.authorizeUsersButtonGroup[accessType]) {
                usersNoRightsSelected = false;
            }
        }
        for (let accessType in this.state.authorizeOrganizationsButtonGroup) {
            if (this.state.authorizeOrganizationsButtonGroup.hasOwnProperty(accessType) &&
                this.state.authorizeOrganizationsButtonGroup[accessType]) {
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

                {/* Loaded only if user is an owner/(admin of org who is the owner))*/}
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
                                        {organizationsNoRightsSelected ? 'Remove organizations rights' :
                                            'Authorize organizations'}
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
