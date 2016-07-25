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
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="box box-primary">

                            <UsersTable basePath={this.props.basePath}
                                        restClient={this.props.restClient}/>

                        </div>
                    </div>
                </div>

            </section>
        );
    }
}
