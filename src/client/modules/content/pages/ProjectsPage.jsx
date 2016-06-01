import React from 'react';
import DataTable from './datatable/DataTable.jsx';

export default class ProjectsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
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
            {id: 3, name: 'Organization:'},
            {id: 4, name: 'Last Viewed:'},
            {id: 5, name: 'Last Changed:'}
        ];

        return <section className="content">
            <h2> Projects </h2>

            <DataTable restClient={this.restClient}
                       categories={categories}
                       whichTable="projects"
                       tableName="Projects Table"
                       entries={this.state.projects}
                       />
        </section>;
    }

}
