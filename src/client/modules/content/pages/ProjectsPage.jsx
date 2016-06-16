/**
 * Projects page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react';
// Self defined
import CommitsDoughnutChart from '../widgets/CommitsDoughnutChart.jsx';
import CommitsLineChart from '../widgets/CommitsLineChart.jsx';
import DataTable from '../widgets/datatable/DataTable.jsx';
import ProjectsDataTableEntry from '../widgets/datatable/table_entries/ProjectsDataTableEntry.jsx';

export default class ProjectsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }

    componentDidMount() {
        this.props.restClient.projects.getAllProjects()
            .then(allProjects => {
                this.setState({
                    projects: allProjects
                });
            });
    }

    render() {

        let categories = [
            {id: 1, name: 'Owner:'},
            {id: 2, name: 'Project Name:'},
            {id: 3, name: 'Last Viewed:'},
            {id: 4, name: 'Last Changed:'}
        ];

        return <section className="content">

            <DataTable restClient={this.restClient}
                       categories={categories}
                       whichTable="projects"
                       tableName="Projects"
                       entries={this.state.projects}
                       basePath={this.props.routes[0].basePath}>
                <ProjectsDataTableEntry/>
            </DataTable>

            <div className="row">

                <CommitsLineChart restClient={this.props.restClient}/>

                <CommitsDoughnutChart restClient={this.props.restClient}/>

            </div>

        </section>;
    }

}
