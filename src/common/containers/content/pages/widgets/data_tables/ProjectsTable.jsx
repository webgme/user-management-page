/**
 * Container widget for the projects data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Self-defined
import DataTable from '../../../../../components/content/widgets/data_tables/DataTable';
import ProjectsDataTableEntry from './table_entries/ProjectsDataTableEntry';
import { sortWithChecks } from '../../../../../../client/utils/utils'; // eslint-disable-line max-len
import { fetchProjectsIfNeeded } from '../../../../../actions/projects';
import { sortBy } from '../../../../../actions/tables';

const PROJECTS_FIELDS = {
    "Created At": ["info", "createdAt"],
    "Last Changed": ["info", "modifiedAt"],
    "Last Viewed": ["info", "viewedAt"],
    "Owner": "owner",
    "Project Name": "name"
};

class ProjectsTable extends Component {

    constructor(props) {
        super(props);
        // Event handlers
        this.handleOrderEntries = this.handleOrderEntries.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchProjectsIfNeeded());
    }

    handleOrderEntries(event) {
        const { dispatch } = this.props;
        const newSortCategory = PROJECTS_FIELDS[event.target.value];

        dispatch(sortBy('projects', newSortCategory));
    }

    render() {

        const { projects, sortedForward } = this.props;

        const categories = [
            {id: 1, name: 'Owner'},
            {id: 2, name: 'Project Name'},
            {id: 3, name: 'Last Viewed'},
            {id: 4, name: 'Last Changed'},
            {id: 5, name: 'Created At'}
        ];

        return (

            <div>
                {/* Header */}
                <div className="box-header" style={{paddingBottom: 0}}>
                    <h3 className="box-title" style={{fontSize: 28}}>
                        <i className="fa fa-cubes"/> {` Projects`}
                    </h3>
                </div>

                {/* Body */}
                <DataTable categories={categories}
                           content="Projects"
                           entries={projects}
                           iconClass="fa fa-cube"
                           orderEntries={this.handleOrderEntries}
                           sortable={true}
                           sortedForward={sortedForward}
                           tableName="Projects">
                    <ProjectsDataTableEntry columnStyle={{width: "13%"}}/>
                </DataTable>

            </div>
        );
    }
}

ProjectsTable.propTypes = {
    projects: PropTypes.array.isRequired,
    sortCategory: PropTypes.string.isRequired,
    sortedForward: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    const { projects } = state.projects;
    const { sortCategory, sortedForward } = state.tables.projects;

    return {
        projects: sortWithChecks(projects.slice(), sortCategory, sortedForward),
        sortCategory,
        sortedForward
    };
};

export default connect(mapStateToProps)(ProjectsTable);
