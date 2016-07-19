/**
 * Users page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
// Self defined
import UsersTable from '../../../containers/content/widgets/data_tables/UsersTable';

export default class UsersPage extends Component {

    render() {
        return (
            <section className="content">

                <div className="box box-primary col-md-8 col-md-offset-2">

                    <UsersTable />

                </div>

            </section>
        );
    }

}
