/**
 * Users page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
// Self defined
import UsersTable from '../../../containers/content/pages/widgets/data_tables/UsersTable';

export default class UsersPage extends Component {

    render() {
        return (
            <section className="content">

                <div className="box box-primary">

                    <UsersTable />

                </div>

            </section>
        );
    }

}
