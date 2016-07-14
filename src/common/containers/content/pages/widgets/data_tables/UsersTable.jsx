/**
 * Container widget for the users data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Self-defined
import DataTable from '../../../../../components/content/widgets/data_tables/DataTable';
import UsersDataTableEntry from './table_entries/UsersDataTableEntry';
import { sortWithChecks } from '../../../../../../client/utils/utils';
import { fetchUsersIfNeeded } from '../../../../../actions/users';
import { sortBy } from '../../../../../actions/tables';

const USERS_FIELDS = {
    Name: ["data", "name"],
    UserId: "_id",
    SiteAdmin: "siteAdmin",
    Description: ["data", "description"]
};

class UsersTable extends Component {

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
        const newSortCategory = USERS_FIELDS[event.target.value];

        dispatch(sortBy('users', newSortCategory));
    }

    render() {

        const { sortedForward, userId, users } = this.props;

        const categories = [
            {id: 1, name: 'Name'},
            {id: 2, name: 'UserId'},
            {id: 3, name: 'SiteAdmin'},
            {id: 4, name: 'Description'}
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
                           iconClass="fa fa-users"
                           orderEntries={this.handleOrderEntries}
                           sortable={true}
                           sortedForward={sortedForward}>
                    <UsersDataTableEntry columnStyle={{width: "13%"}} userId={userId} />
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

const mapStateToProps = (state) => {
    const { users } = state.users;
    const { user } = state.user;
    const { sortCategory, sortedForward } = state.tables.users;

    let formattedUsers = users.map(eachUser => {
        return Object.assign(eachUser, {
            name: eachUser._id
        });
    });

    return {
        sortCategory,
        sortedForward,
        userId: user._id,
        users: sortWithChecks(formattedUsers, sortCategory, sortedForward)
    };
};

export default connect(mapStateToProps)(UsersTable);
