/**
 * Container widget for the users data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
// Self-defined
import DataTable from './DataTable';
import UsersDataTableEntry from
    '../../../../containers/content/widgets/data_tables/table_entries/UsersDataTableEntry';
import { fetchUsersIfNeeded } from '../../../../actions/users';
import { fetchUserIfNeeded } from '../../../../actions/user';
import { sortBy } from '../../../../actions/tables';

const USERS_FIELDS = {
    User: "_id"
};

export default class UsersTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        // Event handlers
        this.handleOrderEntries = this.handleOrderEntries.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchUsersIfNeeded());
        dispatch(fetchUserIfNeeded());
    }

    handleOrderEntries(event) {
        const { dispatch } = this.props;
        const newSortCategory = USERS_FIELDS[event.target.innerHTML];

        dispatch(sortBy('users', newSortCategory));
    }

    render() {

        const { sortedForward, userId, users } = this.props;

        const categories = [
            {id: 1, name: 'User'}
        ];

        return (

            <div>
                {/* Header */}
                <div className="box-header"
                     style={{paddingBottom: "0px"}}>
                    <h3 className="box-title" style={{fontSize: 28}}>
                        <i className="fa fa-users"/> {` Users`}
                    </h3>

                    <Button className="pull-right"
                            bsStyle="primary"
                            bsSize="small"
                            style={this.props.user.siteAdmin === true ? {} : {display: 'none'}}
                            onClick={this.toggleModal}>
                        <Link to={`${this.props.basePath}newuser`}>Add +</Link>

                    </Button>
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
    users: PropTypes.array.isRequired,
    restClient: PropTypes.object.isRequired,
    basePath: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
};
