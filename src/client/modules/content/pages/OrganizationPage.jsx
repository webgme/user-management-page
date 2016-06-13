// Libraries
import React from '../../../../../node_modules/react/lib/React';
import {withRouter} from 'react-router';
// Self defined
import AuthorizationWidget from './authorizationwidget/AuthorizationWidget.jsx';
import DataTable from './datatable/DataTable.jsx';
import OrganizationDataTableEntry from './datatable/OrganizationDataTableEntry.jsx';
import {isEmpty, multiselectFormat, sortObjectArrayByField} from '../../../utils/utils.js';

class OrganizationPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            admins: [],
            authorizedToAdd: false,
            display: 1, // 1 indicates display members, 2 indicates display admins
            formattedMembers: [],
            members: [],
            numTimesClicked: 0,
            valuesInMembersMultiselect: '',
            valuesInAdminsMultiselect: ''
        };
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
        let didUserRemoveSelfWhenOnlyMember = false;
        // reset through setState first because user may have just clicked it (needs immediate feedback)
        if (!didUserRemoveSelfWhenOnlyMember) {
            this.setState({
                valuesInMembersMultiselect: '',
                valuesInAdminsMultiselect: ''
            });
        }

        // Actual retrieve
        this.props.restClient.organizations.getOrganization(this.props.params.organizationId)
            .then(organizationData => {

                // When user removed self...
                if (isEmpty(organizationData.users)) {
                    didUserRemoveSelfWhenOnlyMember = true;
                    this.props.router.replace(`${this.props.routes[0].basePath}organizations`);
                } else {
                    this.setState({
                        members: organizationData.users.map(oneUser => {
                            return {
                                name: oneUser,
                                admin: organizationData.admins.indexOf(oneUser) !== -1
                            };
                        }).sort(sortObjectArrayByField('name')),
                        admins: organizationData.admins.map(oneAdmin => {
                            return {
                                name: oneAdmin
                            };
                        }).sort(sortObjectArrayByField('name'))
                    });
                }
            });

        // Setting authorization (To set the dropdowns/buttons visibility)
        Promise.all([
            this.props.restClient.organizations.getOrganization(this.props.params.organizationId),
            this.props.restClient.user.getCurrentUser()
        ])
            .then(([organizationData, currentUser]) => {
                if (organizationData.admins.indexOf(currentUser._id) !== -1) {
                    if (!didUserRemoveSelfWhenOnlyMember) {
                        this.setState({
                            authorizedToAdd: true
                        });
                    }

                }
            });

        // User doesn't click dropdown immediately, so can load these after
        this.props.restClient.users.getAllUsers()
            .then(allUsers => {
                if (!didUserRemoveSelfWhenOnlyMember) {
                    this.setState({
                        formattedMembers: multiselectFormat(allUsers.sort(sortObjectArrayByField('_id')))
                    });
                }

            });

    }

    handleMultiselectChange(value) {
        if (this.state.display === 1) {
            this.setState({
                valuesInMembersMultiselect: value
            });
        } else if (this.state.display === 2) {
            this.setState({
                valuesInAdminsMultiselect: value
            });
        }
    }

    handleSubmitAuthorization(event) {

        let promiseArrayToGrant = [];

        // Only accounts for users right now
        if (this.state.display === 1 && this.state.valuesInMembersMultiselect !== '') {
            this.state.valuesInMembersMultiselect.split(',').forEach(username => {
                if (/Add/.test(event.target.innerHTML)) { // have to remove rights if none are selected
                    promiseArrayToGrant.push(
                        this.props.restClient.organizations.addUserToOrganization(this.props.params.organizationId,
                            username)
                    );
                } else if (/Remove/.test(event.target.innerHTML)) {
                    promiseArrayToGrant.push(
                        this.props.restClient.organizations.deleteUserFromOrganization(this.props.params.organizationId,
                            username)
                    );
                }
            });
        } else if (this.state.display === 2 && this.state.valuesInAdminsMultiselect !== '') {
            this.state.valuesInAdminsMultiselect.split(',').forEach(username => {
                if (/Add/.test(event.target.innerHTML)) { // have to remove rights if none are selected
                    promiseArrayToGrant.push(
                        this.props.restClient.organizations.makeAdminOfOrganization(this.props.params.organizationId,
                            username)
                    );
                } else if (/Remove/.test(event.target.innerHTML)) {
                    promiseArrayToGrant.push(
                        this.props.restClient.organizations.removeAdminOfOrganization(this.props.params.organizationId,
                            username)
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
        let holdOldDisplayNum = this.state.display;
        let newDisplayNum = event.target.innerHTML === 'Members' ? 1 : 2;

        this.setState({
            display: newDisplayNum
        });

        // If the table changed, then have to retrieve data again
        if (holdOldDisplayNum !== newDisplayNum) {
            this.retrieveData();
        }
    }

    orderEntries() {
        if (this.state.display === 1) {
            this.setState({
                members: this.state.numTimesClicked % 2 === 0 ? // Switch ordering every click
                    this.state.members.sort(sortObjectArrayByField('name')).reverse() :
                    this.state.members.sort(sortObjectArrayByField('name')),
                numTimesClicked: this.state.numTimesClicked + 1
            });
        } else if (this.state.display === 2) {
            this.setState({
                admins: this.state.numTimesClicked % 2 === 0 ? // Switch ordering every click
                    this.state.admins.sort(sortObjectArrayByField('name')).reverse() :
                    this.state.admins.sort(sortObjectArrayByField('name')),
                numTimesClicked: this.state.numTimesClicked + 1
            });
        }
    }

    render() {

        let categories = {
            members: [
                {id: 1, name: 'Member Name:'},
                {id: 2, name: 'Admin:'}
            ],
            admins: [
                {id: 1, name: 'Admin Name:'}
            ]
        };

        let dualTable = {show: true, options: ['Members', 'Admins']};

        let submitButtons = [
            {
                submitButtonHandler: this.handleSubmitAuthorization,
                submitButtonText: this.state.display === 1 ? 'Add members' : 'Add admins',
                submitButtonState: false
            },
            {
                submitButtonHandler: this.handleSubmitAuthorization,
                submitButtonText: this.state.display === 1 ? 'Remove members' : 'Remove admins',
                submitButtonState: true
            }
        ];

        return (

            <section className="content">
                <h3> {this.props.params.organizationId} </h3>

                <DataTable ownerId={this.props.params.ownerId}
                           projectName={this.props.params.projectName}
                           restClient={this.props.restClient}
                           categories={this.state.display === 1 ? categories.members : categories.admins}
                           tableName={this.state.display === 1 ? "Members" : "Admins"}
                           entries={this.state.display === 1 ? this.state.members : this.state.admins}
                           orderEntries={this.orderEntries}
                           numTimesClicked={this.state.numTimesClicked}
                           display={this.state.display}
                           handleTableSwitch={this.handleTableSwitch}
                           sortable={true}
                           dualTable={dualTable}>
                    <OrganizationDataTableEntry/>
                </DataTable>

                {/* Loaded only if user is an owner/(admin of org who is the owner))*/}
                {this.state.authorizedToAdd ?
                <div className="row">
                    <div className="col-md-8">
                        <div className="box box-primary">
                            <div className="box-header with-border">


                                    <AuthorizationWidget selectableButtons={{}}
                                                         selectableButtonsChange={this.handleAuthorizationChange}
                                                         label={this.state.display === 1 ? "Add or Remove Members" : "Add or Remove Admins"}
                                                         placeholder="Select one or more users (type to search)"
                                                         options={this.state.formattedMembers}
                                                         handleMultiselectChange={this.handleMultiselectChange}
                                                         valuesInMultiselect={this.state.display === 1 ? this.state.valuesInMembersMultiselect : this.state.valuesInAdminsMultiselect} // eslint-disable-line max-len
                                                         submitButtons={submitButtons}>
                                    </AuthorizationWidget>
                            </div>
                        </div>
                    </div>
                </div> : null}

            </section>
        );
    }

}

// Needs withRouter for component's context (router is contained in there)
export default withRouter(OrganizationPage);

OrganizationPage.propTypes = {
    params: React.PropTypes.shape({
        organizationId: React.PropTypes.string.isRequired
    })
};
