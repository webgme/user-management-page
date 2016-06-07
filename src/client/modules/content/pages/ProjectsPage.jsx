// Libraries
import React from '../../../../../node_modules/react/lib/React';
// Self defined
import DataTable from './datatable/DataTable.jsx';
import ProjectsDataTableEntry from './datatable/ProjectsDataTableEntry.jsx';

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

        return <section className="content">
            <h2> Projects </h2>

            <DataTable restClient={this.restClient}
                       categories={categories}
                       whichTable="projects"
                       tableName="Projects"
                       entries={this.state.projects}>
                <ProjectsDataTableEntry/>
            </DataTable>

        </section>;
    }

}
