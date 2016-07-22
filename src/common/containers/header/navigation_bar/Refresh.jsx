/* global window */

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
import { fetchProjects, fetchCommits } from '../../../actions/projects';
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

            // Refresh the commits if in singular project page
            const { pathname } = window.location;
            if (/projects\/\S+\/\S+$/.test(pathname)) {
                const pathParams = pathname.split('/');
                const projectName = pathParams.pop();
                const ownerId = pathParams.pop();
                dispatch(fetchCommits(ownerId, projectName));
            }
        }
    };
};

export default connect(null, mapDispatchToProps)(Refresh);
