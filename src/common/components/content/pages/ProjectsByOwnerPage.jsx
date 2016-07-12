/**
 * Projects by owner page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
// Self defined
import ProjectsByOwnerTable from '../../../containers/content/pages/widgets/data_tables/ProjectsByOwnerTable';

export default class ProjectsByOwnerPage extends Component {

    render() {
        return (
            <section className="content">

                <div className="box box-primary">

                    <ProjectsByOwnerTable />

                </div>

            </section>
        );
    }

}
