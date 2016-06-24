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
import {sortObjectArrayByField} from '../../../../utils/utils';
import {verifyUserOrOrganizationId} from '../../../../utils/loginUtils';

const STYLE = {
    createOrganizationModal: {
        paddingTop: "50%",
        marginTop: "50%"
    },
    modalDialog: {
        position: "absolute",
        top: "15%",
        left: "40%"
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
            newOrganizationName: '',
            organizations: [],
            showCreateOrganizationModal: false,
            sortedForward: true,
            validOrganizationName: true
        };
        // Data retrieval
        this.retrieveOrganizations = this.retrieveOrganizations.bind(this);
        // Event handlers
        this.checkOrganizationName = this.checkOrganizationName.bind(this);
        this.closeCreateOrganization = this.closeCreateOrganization.bind(this);
        this.onCreateOrganizationNameChange = this.onCreateOrganizationNameChange.bind(this);
        this.openCreateOrganization = this.openCreateOrganization.bind(this);
        this.handleCreateOrganization = this.handleCreateOrganization.bind(this);
        this.handleOrderEntries = this.handleOrderEntries.bind(this);
    }

    componentDidMount() {
        this.retrieveOrganizations();
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
                    organizations: organizations
                });

            });
    }

    checkOrganizationName() {
        this.setState({
            validOrganizationName: verifyUserOrOrganizationId(this.state.newOrganizationName)
        });
    }

    closeCreateOrganization() {
        this.setState({
            showCreateOrganizationModal: false,
            newOrganizationName: ''
        });
    }

    onCreateOrganizationNameChange(event) {
        this.setState({
            newOrganizationName: event.target.value
        });
    }

    openCreateOrganization() {
        Promise.resolve(this.setState({
            showCreateOrganizationModal: true
        }))
            .then(() => {
                Object.keys(STYLE.modalDialog).forEach(property => {
                    $('.modal-dialog')[0].style[property] = STYLE.modalDialog[property];
                });
            });
    }

    handleCreateOrganization() {
        Promise.resolve(this.checkOrganizationName())
            .then(() => {
                if (this.state.validOrganizationName) {
                    this.props.restClient.organizations.createOrganization(this.state.newOrganizationName)
                        .then(() => {
                            this.setState({
                                showCreateOrganizationModal: false,
                                newOrganizationName: ''
                            });
                            this.retrieveOrganizations();
                        })
                        .catch(err => {
                            console.error(err); // eslint-disable-line no-console
                        });
                }
            });
    }

    handleOrderEntries(event) {
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
                <div className="box-header" style={{paddingBottom: 0}}>
                    <h3 className="box-title" style={{fontSize: 28}}>
                        <i className="fa fa-institution"/> {` Organizations`}
                    </h3>

                    <div style={{float: "right"}}>
                        <Button bsStyle="info" onClick={this.openCreateOrganization}>
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
                           orderEntries={this.handleOrderEntries}
                           restClient={this.restClient}
                           sortable={true}
                           sortedForward={this.state.sortedForward}
                           tableName="Organizations">
                    <OrganizationsDataTableEntry/>
                </DataTable>

                {/* Create organization modal window */}
                <Modal onHide={this.closeCreateOrganization}
                       show={this.state.showCreateOrganizationModal}
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
                                onBlur={this.checkOrganizationName}
                                onInputChange={this.onCreateOrganizationNameChange}
                                indentStyle={STYLE.modalDialogTextField}
                                invalidMessage={"Organization name must only contain letters, numbers, and" +
                                                " the underscore and must be at least 3 characters long"}
                                valid={this.state.validOrganizationName}
                                value={this.state.newOrganizationName}
                                warning={!this.state.validOrganizationName}/>

                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={this.closeCreateOrganization}>
                            Cancel
                        </Button>
                        <Button bsStyle="success" onClick={this.handleCreateOrganization}>
                            Create
                        </Button>
                    </Modal.Footer>

                </Modal>
            </div>
        );
    }
}
