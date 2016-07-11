/**
 * Projects page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
// Self defined
import ProjectsTable from '../../../containers/content/pages/widgets/data_tables/ProjectsTable';

export default class ProjectsPage extends Component {

    render() {
        return (
            <section className="content">

                <div className="box box-primary">

                    <ProjectsTable />

                </div>

            </section>
        );
    }

}
