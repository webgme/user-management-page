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

        let currentUserId;

        this.props.restClient.user.getCurrentUser()
            .then(currentUser => {
                currentUserId = currentUser._id;
                let formattedOrganizations = currentUser.orgs.map(org => {
                    return {name: org};
                });

                // TODO: change this workaround after a solidified position is made on admins in orgs
                this.setState({
                    organizations: formattedOrganizations
                });
                return this.props.restClient.organizations.getAllOrganizations();
            })
            .then(allOrganizations => {
                allOrganizations.forEach(oneOrganization => {
                    let isAMember = -1;
                    this.state.organizations.forEach(organization => {
                        if (this.state.organizations.indexOf(organization) !== -1) {
                            isAMember = 1;
                        }
                    });
                    if (oneOrganization.admins.indexOf(currentUserId) !== -1 && isAMember === -1) {
                        this.setState({
                            organizations: this.state.organizations.concat({
                                name: oneOrganization._id
                            })
                        });
                    }
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
                       entries={this.state.organizations}
                       basePath={this.props.routes[0].basePath}>
                <OrganizationsDataTableEntry/>
            </DataTable>

        </section>;
    }

}
