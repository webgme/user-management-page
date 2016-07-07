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
import {sortObjectArrayByField, sortObjectArrayByNestedDateField} from '../../../../../../client/utils/utils';
import { fetchProjectsIfNeeded, reverseSort, sortBy, sortForward } from '../../../../../actions/projects';

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

    componentWillReceiveProps(nextProps) {
        const { dispatch } = nextProps;

        if (nextProps.projects !== this.props.projects) {
            dispatch(fetchProjectsIfNeeded());
            // Indicates user is sorting by a different field, so reset sort order
        } else if (nextProps.sortBy !== this.props.sortBy || nextProps.sortedForward !== this.props.sortedForward) {
            dispatch(sortForward());
        }
    }

    handleOrderEntries(event) {
        const { dispatch } = this.props;
        let sortCategory = PROJECTS_FIELDS[event.target.value];

        dispatch(reverseSort());
        dispatch(sortBy(sortCategory));
    }

    render() {

        const { projects, sortedForward } = this.props;

        let categories = [
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
    projects: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    const { projects, sortCategory, sortedForward } = state.projects;

    if (typeof sortCategory === 'string') {
        return {
            projects: sortedForward ?
                projects.slice().sort(sortObjectArrayByField(sortCategory)) :
                projects.slice().sort(sortObjectArrayByField(sortCategory)).reverse(),
            sortedForward
        };
    } else if (Array.isArray(sortCategory)) {
        return {
            projects: sortedForward ?
                projects.slice().sort(sortObjectArrayByNestedDateField(sortCategory[0], sortCategory[1])) :
                projects.slice().sort(sortObjectArrayByNestedDateField(sortCategory[0], sortCategory[1])).reverse(),
            sortedForward
        };
    }
};

export default connect(mapStateToProps)(ProjectsTable);
