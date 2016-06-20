/**
 * Individual organization page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';
import withRouter from 'react-router/lib/withRouter';
// Self defined
import AuthorizationWidget from '../widgets/authorizationwidget/AuthorizationWidget';
import DataTable from '../widgets/datatable/DataTable';
import OrganizationDataTableEntry from '../widgets/datatable/table_entries/OrganizationDataTableEntry';
import {isEmpty, multiselectFormat, sortObjectArrayByField} from '../../../utils/utils';

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
        // Data retrieval
        this.retrieveMembersAndAdmins = this.retrieveMembersAndAdmins.bind(this);
        this.retrieveMultiselect = this.retrieveMultiselect.bind(this);
        // Event handlers
        this.handleMultiselectChange = this.handleMultiselectChange.bind(this);
        this.handlerOrderEntries = this.handlerOrderEntries.bind(this);
        this.handleSubmitAuthorization = this.handleSubmitAuthorization.bind(this);
        this.handleTableSwitch = this.handleTableSwitch.bind(this);
    }

    componentDidMount() {
        this.retrieveMembersAndAdmins();
        this.retrieveMultiselect();
    }

    retrieveMembersAndAdmins() {
        this.props.restClient.organizations.getOrganization(this.props.params.organizationId)
            .then(organizationData => {

                // When user removed self...
                if (isEmpty(organizationData.users)) {
                    this.props.router.replace(`${this.props.routes[0].basePath}organizations`);
                } else {
                    this.setState({
                        members: organizationData.users
                            .map(oneUser => {
                                return {
                                    name: oneUser,
                                    admin: organizationData.admins.indexOf(oneUser) !== -1
                                };
                            })
                            .sort(sortObjectArrayByField('name')),
                        admins: organizationData.admins
                            .map(oneAdmin => {
                                return {
                                    name: oneAdmin
                                };
                            })
                            .sort(sortObjectArrayByField('name'))
                    });
                }
            });
    }

    retrieveMultiselect() {
        this.props.restClient.users.getAllUsers()
            .then(allUsers => {
                this.setState({
                    formattedMembers: multiselectFormat(allUsers.sort(sortObjectArrayByField('_id')))
                });
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

    handlerOrderEntries() {
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
                this.retrieveMembersAndAdmins();
            })
            .catch(() => {
                console.log('Authorization denied.'); // eslint-disable-line no-console
            });

        // Empty multiselect after submission
        this.setState({
            valuesInMembersMultiselect: '',
            valuesInAdminsMultiselect: ''
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
            this.retrieveMembersAndAdmins();
        }
    }

    render() {

        let dataTableData = {
            categories: {
                members: [
                    {id: 1, name: 'Member Name:'},
                    {id: 2, name: 'Admin:'}
                ],
                admins: [
                    {id: 1, name: 'Admin Name:'}
                ]
            },
            dualTable: {
                show: true,
                options: ['Members', 'Admins']
            }
        };
        let authorizationWidgetData = {
            submitButtons: [
                {
                    submitButtonHandler: this.handleSubmitAuthorization,
                    submitButtonText: this.state.display === 1 ? 'Add members' : 'Add admins',
                    submitButtonState: "success"
                },
                {
                    submitButtonHandler: this.handleSubmitAuthorization,
                    submitButtonText: this.state.display === 1 ? 'Remove members' : 'Remove admins',
                    submitButtonState: "danger"
                }
            ]
        };

        return (

            <section className="content">
                <h3> {this.props.params.organizationId} </h3>

                <DataTable categories={this.state.display === 1 ? dataTableData.categories.members : dataTableData.categories.admins} // eslint-disable-line max-len
                           display={this.state.display}
                           dualTable={dataTableData.dualTable}
                           entries={this.state.display === 1 ? this.state.members : this.state.admins}
                           handleTableSwitch={this.handleTableSwitch}
                           numTimesClicked={this.state.numTimesClicked}
                           orderEntries={this.handlerOrderEntries}
                           ownerId={this.props.params.ownerId}
                           projectName={this.props.params.projectName}
                           restClient={this.props.restClient}
                           sortable={true}
                           tableName={this.state.display === 1 ? "Members" : "Admins"}>
                    <OrganizationDataTableEntry/>
                </DataTable>

                <AuthorizationWidget boxSize="6"
                                     handleMultiselectChange={this.handleMultiselectChange}
                                     label={this.state.display === 1 ? "Add or Remove Members" : "Add or Remove Admins"} // eslint-disable-line max-len
                                     options={this.state.formattedMembers}
                                     ownerId={this.props.params.organizationId}
                                     restClient={this.props.restClient}
                                     selectableButtons={{}}
                                     selectableButtonsChange={this.handleAuthorizationChange}
                                     submitButtons={authorizationWidgetData.submitButtons}
                                     valuesInMultiselect={this.state.display === 1 ? this.state.valuesInMembersMultiselect : this.state.valuesInAdminsMultiselect}/>

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
