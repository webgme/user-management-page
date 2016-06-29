/* global $ */

/**
 * Container widget for the project collaborator table widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import React from 'react/lib/React';
// Self-defined
import DataTable from './DataTable';
import ProjectDataTableEntry from './table_entries/ProjectDataTableEntry';
import {isEmpty, sortObjectArrayByField} from '../../../../utils/utils';

export default class ProjectCollaboratorTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display: 1, // 1 indicates users entries, 2 indicates organizations entries
            organizationCollaborators: [],
            sortedForward: true,
            userCollaborators: []
        };

        // Data retrieval
        this.retrieveCollaborators = this.retrieveCollaborators.bind(this);
        // Event handlers
        this.onOrderEntries = this.onOrderEntries.bind(this);
        this.onRevoke = this.onRevoke.bind(this);
        this.onTableSwitch = this.onTableSwitch.bind(this);
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
                Object.keys(usersInOrganizationsWithAccess).forEach(oneUser => {
                    if (usersWithAccess[oneUser]) {
                        usersWithAccess[oneUser].read = usersWithAccess[oneUser].read || usersInOrganizationsWithAccess[oneUser].read; // eslint-disable-line max-len
                        usersWithAccess[oneUser].write = usersWithAccess[oneUser].write || usersInOrganizationsWithAccess[oneUser].write; // eslint-disable-line max-len
                        usersWithAccess[oneUser].delete = usersWithAccess[oneUser].delete || usersInOrganizationsWithAccess[oneUser].delete; // eslint-disable-line max-len
                    } else {
                        usersWithAccess[oneUser] = JSON.parse(JSON.stringify(usersInOrganizationsWithAccess[oneUser]));
                    }
                });
            }

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

        });
    }

    onOrderEntries(event) {
        // Release focus (surrounding box)
        $(event.target).parent().blur();

        if (this.state.display === 1) {
            this.setState({
                userCollaborators: this.state.sortedForward ?
                    this.state.userCollaborators.sort(sortObjectArrayByField('name')).reverse() :
                    this.state.userCollaborators.sort(sortObjectArrayByField('name')),
                sortedForward: !this.state.sortedForward
            });
        } else {
            this.setState({
                organizationCollaborators: this.state.sortedForward ?
                    this.state.organizationCollaborators.sort(sortObjectArrayByField('name')).reverse() :
                    this.state.organizationCollaborators.sort(sortObjectArrayByField('name')),
                sortedForward: !this.state.sortedForward
            });
        }
    }

    onRevoke(event) {
        this.props.restClient.projects.removeRightsToProject(this.props.ownerId,
            this.props.projectName,
            event.target.id)
            .then(() => {
                this.retrieveCollaborators(); // Re-render after revoking rights
            });
    }

    onTableSwitch(event) {
        let newDisplayNum = event.target.innerHTML === 'Users' ? 1 : 2;

        if (newDisplayNum !== this.state.display) {
            if (newDisplayNum === 1) {
                this.setState({
                    display: newDisplayNum,
                    sortedForward: true, // Also account for ordering
                    userCollaborators: this.state.userCollaborators.sort(sortObjectArrayByField('name'))
                });
            } else if (newDisplayNum === 2) {
                this.setState({
                    display: newDisplayNum,
                    organizationCollaborators: this.state.organizationCollaborators.sort(sortObjectArrayByField('name')), // eslint-disable-line max-len
                    sortedForward: true // Also account for ordering
                });
            }
        }
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
                    {id: 2, name: 'Rights(RWD)'}
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
                               orderEntries={this.onOrderEntries}
                               ownerId={this.props.ownerId}
                               projectName={this.props.projectName}
                               restClient={this.props.restClient}
                               sortable={true}
                               sortedForward={this.state.sortedForward}
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
                               orderEntries={this.onOrderEntries}
                               ownerId={this.props.ownerId}
                               projectName={this.props.projectName}
                               restClient={this.props.restClient}
                               sortable={true}
                               sortedForward={this.state.sortedForward}
                               tableName="Collaborators">
                        <ProjectDataTableEntry/>
                    </DataTable>

                </div>

            </div>
        );
    }
}

