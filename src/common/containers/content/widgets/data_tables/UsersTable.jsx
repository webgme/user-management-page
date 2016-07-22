/**
 * Container widget for the users data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import UsersTable from
    '../../../../components/content/widgets/data_tables/UsersTable';

import { sortWithChecks } from '../../../../../client/utils/utils';

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
        user: user,
        users: sortWithChecks(formattedUsers, sortCategory, sortedForward)
    };
};

export default connect(mapStateToProps)(UsersTable);
