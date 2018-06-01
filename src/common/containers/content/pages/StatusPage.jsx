/**
 * StatusPage container
 * @author pmeijer / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import StatusPage from '../../../components/content/pages/StatusPage';

const mapStateToProps = (state) => {
    const { basePath } = state;
    const { user } = state.user;
    const { users } = state.users;
    let enabledUsers = users.filter((user) => {
        return !user.disabled;
    });

    return {
        basePath,
        user,
        users: enabledUsers
    };
};

export default connect(mapStateToProps)(StatusPage);
