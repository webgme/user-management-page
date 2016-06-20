/**
 * Individual project page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

/* global window, $ */

// Libraries
import React from 'react/lib/React';
import withRouter from 'react-router/lib/withRouter';
// Self defined
import AuthorizationWidget from '../widgets/authorizationwidget/AuthorizationWidget';
import CollaboratorsCommitsBarChart from '../widgets/charts/CollaboratorsCommitsBarChart';
import ProjectCollaboratorTable from '../widgets/datatable/ProjectCollaboratorTable';

class ProjectPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authorizeButtonGroup: {read: false, write: false, delete: false},
            refreshTable: false,
            valuesInMultiselect: ''
        };
        // Event Handlers
        this.handleAuthorizationChange = this.handleAuthorizationChange.bind(this);
        this.handleMultiselectChange = this.handleMultiselectChange.bind(this);
        this.handleSubmitAuthorization = this.handleSubmitAuthorization.bind(this);
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
        this.setState({
            valuesInMultiselect: value
        });
    }

    handleSubmitAuthorization() {

        // Check if the user chose to authorize users or organizations
        let projectRights = '';
        projectRights += this.state.authorizeButtonGroup.read ? 'r' : '';
        projectRights += this.state.authorizeButtonGroup.write ? 'w' : '';
        projectRights += this.state.authorizeButtonGroup.delete ? 'd' : '';

        let promiseArrayToGrant = [];

        if (this.state.valuesInMultiselect !== '') {
            this.state.valuesInMultiselect.split(',').forEach(userOrOrgName => {
                promiseArrayToGrant.push(
                    this.props.restClient.projects.grantRightsToProject(this.props.params.ownerId,
                                                                        this.props.params.projectName,
                                                                        userOrOrgName,
                                                                        projectRights));
            });
        }

        Promise.all(promiseArrayToGrant)
            .then(() => {
                this.setState({
                    refreshTable: !this.state.refreshTable
                });
            })
            .catch(() => {
                console.log('Authorization denied.'); // eslint-disable-line no-console
            });

        // Reset fields after submitting
        this.setState({
            authorizeButtonGroup: {read: false, write: false, delete: false},
            valuesInMultiselect: ''
        });
    }

    render() {

        let authorizationWidgetData = {
            noRightsSelected: !(this.state.authorizeButtonGroup.read ||
                                this.state.authorizeButtonGroup.write ||
                                this.state.authorizeButtonGroup.delete)
        };
        authorizationWidgetData.submitButtons = [
            {
                submitButtonHandler: this.handleAuthorizationChange,
                submitButtonText: 'None',
                submitButtonState: authorizationWidgetData.noRightsSelected ? 'primary' : null
            },
            {
                submitButtonHandler: this.handleAuthorizationChange,
                submitButtonText: 'Read',
                submitButtonState: this.state.authorizeButtonGroup.read ? 'primary' : null
            },
            {
                submitButtonHandler: this.handleAuthorizationChange,
                submitButtonText: 'Write',
                submitButtonState: this.state.authorizeButtonGroup.write ? 'primary' : null
            },
            {
                submitButtonHandler: this.handleAuthorizationChange,
                submitButtonText: 'Delete',
                submitButtonState: this.state.authorizeButtonGroup.delete ? 'primary' : null
            },
            {
                submitButtonHandler: this.handleSubmitAuthorization,
                submitButtonText: 'Submit',
                submitButtonState: authorizationWidgetData.noRightsSelected ? 'danger' : 'success'
            }
        ];

        return (

            <section className="content">
                <h2 style={{fontFamily: "-webkit-body"}}>
                    <i className="fa fa-cube"/>{` ${this.props.params.projectName} by ${this.props.params.ownerId}`}
                </h2>

                <div className="row">
                    <div className="col-md-6">

                        <ProjectCollaboratorTable ownerId={this.props.params.ownerId}
                                                  projectName={this.props.params.projectName}
                                                  refreshTable={this.state.refreshTable}
                                                  restClient={this.props.restClient}/>

                        <AuthorizationWidget boxSize="12"
                                             disableLast={true}
                                             handleMultiselectChange={this.handleMultiselectChange}
                                             label={"Authorize Users or Organizations"}
                                             noRightsSelected={authorizationWidgetData.noRightsSelected}
                                             ownerId={this.props.params.ownerId}
                                             restClient={this.props.restClient}
                                             selectableButtonsChange={this.handleAuthorizationChange}
                                             submitButtons={authorizationWidgetData.submitButtons}
                                             valuesInMultiselect={this.state.valuesInMultiselect}/>

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
