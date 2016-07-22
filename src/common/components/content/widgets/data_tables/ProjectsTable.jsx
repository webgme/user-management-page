/**
 * Container widget for the projects data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
// Self-defined
import DataTable from './DataTable';
import ProjectsDataTableEntry from
    '../../../../containers/content/widgets/data_tables/table_entries/ProjectsDataTableEntry';
import { fetchProjectsIfNeeded } from '../../../../actions/projects';
import { sortBy } from '../../../../actions/tables';

const PROJECTS_FIELDS = {
    "Created At": ["info", "createdAt"],
    "Last Changed": ["info", "modifiedAt"],
    "Last Viewed": ["info", "viewedAt"],
    "Owner": "owner",
    "Project Name": "name"
};

export default class ProjectsTable extends Component {

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
        const newSortCategory = PROJECTS_FIELDS[event.target.innerHTML];

        dispatch(sortBy('projects', newSortCategory));
    }

    render() {
        const { pathname, projects, sortedForward } = this.props;

        const categories = [
            {id: 1, name: 'Owner', style: {width: "13%"}},
            {id: 2, name: 'Project Name', style: {width: "50%"}},
            {id: 3, name: 'Last Viewed', className: "hidden-xs", style: {width: "13%"}},
            {id: 4, name: 'Last Changed', className: "hidden-xs", style: {width: "13%"}},
            {id: 5, name: 'Created At', className: "hidden-xs", style: {width: "13%"}}
        ];

        // Will be 'projects' if in the projects page, if in projectsByOwner then will be ownerId
        const ownerId = pathname.split('/').pop();

        return (

            <div>
                {/* Header */}
                <div className="box-header" style={{paddingBottom: 0}}>
                    <h3 className="box-title" style={{fontSize: 28}}>
                        <i className="fa fa-cubes"/> {` Projects ${ownerId === 'projects' ? '' : 'by ' + ownerId}`}
                    </h3>
                </div>

                {/* Body */}
                <DataTable categories={categories}
                           content="Projects"
                           entries={projects}
                           orderEntries={this.handleOrderEntries}
                           sortable={true}
                           sortedForward={sortedForward}>
                    <ProjectsDataTableEntry />
                </DataTable>

            </div>
        );
    }
}

ProjectsTable.propTypes = {
    projects: PropTypes.array.isRequired,
    sortCategory: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    sortedForward: PropTypes.bool.isRequired
};
