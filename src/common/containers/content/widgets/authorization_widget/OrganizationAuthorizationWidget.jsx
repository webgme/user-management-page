/**
 * Separate component to hold the authorization widget for the organization page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self defined
import OrganizationAuthorizationWidget from
    '../../../../components/content/widgets/authorization_widget/OrganizationAuthorizationWidget';

const mapStateToProps = (state) => {
    const { users } = state.users;
    let enabledUsers = users.filter((user) => {
        return !user.disabled;
    });

    return {
        users: enabledUsers
    };
};

export default connect(mapStateToProps)(OrganizationAuthorizationWidget);
