/**
 * Container widget for the collaborators table widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';
// Self-defined
import DataTable from './DataTable';
import ProjectCollaboratorTableHeader from './table_headers/ProjectCollaboratorTableHeader';
import ProjectDataTableEntry from './table_entries/ProjectDataTableEntry';
import {isEmpty, sortObjectArrayByField} from '../../../../utils/utils';

export default class ProjectCollaboratorTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display: 1, // 1 indicates users entries, 2 indicates organizations entries
            numTimesClicked: 0,
            organizationCollaborators: [],
            userCollaborators: []
        };

        // Data retrieval
        this.retrieveCollaborators = this.retrieveCollaborators.bind(this);
        // Event handlers
        this.handleOrderEntries = this.handleOrderEntries.bind(this);
        this.handleRevoke = this.handleRevoke.bind(this);
        this.handleTableSwitch = this.handleTableSwitch.bind(this);
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
        let didUserRemoveSelfWhenOnlyCollaborator = false;
        let projectId = `${this.props.ownerId}+${this.props.projectName}`;

        Promise.all([
            this.props.restClient.users.getUsersWithAccessToProject(projectId),
            this.props.restClient.organizations.getUsersInOrganizationsWithAccessToProject(projectId),
            this.props.restClient.organizations.getOrganizationsWithAccessToProject(projectId)
        ]).then(([usersWithAccess, usersInOrganizationsWithAccess, organizationsWithAccess]) => {

            // Union of rights if in organization
            if (!isEmpty(usersInOrganizationsWithAccess)) {
                Object.keys(usersInOrganizationsWithAccess).forEach(oneUser => {
                    if (usersWithAccess[oneUser]) {
                        usersWithAccess[oneUser].read = usersWithAccess[oneUser].read || usersInOrganizationsWithAccess[oneUser].read; // eslint-disable-line max-len
                        usersWithAccess[oneUser].write = usersWithAccess[oneUser].write || usersInOrganizationsWithAccess[oneUser].write; // eslint-disable-line max-len
                        usersWithAccess[oneUser].delete = usersWithAccess[oneUser].delete || usersInOrganizationsWithAccess[oneUser].delete; // eslint-disable-line max-len
                    } else {
                        usersWithAccess[oneUser] = JSON.parse(JSON.stringify(usersInOrganizationsWithAccess[oneUser]));
                    }
                });
            } else if (isEmpty(usersWithAccess)) { // Case for when project is not owned by any organizations
                didUserRemoveSelfWhenOnlyCollaborator = true;
                this.props.router.replace(`${this.props.routes[0].basePath}projects`);
            } else {
                // Do nothing because then usersWithAccess is just self and does not need to be modified
            }

            if (!didUserRemoveSelfWhenOnlyCollaborator) {
                let userCollaborators = [];
                let organizationCollaborators = [];
                Object.keys(usersWithAccess).forEach(user => {
                    userCollaborators.push({
                        name: user,
                        read: usersWithAccess[user].read,
                        write: usersWithAccess[user].write,
                        delete: usersWithAccess[user].delete,
                        inOrg: usersWithAccess[user].inOrg
                    });
                });

                Object.keys(organizationsWithAccess).forEach(organization => {
                    organizationCollaborators.push({
                        name: organization,
                        read: organizationsWithAccess[organization].read,
                        write: organizationsWithAccess[organization].write,
                        delete: organizationsWithAccess[organization].delete,
                        inOrg: organizationsWithAccess[organization].inOrg
                    });
                });

                this.setState({
                    userCollaborators: userCollaborators.sort(sortObjectArrayByField('name')),
                    organizationCollaborators: organizationCollaborators.sort(sortObjectArrayByField('name'))
                });
            }

        });
    }

    handleOrderEntries() {
        if (this.state.display === 1) {
            this.setState({
                userCollaborators: this.state.numTimesClicked % 2 === 0 ?
                    this.state.userCollaborators.sort(sortObjectArrayByField('name')).reverse() :
                    this.state.userCollaborators.sort(sortObjectArrayByField('name')),
                numTimesClicked: this.state.numTimesClicked + 1
            });
        } else {
            this.setState({
                organizationCollaborators: this.state.numTimesClicked % 2 === 0 ?
                    this.state.organizationCollaborators.sort(sortObjectArrayByField('name')).reverse() :
                    this.state.organizationCollaborators.sort(sortObjectArrayByField('name')),
                numTimesClicked: this.state.numTimesClicked + 1
            });
        }
    }

    handleRevoke(event) {
        this.props.restClient.projects.removeRightsToProject(this.props.ownerId,
            this.props.projectName,
            event.target.id)
            .then(() => {
                this.retrieveCollaborators(); // Re-render after revoking rights
            });
    }

    handleTableSwitch(event) {
        let newDisplayNum = event.target.innerHTML === 'Users' ? 1 : 2;

        if (newDisplayNum !== this.state.display) {
            this.setState({
                display: newDisplayNum
            });
        }
    }

    render() {

        let dataTableData = {
            categories: {
                users: [
                    {id: 1, name: 'UserID:'},
                    {id: 2, name: 'Rights (RWD)'}
                ],
                organizations: [
                    {id: 1, name: 'OrganizationID:'},
                    {id: 2, name: 'Rights(RWD)'}
                ]
            }
        };

        return (
            <div>

                <DataTable categories={dataTableData.categories.users}
                           display={this.state.display}
                           dualTable={dataTableData.dualTable}
                           entries={this.state.userCollaborators}
                           handleRevoke={this.handleRevoke}
                           handleTableSwitch={this.handleTableSwitch}
                           iconClass={null}
                           numTimesClicked={this.state.numTimesClicked}
                           orderEntries={this.handleOrderEntries}
                           ownerId={this.props.ownerId}
                           projectName={this.props.projectName}
                           restClient={this.props.restClient}
                           sortable={true}
                           style={this.state.display === 2 ? {display: "none"} : {}}
                           TableHeader={<ProjectCollaboratorTableHeader/>}
                           tableName="Collaborators">
                    <ProjectDataTableEntry/>
                </DataTable>

                <DataTable categories={dataTableData.categories.organizations}
                           display={this.state.display}
                           dualTable={dataTableData.dualTable}
                           entries={this.state.organizationCollaborators}
                           handleRevoke={this.handleRevoke}
                           handleTableSwitch={this.handleTableSwitch}
                           iconClass={null}
                           numTimesClicked={this.state.numTimesClicked}
                           orderEntries={this.handleOrderEntries}
                           ownerId={this.props.ownerId}
                           projectName={this.props.projectName}
                           restClient={this.props.restClient}
                           sortable={true}
                           style={this.state.display === 1 ? {display: "none"} : {}}
                           TableHeader={<ProjectCollaboratorTableHeader/>}
                           tableName="Collaborators">
                    <ProjectDataTableEntry/>
                </DataTable>

            </div>
        );
    }
}

