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
import {sortObjectArrayByField, THEME_COLORS} from '../../../../utils/utils';

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
        // Release focus (surrounding box)
        $(event.target).parent().blur();

        this.setState({
            projects: this.state.sortedForward ?
                this.state.projects.sort(sortObjectArrayByField('name')).reverse() :
                this.state.projects.sort(sortObjectArrayByField('name')),
            sortedForward: !this.state.sortedForward
        });
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
                    <ProjectsDataTableEntry/>
                </DataTable>
            </div>
        );
    }
}
