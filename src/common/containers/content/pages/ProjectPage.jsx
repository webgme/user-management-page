/* global window */

/**
 * Individual project page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self defined
import ProjectPage from '../../../components/content/pages/ProjectPage';
import { canUserTransfer, canUserAuthorize } from '../../../../client/utils/restUtils';

const mapStateToProps = (state, ownProps) => {
    const { organizations } = state.organizations;
    const { user } = state.user;
    const { users } = state.users;
    const { ownerId, projectName } = ownProps.params;
    const projectId = `${ownerId}+${projectName}`;

    const canAuthorize = canUserAuthorize(user, organizations, ownerId);
    const canTransfer = canUserTransfer(organizations, users, ownerId, projectId, user) || false;

    return {
        canAuthorize,
        canTransfer,
        user
    };
};

export default connect(mapStateToProps)(ProjectPage);
