/**
 * Container widget for the users data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
// Self-defined
import DataTable from './DataTable';
import UsersDataTableEntry from
    '../../../../containers/content/widgets/data_tables/table_entries/UsersDataTableEntry';
import { fetchUsersIfNeeded } from '../../../../actions/users';
import { sortBy } from '../../../../actions/tables';

const USERS_FIELDS = {
    UserId: "_id",
    SiteAdmin: "siteAdmin"
};

export default class UsersTable extends Component {

    constructor(props) {
        super(props);
        // Event handlers
        this.handleOrderEntries = this.handleOrderEntries.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchUsersIfNeeded());
    }

    handleOrderEntries(event) {
        const { dispatch } = this.props;
        const newSortCategory = USERS_FIELDS[event.target.innerHTML];

        dispatch(sortBy('users', newSortCategory));
    }

    render() {

        const { sortedForward, userId, users } = this.props;

        const categories = [
            {id: 1, name: 'UserId'},
            {id: 2, name: 'SiteAdmin'}
        ];

        return (

            <div>
                {/* Header */}
                <div className="box-header" style={{paddingBottom: 0}}>
                    <h3 className="box-title" style={{fontSize: 28}}>
                        <i className="fa fa-users"/> {` Users`}
                    </h3>
                </div>

                {/* Body */}
                <DataTable categories={categories}
                           content="Users"
                           entries={users}
                           orderEntries={this.handleOrderEntries}
                           sortable={true}
                           sortedForward={sortedForward}>
                    <UsersDataTableEntry columnStyle={{width: "13%"}}
                                         userId={userId} />
                </DataTable>

            </div>
        );
    }
}

UsersTable.propTypes = {
    sortCategory: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    sortedForward: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired
};