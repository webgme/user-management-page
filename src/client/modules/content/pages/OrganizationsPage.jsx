// Libraries
import React from '../../../../../node_modules/react/lib/React';
// Self defined
import DataTable from './datatable/DataTable.jsx';
import OrganizationsDataTableEntry from './datatable/OrganizationsDataTableEntry.jsx';

export default class OrganizationsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            organizations: []
        };
    }

    componentDidMount() {
        var self = this;
        this.props.restClient.user.getCurrentUser()
            .then(currentUser => {
                let formattedOrganizations = currentUser.orgs.map(org => {
                    return {name: org};
                });
                self.setState({
                    organizations: formattedOrganizations
                });
            });
    }

    render() {

        let categories = [
            {id: 1, name: 'Organization Name:'}
        ];

        return <section className="content">
            <h2> Organizations </h2>

            <DataTable restClient={this.restClient}
                       categories={categories}
                       tableName="Organizations"
                       entries={this.state.organizations}>
                <OrganizationsDataTableEntry/>
            </DataTable>

        </section>;
    }

}
