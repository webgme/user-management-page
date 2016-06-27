/**
 * Projects page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';
// Self defined
import ProjectsTable from '../widgets/data_tables/ProjectsTable';

export default class ProjectsPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return <section className="content">

            <ProjectsTable restClient={this.props.restClient}
                           basePath={this.props.routes[0].basePath}/>

        </section>;
    }

}
