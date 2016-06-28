/* global $ */

/**
 * Container widget for the organizations table widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import React from 'react/lib/React';
// Self-defined
import DataTable from './DataTable';
import LoginField from '../LoginField';
import OrganizationsDataTableEntry from './table_entries/OrganizationsDataTableEntry';
import {sortObjectArrayByField, THEME_COLORS} from '../../../../utils/utils';

const STYLE = {
    createOrganizationModal: {
        paddingTop: "50%",
        marginTop: "50%"
    },
    modalDialogTextField: {
        marginLeft: "15px",
        paddingRight: "15px"
    }
};

export default class OrganizationsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            organizations: [],
            sortedForward: true
        };
        // Data retrieval
        this.retrieveOrganizations = this.retrieveOrganizations.bind(this);
        // Event handlers
        this.onOrderEntries = this.onOrderEntries.bind(this);
    }

    componentDidMount() {
        this.retrieveOrganizations();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.refreshTable !== this.props.refreshTable) {
            this.retrieveOrganizations();
        }
    }

    retrieveOrganizations() {
        let currentUserId;

        // TODO: change this workaround after a solidified position is made on admins in orgs
        Promise.all([
            this.props.restClient.user.getCurrentUser(),
            this.props.restClient.organizations.getAllOrganizations()
        ])
            .then(([currentUser, allOrganizations]) => {
                currentUserId = currentUser._id;
                let organizations = currentUser.orgs.map(organizationName => {
                    return {name: organizationName};
                });

                // Also adds the organizations user is an admin of (to even view the project in the list)
                allOrganizations.forEach(oneOrganization => {
                    let isAdmin = oneOrganization.admins.indexOf(currentUserId) !== -1,
                        inListAlready = organizations.indexOf(oneOrganization._id) === -1;

                    if (isAdmin && !inListAlready) {
                        organizations.push({
                            name: oneOrganization._id
                        });
                    }
                });

                this.setState({
                    organizations: organizations.sort(sortObjectArrayByField('name'))
                });

            });
    }

    onOrderEntries(event) {
        // Release focus (surrounding box)
        $(event.target).parent().blur();

        this.setState({
            organizations: this.state.sortedForward ?
                this.state.organizations.sort(sortObjectArrayByField('name')).reverse() :
                this.state.organizations.sort(sortObjectArrayByField('name')),
            sortedForward: !this.state.sortedForward
        });
    }

    render() {

        let categories = [
            {id: 1, name: 'Organization Name'}
        ];

        return (
            <div className="box">

                {/* Header */}
                <div className="box-header"
                     style={{backgroundColor: THEME_COLORS[this.props.themeColor],
                             paddingBottom: "0px",
                             textAlign: "-webkit-center"}}>
                    <h3 className="box-title" style={{color: "white", fontSize: 28}}>
                        <i className="fa fa-institution"/> {` Organizations`}
                    </h3>

                    <div style={{float: "right"}}>
                        <Button bsStyle="info" onClick={this.props.openCreateOrganization}>
                            Create an organization
                        </Button>
                    </div>

                    <br/><br/>

                </div>

                {/* Body */}
                <DataTable basePath={this.props.basePath}
                           categories={categories}
                           entries={this.state.organizations}
                           iconClass="fa fa-institution"
                           orderEntries={this.onOrderEntries}
                           restClient={this.restClient}
                           sortable={true}
                           sortedForward={this.state.sortedForward}
                           tableName="Organizations">
                    <OrganizationsDataTableEntry/>
                </DataTable>

                {/* Create organization modal window */}
                <Modal onHide={this.props.closeCreateOrganization}
                       show={this.props.showCreateOrganizationModal}
                       style={STYLE.createOrganizationModal}>

                    <Modal.Header closeButton>
                        <Modal.Title>
                            <strong>Create an organization</strong>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <h4>Please enter the name of the organization you wish to create</h4>
                    </Modal.Body>

                    {/* Organization name */}
                    <LoginField hint="Organization Name"
                                iconClass="fa fa-institution"
                                onBlur={this.props.checkOrganizationName}
                                onInputChange={this.props.onCreateOrganizationNameChange}
                                indentStyle={STYLE.modalDialogTextField}
                                invalidMessage={"Organization name must only contain letters, numbers, and" +
                                                " the underscore and must be at least 3 characters long"}
                                valid={this.props.validOrganizationName}
                                value={this.props.newOrganizationName}
                                warning={!this.props.validOrganizationName}/>

                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={this.props.closeCreateOrganization}>
                            Cancel
                        </Button>
                        <Button bsStyle="success" onClick={this.props.createOrganization}>
                            Create
                        </Button>
                    </Modal.Footer>

                </Modal>
            </div>
        );
    }
}
