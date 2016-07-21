/**
 * Container for CollaboratorsCommitBarChart
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries:
import { connect } from 'react-redux';
// Self defined:
import ProjectSelectableCharts from '../../../../components/content/widgets/charts/ProjectSelectableCharts';

const mapStateToProps = (state, ownProps) => {
    const { ownerId, projectName } = ownProps;
    const projectId = `${ownerId}+${projectName}`;

    // Get project info
    const thisProject = state.projects.projects.find((project) => {
        return project._id === projectId;
    });
    const info = thisProject ? thisProject.info : {};

    return {
        info
    };
};

export default connect(mapStateToProps)(ProjectSelectableCharts);
