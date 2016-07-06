/**
 * Container widget for the projects data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Self-defined
import DataTable from '../../../../../components/content/widgets/data_tables/DataTable';
import ProjectsDataTableEntry from '../../../../../components/content/widgets/data_tables/table_entries/ProjectsDataTableEntry';
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
        this.state = {
            sortedForward: true,
            projects: []
        };
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
        } else if (nextProps.sortBy !== this.props.sortBy) {
            dispatch(sortForward());
        }
    }

    handleOrderEntries(event) {
        let sortBy = PROJECTS_FIELDS[event.target.value];

        if (typeof sortBy === 'string') {
            this.setState({
                projects: this.state.sortedForward ?
                    this.state.projects.sort(sortObjectArrayByField(sortBy)).reverse() :
                    this.state.projects.sort(sortObjectArrayByField(sortBy)),
                sortedForward: !this.state.sortedForward
            });
        } else if (Array.isArray(sortBy)) {
            this.setState({
                projects: this.state.sortedForward ?
                    this.state.projects.sort(sortObjectArrayByNestedDateField(sortBy[0], sortBy[1])).reverse() :
                    this.state.projects.sort(sortObjectArrayByNestedDateField(sortBy[0], sortBy[1])),
                sortedForward: !this.state.sortedForward
            });
        }

    }

    render() {

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
                <DataTable basePath={this.props.basePath}
                           categories={categories}
                           content="Projects"
                           entries={this.state.projects}
                           iconClass="fa fa-cube"
                           orderEntries={this.handleOrderEntries}
                           restClient={this.props.restClient}
                           sortable={true}
                           sortedForward={this.state.sortedForward}
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
    const { projects, sortBy, sortedForward } = state.projects;

    if (typeof sortBy === 'string') {
        return {
            projects: sortedForward ?
                projects.sort(sortObjectArrayByField(sortBy)).reverse() :
                projects.sort(sortObjectArrayByField(sortBy))
        };
    } else if (Array.isArray(sortBy)) {
        return {
            projects: sortedForward ?
                projects.sort(sortObjectArrayByNestedDateField(sortBy[0], sortBy[1])).reverse() :
                projects.sort(sortObjectArrayByNestedDateField(sortBy[0], sortBy[1]))
        };
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleOrderEntries: (event) => {
            let newSortBy = PROJECTS_FIELDS[event.target.value];

            dispatch(sortBy(newSortBy));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTable);
