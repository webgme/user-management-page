/**
 * Separate component to hold the authorization widget for the project page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self defined
import ProjectAuthorizationWidget from
    '../../../../components/content/widgets/authorization_widget/ProjectAuthorizationWidget';

const mapStateToProps = (state) => {
    const { organizations } = state.organizations;
    const { users } = state.users;

    return {
        organizations,
        users
    };
};

export default connect(mapStateToProps)(ProjectAuthorizationWidget);
