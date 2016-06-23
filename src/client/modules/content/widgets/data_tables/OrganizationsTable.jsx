/* global $ */

/**
 * Container widget for the organizations table widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';
// Self-defined
import DataTable from './DataTable';
import OrganizationsDataTableEntry from './table_entries/OrganizationsDataTableEntry';
import {sortObjectArrayByField} from '../../../../utils/utils';

export default class OrganizationsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            organizations: [],
            sortedForward: true
        };
        // Event handlers
        this.handleOrderEntries = this.handleOrderEntries.bind(this);
    }

    componentDidMount() {
        let currentUserId;

        // TODO: change this workaround after a solidified position is made on admins in orgs
        Promise.all([
            this.props.restClient.user.getCurrentUser(),
            this.props.restClient.organizations.getAllOrganizations()
        ])
            .then(([currentUser, allOrganizations]) => {
                currentUserId = currentUser._id;
                let organizations = currentUser.orgs.map(organizationName => {
                    return {name: organizationName};
                });

                // Also adds the organizations user is an admin of (to even view the project in the list)
                allOrganizations.forEach(oneOrganization => {
                    let isAdmin = oneOrganization.admins.indexOf(currentUserId) !== -1,
                        inListAlready = organizations.indexOf(oneOrganization._id) === -1;

                    if (isAdmin && !inListAlready) {
                        organizations.push({
                            name: oneOrganization._id
                        });
                    }
                });

                this.setState({
                    organizations: organizations
                });

            });
    }

    handleOrderEntries(event) {
        // Release focus (surrounding box)
        $(event.target).parent().blur();

        this.setState({
            organizations: this.state.sortedForward ?
                this.state.organizations.sort(sortObjectArrayByField('name')).reverse() :
                this.state.organizations.sort(sortObjectArrayByField('name')),
            sortedForward: !this.state.sortedForward
        });
    }

    render() {

        let categories = [
            {id: 1, name: 'Organization Name'}
        ];

        return (
            <div className="box">

                {/* Header */}
                <div className="box-header" style={{paddingBottom: 0}}>
                    <h3 className="box-title" style={{fontSize: 28}}>
                        <i className="fa fa-cube"/> {` Organizations`}
                    </h3>
                </div>

                {/* Body */}
                <DataTable basePath={this.props.basePath}
                           categories={categories}
                           entries={this.state.organizations}
                           iconClass="fa fa-institution"
                           orderEntries={this.handleOrderEntries}
                           restClient={this.restClient}
                           sortable={true}
                           sortedForward={this.state.sortedForward}
                           tableName="Organizations">
                    <OrganizationsDataTableEntry/>
                </DataTable>

            </div>
        );
    }
}

