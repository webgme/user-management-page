/**
 * Container for CollaboratorsCommitBarChart
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries:
import { connect } from 'react-redux';
// Self defined:
import CollaboratorsCommitBarChart from '../../../../components/content/widgets/charts/CollaboratorsCommitsBarChart';
import { processCommitsBar } from '../../../../../client/utils/utils';

const mapStateToProps = (state, ownProps) => {
    const { ownerId, projectName } = ownProps;
    const projectId = `${ownerId}+${projectName}`;

    // Could be fetching
    const commits = state.projects.commits[projectId] ? state.projects.commits[projectId].commits || [] : [];
    const data = processCommitsBar(commits.slice());

    return {
        data
    };
};

export default connect(mapStateToProps)(CollaboratorsCommitBarChart);
