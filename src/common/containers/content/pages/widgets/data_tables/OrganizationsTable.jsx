/* global $ */

/**
 * Container widget for the organizations table widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
// Self-defined
import CustomModal from '../../../../../components/content/widgets/CustomModal';
import DataTable from '../../../../../components/content/widgets/data_tables/DataTable';
import LoginField from '../../../../../components/content/widgets/LoginField';
import OrganizationsDataTableEntry from '../../../../../components/content/widgets/data_tables/table_entries/OrganizationsDataTableEntry';
import {sortObjectArrayByField} from '../../../../../../client/utils/utils';
import { fetchUserIfNeeded } from '../../../../../actions/user';

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

class OrganizationsTable extends Component {

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
        const { dispatch } = this.props;
        dispatch(fetchUserIfNeeded());

        this.retrieveOrganizations();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.refreshTable !== this.props.refreshTable) {
            this.retrieveOrganizations();
        }
    }

    retrieveOrganizations() {
        const { user } = this.props;

        this.props.restClient.organizations.getAllOrganizations()
            .then((allOrganizations) => {
                let organizations = user.orgs ? user.orgs.map(organizationName => {
                    return {name: organizationName};
                }) : [];

                // Also adds the organizations user is an admin of (to even view the project in the list)
                allOrganizations.forEach(oneOrganization => {
                    let isAdmin = oneOrganization.admins.indexOf(user._id) !== -1,
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
                                warning={!this.props.validOrganizationName} />
                </CustomModal>

            </div>
        );
    }
}

OrganizationsTable.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    };
};

export default connect(mapStateToProps)(OrganizationsTable);
