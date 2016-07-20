/* global */

/**
 * Container widget for the single organization table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, {Component, PropTypes} from 'react';
// Self-defined
import DataTable from './DataTable';
import OrganizationDataTableEntry from './table_entries/OrganizationDataTableEntry';
import { sortBy } from '../../../../actions/tables';
import {fetchOrganizationsIfNeeded, fetchOrganizations} from '../../../../actions/organizations';
import {fetchUsers} from '../../../../actions/users';

const MEMBER_FIELDS = {
    User: 'name',
    Admin: 'isAdmin'
};

export default class OrganizationTable extends Component {

    constructor(props) {
        super(props);
        // Event handlers
        this.handleOrderEntries = this.handleOrderEntries.bind(this);
        this.removeMember = this.removeMember.bind(this);
        this.setAdmin = this.setAdmin.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;

        dispatch(fetchOrganizationsIfNeeded());
    }

    removeMember(event) {
        const {dispatch} = this.props;
        var userId = event.target.id;

        this.props.restClient.organizations.deleteUserFromOrganization(this.props.organizationId, userId)
            .then(() => {
                dispatch(fetchUsers());
                dispatch(fetchOrganizations());
            });
    }

    setAdmin(event) {
        const {dispatch} = this.props;

        var actionType = event.target.getAttribute('action'),
            userId = event.target.id;

        event.preventDefault();
        event.stopPropagation();

        if (actionType === 'removeAdmin') {
            this.props.restClient.organizations.removeAdminOfOrganization(this.props.organizationId, userId)
                .then(() => {
                    dispatch(fetchOrganizations());
                });
        } else if (actionType === 'makeAdmin') {
            this.props.restClient.organizations.makeAdminOfOrganization(this.props.organizationId, userId)
                .then(() => {
                    dispatch(fetchOrganizations());
                });
        }
    }

    handleOrderEntries(event) {
        const { dispatch } = this.props;
        console.log(event.target.innerHTML);
        const newSortCategory = MEMBER_FIELDS[event.target.value];

        dispatch(sortBy('organizationMembers', newSortCategory));
    }

    render() {

        const {canAuthorize, members} = this.props;

        const categories = [
            {id: 1, name: 'User'},
            {id: 2, name: 'Admin'}
        ];

        return (
            <div>
                {/* Self-defined header */}
                <div className="box-header" style={{paddingBottom: 0}}>
                    <h3 className="box-title" style={{fontSize: 28}}>
                        <i className={this.props.iconClass}/> {` Members`}
                    </h3>
                </div>

                <DataTable categories={categories}
                           entries={members}
                           orderEntries={this.handleOrderEntries}
                           sortable={true}
                           sortedForward={true}>
                    <OrganizationDataTableEntry canAuthorize={canAuthorize}
                                                removeMember={this.removeMember}
                                                setAdmin={this.setAdmin}
                    />
                </DataTable>
            </div>
        );
    }
}

OrganizationTable.propTypes = {
    members: PropTypes.array.isRequired
};
