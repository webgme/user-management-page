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
import OrganizationsDataTableEntry from './table_entries/OrganizationsDataTableEntry';
import { fetchOrganizationsIfNeeded } from '../../../../../actions/organizations';
import { sortBy } from '../../../../../actions/tables';
import { fetchUserIfNeeded } from '../../../../../actions/user';
import { sortObjectArrayByField } from '../../../../../../client/utils/utils';
// Style
import { OrganizationsTable as STYLE } from '../../../../../../client/style';

const ORGANIZATION_FIELDS = {
    "Organization Name": "name"
};

class OrganizationsTable extends Component {

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
                            Create an organization
                        </Button>
                    </div>

                    <br/><br/>

                </div>

                {/* Body */}
                <DataTable categories={categories}
                           content="Organizations"
                           entries={organizations}
                           iconClass="fa fa-institution"
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

const mapStateToProps = (state) => {
    const { organizations } = state.organizations;
    const { sortCategory, sortedForward } = state.tables.organizations;
    const { user } = state.user;

    let formattedOrganizations = [];
    organizations.forEach(org => {
        if (org.admins.indexOf(user._id) !== -1 || org.users.indexOf(user._id) !== -1 ||
            user.siteAdmin) {
            formattedOrganizations.push({name: org._id});
        }
    });

    return {
        organizations: sortedForward ?
            formattedOrganizations.sort(sortObjectArrayByField(sortCategory)) :
            formattedOrganizations.sort(sortObjectArrayByField(sortCategory)).reverse(),
        sortCategory,
        sortedForward,
        user
    };
};

export default connect(mapStateToProps)(OrganizationsTable);
