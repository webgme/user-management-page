import React from 'react';
import ProjectsDataTable from './datatable/ProjectsDataTable.jsx';

export default class ProjectsPage extends React.Component {

    constructor(props) {
        super(props);
        this.restClient = props.restClient;
    }

    render() {
        return <section className="content">
            <h1> Projects </h1>
            <ProjectsDataTable restClient={this.restClient}/>
        </section>;
    }

}
