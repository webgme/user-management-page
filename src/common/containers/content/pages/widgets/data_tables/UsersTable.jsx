/**
 * Container widget for the users data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Self-defined
import DataTable from '../../../../../components/content/widgets/data_tables/DataTable';
import UsersDataTableEntry from '../../../../../components/content/widgets/data_tables/table_entries/UsersDataTableEntry';
import { sortWithChecks } from '../../../../../../client/utils/utils';
import { fetchUsersIfNeeded } from '../../../../../actions/users';
import { sortBy } from '../../../../../actions/tables';

const USERS_FIELDS = {
    "Created At": ["info", "createdAt"],
    "Last Changed": ["info", "modifiedAt"],
    "Last Viewed": ["info", "viewedAt"],
    "Owner": "owner",
    "Project Name": "name"
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

        const { sortedForward, users } = this.props;

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
                        <i className="fa fa-cubes"/> {` Users`}
                    </h3>
                </div>

                {/* Body */}
                <DataTable categories={categories}
                           content="Users"
                           entries={users}
                           iconClass="fa fa-cube"
                           orderEntries={this.handleOrderEntries}
                           sortable={true}
                           sortedForward={sortedForward}>
                    <UsersDataTableEntry columnStyle={{width: "13%"}}/>
                </DataTable>

            </div>
        );
    }
}

UsersTable.propTypes = {
    sortCategory: PropTypes.string.isRequired,
    sortedForward: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    const { users } = state.users;
    const { sortCategory, sortedForward } = state.tables.users;

    let formattedUsers = users.map(user => {
        return Object.assign(user, {
            name: user._id
        });
    });

    return {
        users: sortWithChecks(formattedUsers, sortCategory, sortedForward),
        sortCategory,
        sortedForward
    };
};

export default connect(mapStateToProps)(UsersTable);
