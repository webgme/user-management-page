/**
 * Container widget for the users data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
// Self-defined
import DataTable from '../../../../containers/content/widgets/data_tables/DataTable';
import UsersDataTableEntry from
    '../../../../containers/content/widgets/data_tables/table_entries/UsersDataTableEntry';
import { fetchUsersIfNeeded } from '../../../../actions/users';
import { fetchUserIfNeeded } from '../../../../actions/user';

export default class UsersTable extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchUsersIfNeeded());
        dispatch(fetchUserIfNeeded());
    }

    render() {
        const { user, users } = this.props;
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
                    <Link to={`${this.props.basePath}newuser`}>
                    <Button className="pull-right"
                            bsStyle="primary"
                            bsSize="small"
                            style={this.props.user.siteAdmin === true ? {} : {display: 'none'}}
                            onClick={this.toggleModal}>
                        Add +

                    </Button>
                    </Link>
                </div>

                {/* Body */}
                <DataTable categories={categories}
                           content="Users"
                           entries={users}
                           orderEntries={this.handleOrderEntries}
                           reducerTableName="users"
                           sortable={true}>
                    <UsersDataTableEntry columnStyle={{width: "13%"}}
                                         userId={user._id} />
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
