/**
 * Container widget for the project collaborator table widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import ProjectCollaboratorTable from
    '../../../../components/content/widgets/data_tables/ProjectCollaboratorTable';

import { sortWithChecks } from '../../../../../client/utils/utils';
import { retrieveCollaborators } from '../../../../../client/utils/restUtils';

const mapStateToProps = (state, ownProps) => {
    const { organizations } = state.organizations;
    const { users } = state.users;

    const { ownerId, projectName } = ownProps;
    const projectId = `${ownerId}+${projectName}`;

    // Retrieving collaborators
    let collaborators = retrieveCollaborators(organizations, users, projectId);

    // Sorting collaborators
    const userSortCategory = state.tables.projectUser.sortCategory;
    const userSortedForward = state.tables.projectUser.sortedForward;
    const orgSortCategory = state.tables.projectOrg.sortCategory;
    const orgSortedForward = state.tables.projectOrg.sortedForward;

    collaborators = {
        userCollaborators: sortWithChecks(collaborators.userCollaborators, userSortCategory, userSortedForward),
        organizationCollaborators: sortWithChecks(collaborators.organizationCollaborators, orgSortCategory, orgSortedForward) // eslint-disable-line max-len
    };

    return {
        collaborators,
        orgSortedForward,
        userSortedForward
    };
};

export default connect(mapStateToProps)(ProjectCollaboratorTable);
