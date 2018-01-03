/* global window */

/**
 * Individual project page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self defined
import ProjectPage from '../../../components/content/pages/ProjectPage';
import { canUserTransfer, canUserAuthorize, canUserDelete } from '../../../../client/utils/restUtils';

const mapStateToProps = (state, ownProps) => {
    const { projects } = state.projects;
    const { organizations } = state.organizations;
    const { user } = state.user;
    const { users } = state.users;
    const { ownerId, projectName } = ownProps.params;
    const { basePath } = state;
    const projectId = `${ownerId}+${projectName}`;

    const canAuthorize = canUserAuthorize(user, organizations, ownerId);
    const canTransfer = canUserTransfer(organizations, users, ownerId, projectId, user) || false;
    const canDelete = canUserDelete(organizations, users, projectId, user);

    const exists = projects.filter((project) => {
        return project._id === projectId;
    }).length === 1;

    // let enabledUsers = users.filter((user) => {
    //     return !user.disabled;
    // });

    return {
        canAuthorize,
        canDelete,
        canTransfer,
        exists,
        user,
        basePath
    };
};

export default connect(mapStateToProps)(ProjectPage);
