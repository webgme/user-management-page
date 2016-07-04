/* global $ */

/**
 * Container widget for the projects data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';
// Self-defined
import DataTable from './DataTable';
import ProjectsDataTableEntry from './table_entries/ProjectsDataTableEntry';
import {sortObjectArrayByField, sortObjectArrayByNestedDateField} from '../../../../utils/utils';

const PROJECTS_FIELDS = {
    "Created At": ["info", "createdAt"],
    "Last Changed": ["info", "modifiedAt"],
    "Last Viewed": ["info", "viewedAt"],
    "Owner": "owner",
    "Project Name": "name"
};

export default class ProjectsTable extends React.Component {

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
        this.props.restClient.projects.getAllProjects()
            .then(allProjects => {
                this.setState({
                    projects: allProjects
                });
            });
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
