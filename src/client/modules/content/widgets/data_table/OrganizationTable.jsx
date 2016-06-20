/**
 * Container widget for the single organization table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';
// Self-defined
import DataTable from './DataTable';
import OrganizationDataTableEntry from './table_entries/OrganizationDataTableEntry';
import {isEmpty, sortObjectArrayByField} from '../../../../utils/utils';

export default class ProjectCollaboratorTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            admins: [],
            display: 1, // 1 indicates users entries, 2 indicates organizations entries
            members: [],
            numTimesClicked: 0
        };

        // Data retrieval
        this.retrieveMembersAndAdmins = this.retrieveMembersAndAdmins.bind(this);
        // Event handlers
        this.handleOrderEntries = this.handleOrderEntries.bind(this);
        this.handleTableSwitch = this.handleTableSwitch.bind(this);
    }

    componentDidMount() {
        this.retrieveMembersAndAdmins();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.refreshTable !== this.props.refreshTable) {
            this.retrieveMembersAndAdmins();
        }
    }

    retrieveMembersAndAdmins() {
        this.props.restClient.organizations.getOrganization(this.props.params.organizationId)
            .then(organizationData => {

                // When user removed self...
                if (isEmpty(organizationData.users)) {
                    this.props.router.replace(`${this.props.routes[0].basePath}organizations`);
                } else {
                    this.setState({
                        members: organizationData.users
                            .map(oneUser => {
                                return {
                                    name: oneUser,
                                    admin: organizationData.admins.indexOf(oneUser) !== -1
                                };
                            })
                            .sort(sortObjectArrayByField('name')),
                        admins: organizationData.admins
                            .map(oneAdmin => {
                                return {
                                    name: oneAdmin
                                };
                            })
                            .sort(sortObjectArrayByField('name'))
                    });
                }
            });
    }

    handleOrderEntries() {
        if (this.state.display === 1) {
            this.setState({
                members: this.state.numTimesClicked % 2 === 0 ?
                    this.state.members.sort(sortObjectArrayByField('name')).reverse() :
                    this.state.members.sort(sortObjectArrayByField('name')),
                numTimesClicked: this.state.numTimesClicked + 1
            });
        } else {
            this.setState({
                admins: this.state.numTimesClicked % 2 === 0 ?
                    this.state.admins.sort(sortObjectArrayByField('name')).reverse() :
                    this.state.admins.sort(sortObjectArrayByField('name')),
                numTimesClicked: this.state.numTimesClicked + 1
            });
        }
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
                members: [
                    {id: 1, name: 'Member Name:'},
                    {id: 2, name: 'Admin:'}
                ],
                admins: [
                    {id: 1, name: 'Admin Name:'}
                ]
            },
            dualTable: {
                show: true,
                options: ['Members', 'Admins']
            }
        };

        return (
            <div>
                <DataTable categories={dataTableData.categories.members}
                           display={this.state.display}
                           dualTable={dataTableData.dualTable}
                           entries={this.state.members}
                           handleTableSwitch={this.handleTableSwitch}
                           numTimesClicked={this.state.numTimesClicked}
                           orderEntries={this.handleOrderEntries}
                           ownerId={this.props.ownerId}
                           projectName={this.props.projectName}
                           restClient={this.props.restClient}
                           sortable={true}
                           style={this.state.display === 2 ? {display: "none"} : {}}
                           tableName="Collaborators">
                    <OrganizationDataTableEntry/>
                </DataTable>

                <DataTable categories={dataTableData.categories.admins}
                           display={this.state.display}
                           dualTable={dataTableData.dualTable}
                           entries={this.state.admins}
                           handleTableSwitch={this.handleTableSwitch}
                           numTimesClicked={this.state.numTimesClicked}
                           orderEntries={this.handleOrderEntries}
                           ownerId={this.props.ownerId}
                           projectName={this.props.projectName}
                           restClient={this.props.restClient}
                           sortable={true}
                           style={this.state.display === 1 ? {display: "none"} : {}}
                           tableIcon="cube"
                           tableName="Collaborators">
                    <OrganizationDataTableEntry/>
                </DataTable>
            </div>
        );
    }
}

