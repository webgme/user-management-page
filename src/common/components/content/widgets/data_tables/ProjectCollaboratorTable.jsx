/**
 * Container widget for the project collaborator table widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Self-defined
import DataTable from './DataTable';
import ProjectDataTableEntry from './table_entries/ProjectDataTableEntry';
import { sortObjectArrayByField} from '../../../../../client/utils/utils';
import { retrieveCollaborators } from '../../../../../client/utils/restUtils';
import { fetchOrganizations, fetchOrganizationsIfNeeded } from '../../../../actions/organizations';
import { fetchUsers, fetchUsersIfNeeded } from '../../../../actions/users';

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
        this.state = {
            organizationsSortedForward: true,
            usersSortedForward: true
        };
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
        let sortBy = FIELDS.ORGANIZATION[event.target.value];

        this.setState({
            organizationCollaborators: this.state.organizationsSortedForward ?
                this.state.organizationCollaborators.sort(sortObjectArrayByField(sortBy)).reverse() :
                this.state.organizationCollaborators.sort(sortObjectArrayByField(sortBy)),
            organizationsSortedForward: !this.state.organizationsSortedForward
        });
    }

    onOrderUserEntries(event) {
        let sortBy = FIELDS.USER[event.target.value];

        this.setState({
            userCollaborators: this.state.usersSortedForward ?
                this.state.userCollaborators.sort(sortObjectArrayByField(sortBy)).reverse() :
                this.state.userCollaborators.sort(sortObjectArrayByField(sortBy)),
            usersSortedForward: !this.state.usersSortedForward
        });
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

        const { collaborators } = this.props;

        let dataTableData = {
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
                               handleRevoke={this.onRevoke}
                               iconClass={null}
                               orderEntries={this.onOrderUserEntries}
                               ownerId={this.props.ownerId}
                               projectName={this.props.projectName}
                               showOtherTitle={true}
                               sortable={true}
                               sortedForward={true}
                               tableName="Collaborators">
                        <ProjectDataTableEntry authorization={this.props.authorization} />
                    </DataTable>

                    <DataTable categories={dataTableData.categories.organizations}
                               categoryStyle={{width: "50%"}}
                               content="Organizations"
                               entries={collaborators.organizationCollaborators}
                               handleRevoke={this.onRevoke}
                               iconClass={null}
                               orderEntries={this.onOrderOrganizationEntries}
                               ownerId={this.props.ownerId}
                               projectName={this.props.projectName}
                               showOtherTitle={true}
                               sortable={true}
                               sortedForward={this.state.organizationsSortedForward}
                               tableName="Collaborators">
                        <ProjectDataTableEntry authorization={this.props.authorization} />
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
    })
};

const mapStateToProps = (state, ownProps) => {
    const { organizations } = state.organizations;
    const orgsHasFetched = state.organizations.hasFetched;
    const { users } = state.users;
    const usersHasFetched = state.users.hasFetched;

    const { ownerId, projectName } = ownProps;
    const projectId = `${ownerId}+${projectName}`;

    // Retrieving collaborators
    let collaborators = {userCollaborators: [], organizationCollaborators: []};
    if (orgsHasFetched && usersHasFetched) {
        collaborators = retrieveCollaborators(organizations, users, projectId);
    }

    // Sorting collaborators
    collaborators.userCollaborators.sort(sortObjectArrayByField('name'));
    collaborators.organizationCollaborators.sort(sortObjectArrayByField('name'));

    return {
        collaborators
    };
};

export default connect(mapStateToProps)(ProjectCollaboratorTable);
