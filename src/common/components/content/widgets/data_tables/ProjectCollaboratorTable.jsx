/**
 * Container widget for the project collaborator table widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
// Self-defined
import DataTable from '../../../../containers/content/widgets/data_tables/DataTable';
import ProjectDataTableEntry from './table_entries/ProjectDataTableEntry';
import { fetchOrganizations, fetchOrganizationsIfNeeded } from '../../../../actions/organizations';
import { fetchUsers, fetchUsersIfNeeded } from '../../../../actions/users';

export default class ProjectCollaboratorTable extends Component {

    constructor(props) {
        super(props);
        // Event handlers
        this.onRevoke = this.onRevoke.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchOrganizationsIfNeeded());
        dispatch(fetchUsersIfNeeded());
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
        const { canAuthorize, collaborators, ownerId, projectName } = this.props;

        const dataTableData = {
            categories: {
                users: [
                    {id: 1, name: 'User'},
                    {id: 2, name: 'Access'}
                ],
                organizations: [
                    {id: 1, name: 'Organization'},
                    {id: 2, name: 'Access'}
                ]
            }
        };

        return (
            <div>
                {/* Users collaborators table */}
                <div className="box">

                    {/* Self-defined header */}
                    <div className="box-header" style={{paddingBottom: 0}}>
                        <h3 className="box-title" style={{fontSize: 18}}>
                            <i className={this.props.iconClass}/> {` Collaborators`}
                        </h3>
                    </div>

                    <DataTable categories={dataTableData.categories.users}
                               categoryStyle={{width: "50%"}}
                               content="Users"
                               entries={collaborators.userCollaborators}
                               orderEntries={this.onOrderUserEntries}
                               reducerTableName="projectUser"
                               sortable={true}>
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
                               reducerTableName="projectOrg"
                               sortable={true}>
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
