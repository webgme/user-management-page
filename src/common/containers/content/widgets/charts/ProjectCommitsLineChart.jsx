/**
 * Container for CollaboratorsCommitBarChart
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries:
import { connect } from 'react-redux';
// Self defined:
import ProjectCommitsLineChart from '../../../../components/content/widgets/charts/ProjectCommitsLineChart';

const mapStateToProps = (state, ownProps) => {
    const { ownerId, projectName } = ownProps;
    const projectId = `${ownerId}+${projectName}`;
    const { user } = state.user;

    // Could be fetching
    const commits = state.projects.commits[projectId] ? state.projects.commits[projectId].commits || [] : [];

    // Get project info
    const thisProject = state.projects.projects.find((project) => {
        return project._id === projectId;
    });
    const info = thisProject ? thisProject.info : {};

    return {
        commits,
        info,
        user
    };
};

export default connect(mapStateToProps)(ProjectCommitsLineChart);
