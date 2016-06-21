/**
 * Organizations page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';
// Self defined
import OrganizationsDataTable from '../widgets/data_tables/OrganizationsTable';

export default class OrganizationsPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <section className="content">

            <OrganizationsDataTable restClient={this.props.restClient}
                                    basePath={this.props.routes[0].basePath}/>

        </section>;
    }

}
