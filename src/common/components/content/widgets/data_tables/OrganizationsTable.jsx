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
import DataTable from './DataTable';
import LoginField from '../LoginField';
import OrganizationsDataTableEntry from
    '../../../../containers/content/widgets/data_tables/table_entries/OrganizationsDataTableEntry';
import { fetchOrganizationsIfNeeded } from '../../../../actions/organizations';
import { sortBy } from '../../../../actions/tables';
import { fetchUserIfNeeded } from '../../../../actions/user';
// Style
import { OrganizationsTable as STYLE } from '../../../../../client/style';

const ORGANIZATION_FIELDS = {
    "Organization Name": "name"
};

export default class OrganizationsTable extends Component {

    constructor(props) {
        super(props);
        // Event handlers
        this.handleOrderEntries = this.handleOrderEntries.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchOrganizationsIfNeeded());
        dispatch(fetchUserIfNeeded());
    }

    handleOrderEntries(event) {
        const { dispatch } = this.props;
        const newSortCategory = ORGANIZATION_FIELDS[event.target.value];

        dispatch(sortBy('organizations', newSortCategory));
    }

    render() {

        const { organizations, sortedForward } = this.props;

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

                    <div style={{float: "right"}}>
                        <Button bsStyle="primary" onClick={this.props.openCreateOrganization}>
                            New +
                        </Button>
                    </div>

                    <br/><br/>

                </div>

                {/* Body */}
                <DataTable categories={categories}
                           content="Organizations"
                           entries={organizations}
                           orderEntries={this.handleOrderEntries}
                           sortable={true}
                           sortedForward={sortedForward}>
                    <OrganizationsDataTableEntry />
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
    organizations: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
};
