
// Libraries
import React, { Component } from 'react';
// Self defined
import TokensTable from '../../../containers/content/widgets/data_tables/TokensTable';


export default class TokensPage extends Component {
    render() {
        return (
            <section className="content">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="box box-primary">
                            <TokensTable
                                basePath={this.props.basePath}
                                restClient={this.props.restClient}/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}