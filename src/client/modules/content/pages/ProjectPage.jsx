/* global window, $ */
// Libraries
import BarChart from '../../../../../node_modules/react-chartjs/lib/bar';
import React from '../../../../../node_modules/react/lib/React';
import {withRouter} from 'react-router';
// Self defined
import AuthorizationWidget from './authorizationwidget/AuthorizationWidget.jsx';
import DataTable from './datatable/DataTable.jsx';
import ProjectDataTableEntry from './datatable/ProjectDataTableEntry.jsx';
import {convertHexToRGBA, getRandomColorHex, shadeColor,
    isEmpty, multiselectFormat, sortObjectArrayByField} from '../../../utils/utils.js';

class ProjectPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authorizedToAdd: false,
            authorizeButtonGroup: {read: false, write: false, delete: false},
            barChartData: {
                labels: [],
                datasets: []
            },
            collaborators: [],
            displayTable: 1, // 1 indicates displaying the user table, 2 indicates the organizations
            formattedUsers: [],
            formattedOrganizations: [],
            numTimesClicked: 0,
            valuesInUsersMultiselect: '',
            valuesInOrganizationsMultiselect: ''
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

        // reset through setState first because user may have just clicked it (needs immediate feedback)
        this.setState({
            authorizeButtonGroup: {read: false, write: false, delete: false},
            valuesInUsersMultiselect: '',
            valuesInOrganizationsMultiselect: ''
        });

        let didUserRemoveSelfWhenOnlyCollaborator = false;
        let projectId = this.props.params.ownerId + '+' + this.props.params.projectName;

        Promise.all([
            this.props.restClient.users.getUsersWithAccessToProject(projectId),
            this.props.restClient.organizations.getUsersInOrganizationsWithAccessToProject(projectId),
            this.props.restClient.organizations.getOrganizationsWithAccessToProject(projectId)
        ]).then(([usersWithAccess, usersInOrganizationsWithAccess, organizationsWithAccess]) => {

            // Union of rights if in organization
            if (!isEmpty(usersInOrganizationsWithAccess)) {
                for (let key in usersInOrganizationsWithAccess) {
                    if (usersWithAccess[key]) {
                        usersWithAccess[key].read = usersWithAccess[key].read || usersInOrganizationsWithAccess[key].read; // eslint-disable-line max-len
                        usersWithAccess[key].write = usersWithAccess[key].write || usersInOrganizationsWithAccess[key].write; // eslint-disable-line max-len
                        usersWithAccess[key].delete = usersWithAccess[key].delete || usersInOrganizationsWithAccess[key].delete; // eslint-disable-line max-len
                    } else {// If it doesn't exist then simply assign
                        usersWithAccess[key] = JSON.parse(JSON.stringify(usersInOrganizationsWithAccess[key]));
                    }
                }
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
                // First assign number of commits to each person in the dictionary
                this.props.restClient.projects.getLatestCommits(this.props.params.ownerId, this.props.params.projectName) // eslint-disable-line max-len
                    .then(arrayOfCommits => {

                        arrayOfCommits.forEach(oneCommit => {
                            // temporary to correctly display orgs
                            if (!usersWithAccess[oneCommit.updater[0]]) {
                                return; // TODO: again, fix for the organizations
                            }

                            if (usersWithAccess[oneCommit.updater[0]].numCommits) {
                                usersWithAccess[oneCommit.updater[0]].numCommits += 1;
                            } else {
                                usersWithAccess[oneCommit.updater[0]].numCommits = 1;
                            }
                        });
                        // Convert hashmap into array for data table entries:
                        let collaboratorsArrayForm = [];
                        for (let keyName in usersWithAccess) {
                            collaboratorsArrayForm.push({
                                name: keyName,
                                read: usersWithAccess[keyName].read,
                                write: usersWithAccess[keyName].write,
                                delete: usersWithAccess[keyName].delete,
                                inOrg: usersWithAccess[keyName].inOrg,
                                numCommits: usersWithAccess[keyName].numCommits
                            });
                        }

                        // Users with access here is still the hashmap of username to read/write/delete/inOrg
                        // Now going to add a commit count to each person in the map
                        this.setState({
                            collaborators: collaboratorsArrayForm.sort(sortObjectArrayByField('name'))
                        });

                        // Formatting bar chart (has to be sequential after sorting collaborators because it needs that info)
                        let randomColor = getRandomColorHex();

                        this.setState({
                            barChartData: {
                                labels: collaboratorsArrayForm.map(oneUserObject => {
                                    return oneUserObject.name;
                                }),
                                datasets: [
                                    {
                                        fillColor: convertHexToRGBA(randomColor, 20),
                                        strokeColor: convertHexToRGBA(randomColor, 100),
                                        pointColor: convertHexToRGBA(randomColor, 100),
                                        pointStrokeColor: shadeColor(randomColor, 50),
                                        pointHighlightFill: shadeColor(randomColor, 50),
                                        pointHighlightStroke: convertHexToRGBA(randomColor, 100),
                                        data: collaboratorsArrayForm.map(oneUserObject => {
                                            return oneUserObject.numCommits;
                                        })
                                    }
                                ]
                            }}
                        );
                    });

            }
        });

        // Setting authorization (To set the dropdowns/buttons visibility)
        // If owner is a single user and matches current user
        if (!didUserRemoveSelfWhenOnlyCollaborator) {
            this.props.restClient.getAuthorizationToAdd(this.props.params.ownerId)
                .then(authorization => {
                    this.setState({
                        authorizedToAdd: authorization
                    });
                });

            // User doesn't click dropdown immediately, so can load these after
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
        }

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
        let holdOldDisplayNum = this.state.displayTable;
        let newDisplayNum = event.target.innerHTML === 'Users' ? 1 : 2;

        this.setState({
            displayTable: newDisplayNum
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

        let dualTable = {show: true, options: ['Users', 'Organizations']};

        let submitButtons = [
            {
                submitButtonHandler: this.handleSubmitAuthorization,
                submitButtonText: this.state.displayTable === 1 ?
                    noRightsSelected ? 'Remove users rights' : 'Authorize users' :
                    noRightsSelected ? 'Remove organizations rights' : 'Authorize organizations',
                submitButtonState: noRightsSelected
            }
        ];

        return (

            <section className="content">
                <h3> {this.props.params.projectName} by {this.props.params.ownerId} </h3>

                <div className="row">
                    <div className="col-md-6">

                        <DataTable ownerId={this.props.params.ownerId}
                                   projectName={this.props.params.projectName}
                                   restClient={this.props.restClient}
                                   categories={this.state.displayTable === 1 ? categories.users :
                                                                               categories.organizations}
                                   tableName="Collaborators"
                                   entries={this.state.collaborators}
                                   orderEntries={this.orderEntries}
                                   numTimesClicked={this.state.numTimesClicked}
                                   display={this.state.displayTable}
                                   handleTableSwitch={this.handleTableSwitch}
                                   sortable={true}
                                   dualTable={dualTable}>
                            <ProjectDataTableEntry/>
                        </DataTable>

                        {/* Loaded only if user is an owner/(admin of org who is the owner))*/}
                        {this.state.authorizedToAdd ?
                        <div className="row">
                            <div className="col-md-12">
                                <div className="box box-primary">
                                    <div className="box-header with-border">

                                            <AuthorizationWidget selectableButtons={
                                                        {read: this.state.authorizeButtonGroup.read,
                                                         write: this.state.authorizeButtonGroup.write,
                                                         delete: this.state.authorizeButtonGroup.delete}}
                                                                 selectableButtonsChange={this.handleAuthorizationChange}
                                                                 label={this.state.displayTable === 1 ? "Authorize or Deauthorize Users" : "Authorize or Deauthorize Organizations"} // eslint-disable-line max-len
                                                                 placeholder={this.state.displayTable === 1 ? "Select one or more users (type to search)" : "Select one or more organizations (type to search)"} // eslint-disable-line max-len
                                                                 options={this.state.displayTable === 1 ? this.state.formattedUsers : this.state.formattedOrganizations} // eslint-disable-line max-len
                                                                 handleMultiselectChange={this.handleMultiselectChange}
                                                                 submitButtons={submitButtons}
                                                                 valuesInMultiselect={this.state.displayTable === 1 ? this.state.valuesInUsersMultiselect : this.state.valuesInOrganizationsMultiselect} // eslint-disable-line max-len
                                            />
                                    </div>
                                </div>
                            </div>
                        </div> : null}

                    </div>

                    <div className="col-md-6">
                        <div className="box box-info">
                            <div className="box-header with-border">
                                <h3 className="box-title">Commits by Collaborator</h3>

                                <div className="box-tools pull-right">
                                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                        <i className="fa fa-minus"/>
                                    </button>
                                </div>
                            </div>
                            <div className="box-body">
                                <BarChart data={this.state.barChartData}
                                          options={{}}
                                          width={$(window).width() / 2.34}
                                          height={$(window).height() / 1.8}
                                          redraw/>
                            </div>
                        </div>
                    </div>

                </div>

            </section>
        );
    }

}

// Needs withRouter for component's context (router is contained in there)
export default withRouter(ProjectPage);
