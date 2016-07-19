/* global window */

/**
 * Container widget for the projects data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import ProjectsTable from '../../../../components/content/widgets/data_tables/ProjectsTable';

import { sortWithChecks } from '../../../../../client/utils/utils';

const mapStateToProps = (state, ownProps) => {
    const { projects } = state.projects;
    const { sortCategory, sortedForward } = state.tables.projects;

    const ownerId = ownProps.pathname.split('/').slice(-1)[0];

    let filteredProjects = projects.slice();
    if (ownerId !== 'projects') {
        filteredProjects = filteredProjects.filter((project) => {
            return project.owner === ownerId;
        });
    }

    return {
        projects: sortWithChecks(filteredProjects, sortCategory, sortedForward),
        sortCategory,
        sortedForward
    };
};

export default connect(mapStateToProps)(ProjectsTable);
