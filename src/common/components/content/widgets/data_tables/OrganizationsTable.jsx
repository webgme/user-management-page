/* global $ */

/**
 * Container widget for the organizations table widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import Button from 'react-bootstrap/lib/Button';
import React from 'react';
// Self-defined
import CustomModal from '../CustomModal';
import DataTable from './DataTable';
import LoginField from '../LoginField';
import OrganizationsDataTableEntry from './table_entries/OrganizationsDataTableEntry';
import {sortObjectArrayByField} from '../../../../../client/utils/utils';

const STYLE = {
    createOrganizationModal: {
        paddingTop: "50%",
        marginTop: "50%"
    },
    modalDialogTextField: {
        marginLeft: "15px",
        paddingRight: "15px"
    }
};

export default class OrganizationsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            organizations: [],
            sortedForward: true
        };
        // Data retrieval
        this.retrieveOrganizations = this.retrieveOrganizations.bind(this);
        // Event handlers
        this.onOrderEntries = this.onOrderEntries.bind(this);
    }

    componentDidMount() {
        this.retrieveOrganizations();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.refreshTable !== this.props.refreshTable) {
            this.retrieveOrganizations();
        }
    }

    retrieveOrganizations() {
        let currentUserId;

        // TODO: change this workaround after a solidified position is made on admins in orgs
        Promise.all([
            this.props.restClient.user.getCurrentUser(),
            this.props.restClient.organizations.getAllOrganizations()
        ])
            .then(([currentUser, allOrganizations]) => {
                currentUserId = currentUser._id;
                let organizations = currentUser.orgs.map(organizationName => {
                    return {name: organizationName};
                });

                // Also adds the organizations user is an admin of (to even view the project in the list)
                allOrganizations.forEach(oneOrganization => {
                    let isAdmin = oneOrganization.admins.indexOf(currentUserId) !== -1,
                        inListAlready = organizations.indexOf(oneOrganization._id) === -1;

                    if (isAdmin && !inListAlready) {
                        organizations.push({
                            name: oneOrganization._id
                        });
                    }
                });

                this.setState({
                    organizations: organizations.sort(sortObjectArrayByField('name'))
                });

            });
    }

    onOrderEntries() {
        this.setState({
            organizations: this.state.sortedForward ?
                this.state.organizations.sort(sortObjectArrayByField('name')).reverse() :
                this.state.organizations.sort(sortObjectArrayByField('name')),
            sortedForward: !this.state.sortedForward
        });
    }

    render() {

        let categories = [
            {id: 1, name: 'Organization Name'}
        ];

        return (
            <div>

                {/* Header */}
                <div className="box-header"
                     style={{paddingBottom: "0px"}}>
                    <h3 className="box-title" style={{fontSize: 28}}>
                        <i className="fa fa-institution"/> {` Organizations`}
                    </h3>

                    <div style={{float: "right"}}>
                        <Button bsStyle="primary" onClick={this.props.openCreateOrganization}>
                            Create an organization
                        </Button>
                    </div>

                    <br/><br/>

                </div>

                {/* Body */}
                <DataTable basePath={this.props.basePath}
                           categories={categories}
                           content="Organizations"
                           entries={this.state.organizations}
                           iconClass="fa fa-institution"
                           orderEntries={this.onOrderEntries}
                           restClient={this.restClient}
                           sortable={true}
                           sortedForward={this.state.sortedForward}
                           tableName="Organizations">
                    <OrganizationsDataTableEntry/>
                </DataTable>

                {/* Create organization modal window */}
                <CustomModal cancelButtonMessage="Cancel"
                             cancelButtonStyle="default"
                             closeHandler={this.props.closeCreateOrganization}
                             confirmButtonMessage="Create"
                             confirmButtonStyle="primary"
                             confirmHandler={this.props.createOrganization}
                             modalMessage="Please enter the name of the organization you wish to create"
                             showModal={this.props.showCreateOrganizationModal}
                             style={STYLE.createOrganizationModal}
                             title="Create an organization">
                    {/* Organization name */}
                    <LoginField hint="Organization Name"
                                iconClass="fa fa-institution"
                                name="organization"
                                onBlur={this.props.checkOrganizationName}
                                onInputChange={this.props.onCreateOrganizationNameChange}
                                indentStyle={STYLE.modalDialogTextField}
                                invalidMessage={this.props.createOrganizationInvalidMessage}
                                valid={this.props.validOrganizationName}
                                value={this.props.newOrganizationName}
                                warning={!this.props.validOrganizationName}/>
                </CustomModal>

            </div>
        );
    }
}
