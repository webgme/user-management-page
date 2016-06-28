/* global $ */

/**
 * Container widget for the single organization table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import React from 'react/lib/React';
// Self-defined
import DataTable from './DataTable';
import OrganizationDataTableEntry from './table_entries/OrganizationDataTableEntry';
import {isEmpty, sortObjectArrayByField} from '../../../../utils/utils';

export default class OrganizationTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            admins: [],
            members: [],
            sortedForward: true
        };

        // Data retrieval
        this.retrieveMembersAndAdmins = this.retrieveMembersAndAdmins.bind(this);
        // Event handlers
        this.handleOrderEntries = this.handleOrderEntries.bind(this);
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
        this.props.restClient.organizations.getOrganization(this.props.organizationId)
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

    handleOrderEntries(event) {
        // Release focus (surrounding box)
        $(event.target).parent().blur();

        if (this.props.display === 1) {
            this.setState({
                members: this.state.sortedForward ?
                    this.state.members.sort(sortObjectArrayByField('name')).reverse() :
                    this.state.members.sort(sortObjectArrayByField('name')),
                sortedForward: !this.state.sortedForward
            });
        } else {
            this.setState({
                admins: this.state.sortedForward ?
                    this.state.admins.sort(sortObjectArrayByField('name')).reverse() :
                    this.state.admins.sort(sortObjectArrayByField('name')),
                sortedForward: !this.state.sortedForward
            });
        }
    }

    render() {

        let dataTableData = {
            categories: {
                members: [
                    {id: 1, name: 'Member Name'},
                    {id: 2, name: 'Admin'}
                ],
                admins: [
                    {id: 1, name: 'Admin Name'}
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
                    <ButtonGroup style={{float: "right"}}>
                        <Button bsStyle={this.props.display === 1 ? "primary" : null}
                                onClick={this.props.handleTableSwitch}
                                id="or">Members</Button>
                        <Button bsStyle={this.props.display === 2 ? "primary" : null}
                                onClick={this.props.handleTableSwitch}
                                id="ow">Admins</Button>
                    </ButtonGroup>
                </div>

                {this.props.display === 1 ?
                <DataTable categories={dataTableData.categories.members}
                           display={this.props.display}
                           entries={this.state.members}
                           iconClass="fa fa-university"
                           sortedForward={this.state.sortedForward}
                           orderEntries={this.handleOrderEntries}
                           ownerId={this.props.ownerId}
                           projectName={this.props.projectName}
                           restClient={this.props.restClient}
                           sortable={true}
                           tableName="Members">
                    <OrganizationDataTableEntry/>
                </DataTable> :
                <DataTable categories={dataTableData.categories.admins}
                           display={this.props.display}
                           entries={this.state.admins}
                           iconClass="fa fa-university"
                           orderEntries={this.handleOrderEntries}
                           ownerId={this.props.ownerId}
                           projectName={this.props.projectName}
                           restClient={this.props.restClient}
                           sortable={true}
                           sortedForward={this.state.sortedForward}
                           tableName="Admins">
                    <OrganizationDataTableEntry/>
                </DataTable>}

            </div>

        </div>
        );
    }
}

