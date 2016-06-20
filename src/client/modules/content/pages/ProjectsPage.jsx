/**
 * Projects page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';
// Self defined
// import CommitsDoughnutChart from '../widgets/charts/CommitsDoughnutChart';
// import CommitsLineChart from '../widgets/charts/CommitsLineChart';
import DataTable from '../widgets/data_tables/DataTable';
import DataTableHeader from '../widgets/data_tables/table_headers/DataTableHeader';
import ProjectsDataTableEntry from '../widgets/data_tables/table_entries/ProjectsDataTableEntry';

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
            {id: 4, name: 'Last Changed:'},
            {id: 5, name: 'Created At:'}
        ];

        return <section className="content">

            <DataTable basePath={this.props.routes[0].basePath}
                       categories={categories}
                       entries={this.state.projects}
                       iconClass="fa fa-cube"
                       restClient={this.restClient}
                       TableHeader={<DataTableHeader/>}
                       tableName="Projects">
                <ProjectsDataTableEntry/>
            </DataTable>

            <div className="row">

                {/*
                <CommitsLineChart restClient={this.props.restClient}/>

                <CommitsDoughnutChart restClient={this.props.restClient}/>
                */}

            </div>

        </section>;
    }

}
