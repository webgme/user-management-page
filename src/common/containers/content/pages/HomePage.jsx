/**
 * Home page container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import HomePage from '../../../components/content/pages/HomePage';

const mapStateToProps = (state) => {
    const { basePath } = state;
    const { projects } = state.projects;
    const { user } = state.user;
    const { users } = state.users;
    const { organizations } = state.organizations;

    return {
        basePath,
        projects,
        user,
        users,
        organizations
    };
};

export default connect(mapStateToProps)(HomePage);
