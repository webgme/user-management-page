/**
 * Container widget for the project collaborator table widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Self-defined
import DataTable from '../../../../../components/content/widgets/data_tables/DataTable';
import ProjectDataTableEntry from '../../../../../components/content/widgets/data_tables/table_entries/ProjectDataTableEntry'; // eslint-disable-line max-len
import { sortWithChecks } from '../../../../../../client/utils/utils';
import { retrieveCollaborators } from '../../../../../../client/utils/restUtils';
import { fetchOrganizations, fetchOrganizationsIfNeeded } from '../../../../../actions/organizations';
import { fetchUsers, fetchUsersIfNeeded } from '../../../../../actions/users';
import { sortBy } from '../../../../../actions/tables';

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

class ProjectCollaboratorTable extends Component {

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
        const newSortCategory = FIELDS.ORGANIZATION[event.target.value];

        dispatch(sortBy('projectOrg', newSortCategory));
    }

    onOrderUserEntries(event) {
        const { dispatch } = this.props;
        const newSortCategory = FIELDS.USER[event.target.value];

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

const mapStateToProps = (state, ownProps) => {
    const { organizations } = state.organizations;
    const { users } = state.users;

    const { ownerId, projectName } = ownProps;
    const projectId = `${ownerId}+${projectName}`;

    // Retrieving collaborators
    let collaborators = retrieveCollaborators(organizations, users, projectId);

    // Sorting collaborators
    const userSortCategory = state.tables.projectUser.sortCategory;
    const userSortedForward = state.tables.projectUser.sortedForward;
    const orgSortCategory = state.tables.projectOrg.sortCategory;
    const orgSortedForward = state.tables.projectOrg.sortedForward;

    collaborators = {
        userCollaborators: sortWithChecks(collaborators.userCollaborators, userSortCategory, userSortedForward),
        organizationCollaborators: sortWithChecks(collaborators.organizationCollaborators, orgSortCategory, orgSortedForward) // eslint-disable-line max-len
    };

    return {
        collaborators,
        orgSortedForward,
        userSortedForward
    };
};

export default connect(mapStateToProps)(ProjectCollaboratorTable);
