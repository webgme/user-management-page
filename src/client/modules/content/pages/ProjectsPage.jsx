// Libraries
import React from '../../../../../node_modules/react/lib/React';
import {Link} from 'react-router/lib';
// Self defined
import DataTable from './datatable/DataTable.jsx';
import ProjectsDataTable from './datatable/ProjectsDataTableEntry.jsx';

export default class ProjectsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }

    componentDidMount() {
        var self = this;
        this.props.restClient.projects.getAllProjects()
            .then(function(data) {
                self.setState({
                    projects: data
                });
            });
    }

    render() {

        let categories = [
            {id: 1, name: 'Project Name:'},
            {id: 2, name: 'Owner'},
            {id: 3, name: 'Last Viewed:'},
            {id: 4, name: 'Last Changed:'}
        ];

        let tableEntries = [];

        this.state.projects.forEach((project, index) => {
            tableEntries[index] = [];
            tableEntries[index].push(<Link to={`/projects/${project.owner}/${project.name}`}>{project.name}</Link>);
            tableEntries[index].push(project.owner);
            tableEntries[index].push(project.info.viewedAt);
            tableEntries[index].push(project.info.modifiedAt);
        });

        return <section className="content">
            <h2> Projects </h2>

            <DataTable restClient={this.restClient}
                       categories={categories}
                       whichTable="projects"
                       tableName="Projects"
                       entries={this.state.projects}
                       tableEntries={tableEntries}>
                <ProjectsDataTable/>
            </DataTable>

        </section>;
    }

}
