/**
 * Individual organization page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self defined
import OrganizationPage from '../../../components/content/pages/OrganizationPage';
import { canUserAuthorize } from '../../../../client/utils/restUtils';

const mapStateToProps = (state, ownProps) => {
    const { organizations } = state.organizations;
    const { projects } = state.projects;
    const { user } = state.user;
    const { organizationId } = ownProps.params;
    const { basePath } = state;

    const canAuthorize = canUserAuthorize(user, organizations, organizationId);

    const ownedProjects = projects.filter(project => {
        return project.owner === organizationId;
    });

    return {
        basePath,
        canAuthorize,
        ownedProjects
    };
};

export default connect(mapStateToProps)(OrganizationPage);
