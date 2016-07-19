/**
 * Profile page container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import UserPage from '../../../components/content/pages/UserPage';

const mapStateToProps = (state, ownProps) => {
    const { basePath } = state;
    const { user } = state.user;
    const { users } = state.users;

    const viewUserId = ownProps.params.userId;
    const viewUser = users.find((eachUser) => {
        return eachUser._id === viewUserId;
    }) || {};

    return {
        basePath,
        editable: user.siteAdmin,
        user: viewUser
    };
};

export default connect(mapStateToProps)(UserPage);
