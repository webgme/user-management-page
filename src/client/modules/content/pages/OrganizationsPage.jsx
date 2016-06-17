/**
 * Organizations page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';
// Self defined
import DataTable from '../widgets/datatable/DataTable';
import OrganizationsDataTableEntry from '../widgets/datatable/table_entries/OrganizationsDataTableEntry';

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

            <DataTable basePath={this.props.routes[0].basePath}
                       categories={categories}
                       entries={this.state.organizations}
                       restClient={this.restClient}
                       tableName="Organizations"
                       tableIcon="institution">
                <OrganizationsDataTableEntry/>
            </DataTable>

        </section>;
    }

}
