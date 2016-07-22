/**
 * Projects page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
// Self defined
import ProjectsTable from '../../../containers/content/widgets/data_tables/ProjectsTable';

export default class ProjectsPage extends Component {

    render() {
        const { pathname } = this.props;

        return (
            <section className="content">

                <div className="box box-primary">

                    <ProjectsTable pathname={pathname}/>

                </div>

            </section>
        );
    }

}
