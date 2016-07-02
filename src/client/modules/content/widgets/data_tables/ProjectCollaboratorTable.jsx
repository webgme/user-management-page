/**
 * Container widget for the project collaborator table widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';
// Self-defined
import DataTable from './DataTable';
import ProjectDataTableEntry from './table_entries/ProjectDataTableEntry';
import {isEmpty, sortObjectArrayByField} from '../../../../utils/utils';

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

export default class ProjectCollaboratorTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            organizationCollaborators: [],
            organizationsSortedForward: true,
            userCollaborators: [],
            usersSortedForward: true
        };

        // Data retrieval
        this.retrieveCollaborators = this.retrieveCollaborators.bind(this);
        // Event handlers
        this.onOrderOrganizationEntries = this.onOrderOrganizationEntries.bind(this);
        this.onOrderUserEntries = this.onOrderUserEntries.bind(this);
        this.onRevoke = this.onRevoke.bind(this);
    }

    componentDidMount() {
        this.retrieveCollaborators();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.refreshTable !== this.props.refreshTable) {
            this.retrieveCollaborators();
        }
    }

    retrieveCollaborators() {
        let projectId = `${this.props.ownerId}+${this.props.projectName}`;

        Promise.all([
            this.props.restClient.users.getUsersWithAccessToProject(projectId),
            this.props.restClient.organizations.getUsersInOrganizationsWithAccessToProject(projectId),
            this.props.restClient.organizations.getOrganizationsWithAccessToProject(projectId)
        ]).then(([usersWithAccess, usersInOrganizationsWithAccess, organizationsWithAccess]) => {

            // Union of rights if in organization
            if (isEmpty(usersInOrganizationsWithAccess)) {
                // Do nothing because then usersWithAccess is just self and does not need to be modified
            } else {
                Object.keys(usersInOrganizationsWithAccess).forEach(user => {
                    if (usersWithAccess[user]) {
                        usersWithAccess[user].read = usersWithAccess[user].read || usersInOrganizationsWithAccess[user].read; // eslint-disable-line max-len
                        usersWithAccess[user].write = usersWithAccess[user].write || usersInOrganizationsWithAccess[user].write; // eslint-disable-line max-len
                        usersWithAccess[user].delete = usersWithAccess[user].delete || usersInOrganizationsWithAccess[user].delete; // eslint-disable-line max-len
                        usersWithAccess[user].orgsRightsOrigin = usersInOrganizationsWithAccess[user].orgsRightsOrigin;
                    } else {
                        usersWithAccess[user] = JSON.parse(JSON.stringify(usersInOrganizationsWithAccess[user]));
                    }
                });
            }

            let userCollaborators = [];
            let organizationCollaborators = [];
            Object.keys(usersWithAccess).forEach(user => {
                userCollaborators.push({
                    inOrg: usersWithAccess[user].inOrg,
                    name: user,
                    orgsRightsOrigin: usersWithAccess[user].orgsRightsOrigin,
                    rights: usersWithAccess[user].delete ? 'Read Write Delete' :
                            usersWithAccess[user].write ? 'Read Write' :
                            usersWithAccess[user].read ? 'Read' : '',
                    userRightsOrigin: usersWithAccess[user].userRightsOrigin
                });
            });

            Object.keys(organizationsWithAccess).forEach(organization => {
                organizationCollaborators.push({
                    inOrg: organizationsWithAccess[organization].inOrg,
                    isOrg: true,
                    name: organization,
                    orgsRightsOrigin: organizationsWithAccess[organization].orgsRightsOrigin,
                    rights: organizationsWithAccess[organization].delete ? 'Read Write Delete' :
                            organizationsWithAccess[organization].write ? 'Read Write' :
                            organizationsWithAccess[organization].read ? 'Read' : ''
                });
            });

            this.setState({
                userCollaborators: userCollaborators.sort(sortObjectArrayByField('name')),
                organizationCollaborators: organizationCollaborators.sort(sortObjectArrayByField('name'))
            });

        });
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
        this.props.restClient.projects.removeRightsToProject(this.props.ownerId,
                                                             this.props.projectName,
                                                             event.target.id)
            .then(() => {
                this.retrieveCollaborators(); // Re-render after revoking rights
            });
    }

    render() {

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
                               display={this.state.display}
                               entries={this.state.userCollaborators}
                               handleRevoke={this.onRevoke}
                               iconClass={null}
                               orderEntries={this.onOrderUserEntries}
                               ownerId={this.props.ownerId}
                               projectName={this.props.projectName}
                               restClient={this.props.restClient}
                               showOtherTitle={true}
                               sortable={true}
                               sortedForward={this.state.usersSortedForward}
                               tableName="Collaborators">
                        <ProjectDataTableEntry/>
                    </DataTable>

                    <DataTable categories={dataTableData.categories.organizations}
                               categoryStyle={{width: "50%"}}
                               content="Organizations"
                               display={this.state.display}
                               entries={this.state.organizationCollaborators}
                               handleRevoke={this.onRevoke}
                               iconClass={null}
                               orderEntries={this.onOrderOrganizationEntries}
                               ownerId={this.props.ownerId}
                               projectName={this.props.projectName}
                               restClient={this.props.restClient}
                               showOtherTitle={true}
                               sortable={true}
                               sortedForward={this.state.organizationsSortedForward}
                               tableName="Collaborators">
                        <ProjectDataTableEntry/>
                    </DataTable>

                </div>

            </div>
        );
    }
}

