/**
 * Container for CollaboratorsCommitBarChart
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries:
import { connect } from 'react-redux';
// Self defined:
import CommitsLineChart from '../../../../components/content/widgets/charts/ProjectsCommitsLineChart';
import { processCommitsLine } from '../../../../../client/utils/utils';

const mapStateToProps = (state, ownProps) => {
    const { ownerId, projectName } = ownProps;
    const projectId = `${ownerId}+${projectName}`;
    const { user } = state.user;

    // Could be fetching
    const commits = state.projects.commits[projectId] ? state.projects.commits[projectId].commits || [] : [];
    // const data = processCommitsLine(commits.slice(), user._id, 1);
    const data = {};

    // Get project info
    const thisProject = state.projects.projects.find((project) => {
        return project._id === projectId;
    });
    const { info } = thisProject ? thisProject : {info: {}};

    return {
        data,
        info,
        user
    };
};

export default connect(mapStateToProps)(CommitsLineChart);
