/**
 * Individual project page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

/* global window, $ */
// Libraries
import React from 'react/lib/React';
import withRouter from 'react-router/lib/withRouter';
// Self defined
import AuthorizationWidget from '../widgets/authorizationwidget/AuthorizationWidget.jsx';
import CollaboratorsCommitsBarChart from '../widgets/CollaboratorsCommitsBarChart.jsx';
import DataTable from '../widgets/datatable/DataTable.jsx';
import ProjectDataTableEntry from '../widgets/datatable/ProjectDataTableEntry.jsx';
import {isEmpty, multiselectFormat, sortObjectArrayByField} from '../../../utils/utils.js';

class ProjectPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authorizedToAdd: false,
            authorizeButtonGroup: {read: false, write: false, delete: false},
            collaborators: [],
            displayTable: 1, // 1 indicates displaying the users table, 2 indicates the organizations table
            formattedUsers: [],
            formattedOrganizations: [],
            numTimesClicked: 0,
            valuesInUsersMultiselect: '',
            valuesInOrganizationsMultiselect: ''
        };
        // Data retrieval
        this.retrieveAuthorizationToAdd = this.retrieveAuthorizationToAdd.bind(this);
        this.retrieveCollaborators = this.retrieveCollaborators.bind(this);
        this.retrieveMultiselect = this.retrieveMultiselect.bind(this);
        // Event Handlers
        this.handleAuthorizationChange = this.handleAuthorizationChange.bind(this);
        this.handleMultiselectChange = this.handleMultiselectChange.bind(this);
        this.handleOrderEntries = this.handleOrderEntries.bind(this);
        this.handleSubmitAuthorization = this.handleSubmitAuthorization.bind(this);
        this.handleTableSwitch = this.handleTableSwitch.bind(this);
    }

    componentDidMount() {
        this.retrieveAuthorizationToAdd();
        this.retrieveCollaborators();
        this.retrieveMultiselect();
    }

    retrieveAuthorizationToAdd() {
        this.props.restClient.getAuthorizationToAdd(this.props.params.ownerId)
            .then(authorization => {
                this.setState({
                    authorizedToAdd: authorization
                });
            });
    }

    retrieveCollaborators() {

        let didUserRemoveSelfWhenOnlyCollaborator = false;
        let projectId = `${this.props.params.ownerId}+${this.props.params.projectName}`;

        Promise.all([
            this.props.restClient.users.getUsersWithAccessToProject(projectId),
            this.props.restClient.organizations.getUsersInOrganizationsWithAccessToProject(projectId),
            this.props.restClient.organizations.getOrganizationsWithAccessToProject(projectId)
        ]).then(([usersWithAccess, usersInOrganizationsWithAccess, organizationsWithAccess]) => {

            // Union of rights if in organization
            if (!isEmpty(usersInOrganizationsWithAccess)) {
                Object.keys(usersInOrganizationsWithAccess).forEach(oneUser => {
                    if (usersWithAccess[oneUser]) {
                        usersWithAccess[oneUser].read = usersWithAccess[oneUser].read || usersInOrganizationsWithAccess[oneUser].read; // eslint-disable-line max-len
                        usersWithAccess[oneUser].write = usersWithAccess[oneUser].write || usersInOrganizationsWithAccess[oneUser].write; // eslint-disable-line max-len
                        usersWithAccess[oneUser].delete = usersWithAccess[oneUser].delete || usersInOrganizationsWithAccess[oneUser].delete; // eslint-disable-line max-len
                    } else {
                        usersWithAccess[oneUser] = JSON.parse(JSON.stringify(usersInOrganizationsWithAccess[oneUser]));
                    }
                });
            } else if (isEmpty(usersWithAccess)) { // Case for when project is not owned by any organizations
                didUserRemoveSelfWhenOnlyCollaborator = true;
                this.props.router.replace(`${this.props.routes[0].basePath}projects`);
            } else {
                // Do nothing because then usersWithAccess is just self and does not need to be modified
            }

            // Check if entries just needs to be the organizations
            if (this.state.displayTable === 2) {
                // One to be converted to entries (using name usersWithAccess so don't have to reallocate)
                usersWithAccess = organizationsWithAccess;
            }

            if (!didUserRemoveSelfWhenOnlyCollaborator) {
                let collaboratorsArrayForm = [];
                Object.keys(usersWithAccess).forEach(key => {
                    collaboratorsArrayForm.push({
                        name: key,
                        read: usersWithAccess[key].read,
                        write: usersWithAccess[key].write,
                        delete: usersWithAccess[key].delete,
                        inOrg: usersWithAccess[key].inOrg
                    });
                });

                this.setState({
                    collaborators: collaboratorsArrayForm.sort(sortObjectArrayByField('name'))
                });
            }

        });
    }

    retrieveMultiselect() {
        Promise.all([
            this.props.restClient.users.getAllUsers(),
            this.props.restClient.organizations.getAllOrganizations()
        ]).then(([allUsers, allOrganizations]) => {
            this.setState({
                formattedUsers: multiselectFormat(allUsers.sort(sortObjectArrayByField('_id'))),
                formattedOrganizations: multiselectFormat(allOrganizations.sort(sortObjectArrayByField('_id')))
            });
        });
    }

    handleAuthorizationChange(event) {

        let buttonClicked = event.target.innerHTML.toLowerCase(),
            holdButtonGroup = this.state.authorizeButtonGroup;

        // Handling selection
        if (this.state.authorizeButtonGroup[buttonClicked] === false) {
            for (let button in holdButtonGroup) {
                if (button === buttonClicked) {
                    holdButtonGroup[buttonClicked] = true;
                    break;
                } else {
                    holdButtonGroup[button] = true;
                }
            }
        // Handling deselection
        } else if (this.state.authorizeButtonGroup[buttonClicked] === true) {
            let passedCurrentButton = false;
            for (let button in holdButtonGroup) {
                if (button === buttonClicked) {
                    holdButtonGroup[buttonClicked] = false;
                    passedCurrentButton = true;
                } else if (passedCurrentButton) {
                    holdButtonGroup[button] = false;
                }
            }
        }

        this.setState({
            authorizeButtonGroup: holdButtonGroup
        });
    }

    handleMultiselectChange(value) {
        if (this.state.displayTable === 1) {
            this.setState({
                valuesInUsersMultiselect: value
            });
        } else if (this.state.displayTable === 2) {
            this.setState({
                valuesInOrganizationsMultiselect: value
            });
        }
    }

    handleOrderEntries() {
        this.setState({
            collaborators: this.state.numTimesClicked % 2 === 0 ? // Switch ordering every click
                this.state.collaborators.sort(sortObjectArrayByField('name')).reverse() :
                this.state.collaborators.sort(sortObjectArrayByField('name')),
            numTimesClicked: this.state.numTimesClicked + 1
        });
    }

    handleSubmitAuthorization() {
        let usersOrOrganizations = this.state.displayTable === 1 ? this.state.valuesInUsersMultiselect :
                                                              this.state.valuesInOrganizationsMultiselect;

        // Check if the user chose to authorize users or organizations
        let projectRights = '';
        projectRights += this.state.authorizeButtonGroup.read ? 'r' : '';
        projectRights += this.state.authorizeButtonGroup.write ? 'w' : '';
        projectRights += this.state.authorizeButtonGroup.delete ? 'd' : '';

        let promiseArrayToGrant = [];

        if (usersOrOrganizations !== '') {
            usersOrOrganizations.split(',').forEach(userOrOrgName => {
                if (projectRights === '') { // have to remove rights if none are selected
                    promiseArrayToGrant.push(
                        this.props.restClient.projects.removeRightsToProject(this.props.params.ownerId,
                                                                             this.props.params.projectName,
                                                                             userOrOrgName));
                } else {
                    promiseArrayToGrant.push(
                        this.props.restClient.projects.grantRightsToProject(this.props.params.ownerId,
                                                                            this.props.params.projectName,
                                                                            userOrOrgName,
                                                                            projectRights));
                }
            });
        }

        Promise.all(promiseArrayToGrant)
            .then(() => {
                // Have to update the list after authorization rights change
                this.retrieveCollaborators();
            })
            .catch(() => {
                console.log('Authorization denied.'); // eslint-disable-line no-console
            });

        // Reset fields after submitting
        this.setState({
            authorizeButtonGroup: {read: false, write: false, delete: false},
            valuesInUsersMultiselect: '',
            valuesInOrganizationsMultiselect: ''
        });

    }

    handleTableSwitch(event) {
        let holdOldDisplayNum = this.state.displayTable;
        let newDisplayNum = event.target.innerHTML === 'Users' ? 1 : 2;

        this.setState({
            displayTable: newDisplayNum
        });

        // If the table changed, then have to retrieve data again
        if (holdOldDisplayNum !== newDisplayNum) {
            this.retrieveCollaborators();
        }
    }

    render() {

        let dataTableData = {
            categories: {
                users: [
                    {id: 1, name: 'UserID:'},
                    {id: 2, name: 'Rights (RWD)'}
                ],
                organizations: [
                    {id: 1, name: 'OrganizationID:'},
                    {id: 2, name: 'Rights(RWD)'}
                ]
            },
            dualTable: {
                show: true,
                options: ['Users', 'Organizations']
            }
        };
        let authorizationWidgetData = {

            noRightsSelected: !(this.state.authorizeButtonGroup.read ||
                                this.state.authorizeButtonGroup.write ||
                                this.state.authorizeButtonGroup.delete)
        };
        authorizationWidgetData.submitButtons = [
            {
                submitButtonHandler: this.handleSubmitAuthorization,
                submitButtonText: this.state.displayTable === 1 ? // eslint-disable-line no-nested-ternary
                    authorizationWidgetData.noRightsSelected ? 'Remove users rights' : 'Authorize users' :
                    authorizationWidgetData.noRightsSelected ? 'Remove organizations rights' : 'Authorize organizations', // eslint-disable-line max-len
                submitButtonState: authorizationWidgetData.noRightsSelected
            }
        ];

        return (

            <section className="content">
                <h2> {this.props.params.projectName} by {this.props.params.ownerId} </h2>

                <div className="row">
                    <div className="col-md-6">

                        <DataTable categories={this.state.displayTable === 1 ? dataTableData.categories.users :
                                                                               dataTableData.categories.organizations}
                                   display={this.state.displayTable}
                                   dualTable={dataTableData.dualTable}
                                   entries={this.state.collaborators}
                                   handleTableSwitch={this.handleTableSwitch}
                                   numTimesClicked={this.state.numTimesClicked}
                                   orderEntries={this.handleOrderEntries}
                                   ownerId={this.props.params.ownerId}
                                   projectName={this.props.params.projectName}
                                   restClient={this.props.restClient}
                                   sortable={true}
                                   tableName="Collaborators">
                            <ProjectDataTableEntry/>
                        </DataTable>

                        {/* Loaded only if user is an owner/(admin of org who is the owner))*/}
                        {this.state.authorizedToAdd ?
                            <AuthorizationWidget boxSize="12"
                                                 handleMultiselectChange={this.handleMultiselectChange}
                                                 label={this.state.displayTable === 1 ? "Authorize or Deauthorize Users" : "Authorize or Deauthorize Organizations"} // eslint-disable-line max-len
                                                 options={this.state.displayTable === 1 ? this.state.formattedUsers : this.state.formattedOrganizations} // eslint-disable-line max-len
                                                 placeholder={this.state.displayTable === 1 ? "Select one or more users (type to search)" : "Select one or more organizations (type to search)"} // eslint-disable-line max-len
                                                 selectableButtons={
                                                        {read: this.state.authorizeButtonGroup.read,
                                                         write: this.state.authorizeButtonGroup.write,
                                                         delete: this.state.authorizeButtonGroup.delete}}
                                                 selectableButtonsChange={this.handleAuthorizationChange}
                                                 submitButtons={authorizationWidgetData.submitButtons}
                                                 valuesInMultiselect={this.state.displayTable === 1 ? this.state.valuesInUsersMultiselect : this.state.valuesInOrganizationsMultiselect} // eslint-disable-line max-len
                            /> : null}

                    </div>

                    <CollaboratorsCommitsBarChart height={$(window).height() / 1.8}
                                                 options={{}}
                                                 ownerId={this.props.params.ownerId}
                                                 projectName={this.props.params.projectName}
                                                 restClient={this.props.restClient}
                                                 title="Commits By Collaborator"
                                                 width={$(window).width() / 2.36}/>

                </div>

            </section>
        );
    }

}

// Needs withRouter for component's context (router is contained in there)
export default withRouter(ProjectPage);
