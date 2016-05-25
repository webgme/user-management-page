import React from 'react';
import ProjectDataTable from './projectsdatatable/ProjectsDataTable.jsx';

export default class ProjectsPage extends React.Component {

    constructor(props) {
        super(props);
        this.restClient = props.restClient;
    }

    render() {
        return <section className="content">
            <h1> Projects </h1>
            <ProjectDataTable restClient={this.restClient}/>
        </section>;
    }

}
