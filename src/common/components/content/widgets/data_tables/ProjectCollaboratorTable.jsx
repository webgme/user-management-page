/**
 * Container widget for the project collaborator table widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
// Self-defined
import DataTable from './DataTable';
import ProjectDataTableEntry from './table_entries/ProjectDataTableEntry';
import { fetchOrganizations, fetchOrganizationsIfNeeded } from '../../../../actions/organizations';
import { fetchUsers, fetchUsersIfNeeded } from '../../../../actions/users';
import { sortBy } from '../../../../actions/tables';

const FIELDS = {
    USER: {
        "Rights (RWD)": "rights",
        "UserID": "name"
    },
    ORGANIZATION: {
        "OrganizationID": "name",
        "Rights (RWD)": "rights"
    }
};

export default class ProjectCollaboratorTable extends Component {

    constructor(props) {
        super(props);
        // Event handlers
        this.onOrderOrganizationEntries = this.onOrderOrganizationEntries.bind(this);
        this.onOrderUserEntries = this.onOrderUserEntries.bind(this);
        this.onRevoke = this.onRevoke.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchOrganizationsIfNeeded());
        dispatch(fetchUsersIfNeeded());
    }

    onOrderOrganizationEntries(event) {
        const { dispatch } = this.props;
        const newSortCategory = FIELDS.ORGANIZATION[event.target.innerHTML];

        dispatch(sortBy('projectOrg', newSortCategory));
    }

    onOrderUserEntries(event) {
        const { dispatch } = this.props;
        const newSortCategory = FIELDS.USER[event.target.innerHTML];

        dispatch(sortBy('projectUser', newSortCategory));
    }

    onRevoke(event) {
        const { dispatch } = this.props;

        this.props.restClient.projects.removeRightsToProject(this.props.ownerId,
                                                             this.props.projectName,
                                                             event.target.id)
            .then(() => {
                dispatch(fetchUsers()); // Re-render after revoking rights
                dispatch(fetchOrganizations()); // Re-render after revoking rights
            });
    }

    render() {
        const { collaborators, orgSortedForward, userSortedForward } = this.props;
        const { canAuthorize, ownerId, projectName } = this.props;

        const dataTableData = {
            categories: {
                users: [
                    {id: 1, name: 'UserID'},
                    {id: 2, name: 'Rights (RWD)'}
                ],
                organizations: [
                    {id: 1, name: 'OrganizationID'},
                    {id: 2, name: 'Rights (RWD)'}
                ]
            }
        };

        return (
            <div>
                {/* Users collaborators table */}
                <div className="box">

                    {/* Self-defined header */}
                    <div className="box-header" style={{paddingBottom: 0}}>
                        <h3 className="box-title" style={{fontSize: 28}}>
                            <i className={this.props.iconClass}/> {` Collaborators`}
                        </h3>
                    </div>

                    <DataTable categories={dataTableData.categories.users}
                               categoryStyle={{width: "50%"}}
                               content="Users"
                               entries={collaborators.userCollaborators}
                               orderEntries={this.onOrderUserEntries}
                               showOtherTitle={true}
                               sortable={true}
                               sortedForward={userSortedForward}>
                        <ProjectDataTableEntry canAuthorize={canAuthorize}
                                               handleRevoke={this.onRevoke}
                                               ownerId={ownerId}
                                               projectName={projectName} />
                    </DataTable>

                    <DataTable categories={dataTableData.categories.organizations}
                               categoryStyle={{width: "50%"}}
                               content="Organizations"
                               entries={collaborators.organizationCollaborators}
                               orderEntries={this.onOrderOrganizationEntries}
                               showOtherTitle={true}
                               sortable={true}
                               sortedForward={orgSortedForward}>
                        <ProjectDataTableEntry canAuthorize={canAuthorize}
                                               handleRevoke={this.onRevoke}
                                               ownerId={ownerId}
                                               projectName={projectName} />
                    </DataTable>

                </div>

            </div>
        );
    }
}

ProjectCollaboratorTable.propTypes = {
    collaborators: PropTypes.shape({
        userCollaborators: PropTypes.array.isRequired,
        organizationCollaborators: PropTypes.array.isRequired
    }),
    orgSortedForward: PropTypes.bool.isRequired,
    userSortedForward: PropTypes.bool.isRequired
};
