/* global */

/**
 * Container widget for the organizations table widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
// Self-defined
import CustomModal from '../CustomModal';
import DataTable from '../../../../containers/content/widgets/data_tables/DataTable';
import LoginField from '../LoginField';
import OrganizationsDataTableEntry from
    '../../../../containers/content/widgets/data_tables/table_entries/OrganizationsDataTableEntry';
import { fetchOrganizationsIfNeeded } from '../../../../actions/organizations';
import { fetchUserIfNeeded } from '../../../../actions/user';
// Style
import { OrganizationsTable as STYLE } from '../../../../../client/style';

export default class OrganizationsTable extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchOrganizationsIfNeeded());
        dispatch(fetchUserIfNeeded());
    }

    render() {
        const { organizations, adminOrganizations, user } = this.props;

        const categories = [
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
                    {user.siteAdmin || user.canCreate ?
                        <Button className="pull-right"
                            bsStyle="primary"
                            bsSize="small"
                            onClick={this.props.openCreateOrganization}>
                            Add +
                        </Button> : null}
                </div>

                {/* Body */}
                <DataTable categories={categories}
                           content="Organizations"
                           entries={organizations}
                           orderEntries={this.handleOrderEntries}
                           reducerTableName="organizations"
                           sortable={true}>
                    <OrganizationsDataTableEntry adminOrganizations={adminOrganizations}/>
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
                    <LoginField autoFocus={true}
                                hint="Organization Name"
                                iconClass="fa fa-institution"
                                name="organization"
                                onBlur={this.props.checkOrganizationName}
                                onEnter={this.props.createOrganization}
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
    organizations: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
};
