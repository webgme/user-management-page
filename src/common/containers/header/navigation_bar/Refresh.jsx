/**
 * Refresh container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import Refresh from '../../../components/header/navigation_bar/Refresh';
import { fetchUser } from '../../../actions/user';
import { fetchUsers } from '../../../actions/users';
import { fetchProjects } from '../../../actions/projects';
import { fetchOrganizations } from '../../../actions/organizations';
import { refreshTables } from '../../../actions/tables';

const actions = [fetchUser, fetchUsers, fetchProjects, fetchOrganizations, refreshTables];

const mapDispatchToProps = (dispatch) => {
    return {
        refresh: (event) => {
            // Release focus
            event.target.blur();

            actions.forEach((action) => {
                dispatch(action());
            });
        }
    };
};

export default connect(null, mapDispatchToProps)(Refresh);
