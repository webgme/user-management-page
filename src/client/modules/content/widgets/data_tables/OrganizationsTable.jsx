/**
 * Container widget for the organizations table widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

/* global $ */

// Libraries
import React from 'react/lib/React';
// Self-defined
import DataTable from './DataTable';
import OrganizationsDataTableEntry from './table_entries/OrganizationsDataTableEntry';
import {sortObjectArrayByField} from '../../../../utils/utils';

export default class ProjectsTable extends React.Component {

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

    handleOrderEntries(event) {
        // Release focus (surrounding box)
        $(event.target).parent().blur();

        this.setState({
            projects: this.state.sortedForward ?
                this.state.projects.sort(sortObjectArrayByField('name')).reverse() :
                this.state.projects.sort(sortObjectArrayByField('name')),
            sortedForward: !this.state.sortedForward
        });
    }

    render() {

        let categories = [
            {id: 1, name: 'Organization Name:'}
        ];

        return (
            <div className="box">

                {/* Header */}
                <div className="box-header" style={{paddingBottom: 0}}>
                    <h3 className="box-title" style={{fontSize: 28}}>
                        <i className="fa fa-cube"/> {` Projects`}
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

