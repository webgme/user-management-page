/* global $ */

/**
 * Organizations page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';
// Self defined
import OrganizationsDataTable from '../widgets/data_tables/OrganizationsTable';
import {verifyUserOrOrganizationId} from '../../../utils/loginUtils';

const STYLE = {
    modalDialog: {
        position: "absolute",
        top: "15%",
        left: "40%"
    }
};

export default class OrganizationsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            createOrganizationInvalidMessage: 'Organization name must only contain letters, numbers, and' +
                                              ' the underscore and must be at least 3 characters long',
            newOrganizationName: '',
            refreshTable: false,
            showCreateOrganizationModal: false,
            validOrganizationName: true
        };
        // Event handlers
        this.checkOrganizationName = this.checkOrganizationName.bind(this);
        this.closeCreateOrganization = this.closeCreateOrganization.bind(this);
        this.createOrganization = this.createOrganization.bind(this);
        this.onCreateOrganizationNameChange = this.onCreateOrganizationNameChange.bind(this);
        this.openCreateOrganization = this.openCreateOrganization.bind(this);
        this.refreshTable = this.refreshTable.bind(this);
    }

    checkOrganizationName() {
        this.setState({
            validOrganizationName: verifyUserOrOrganizationId(this.state.newOrganizationName)
        });
    }

    closeCreateOrganization() {
        this.setState({
            newOrganizationName: '',
            showCreateOrganizationModal: false,
            validOrganizationName: true
        });
    }

    createOrganization() {
        Promise.resolve(this.checkOrganizationName())
            .then(() => {
                if (this.state.validOrganizationName) {
                    this.props.restClient.organizations.createOrganization(this.state.newOrganizationName)
                        .then(() => {
                            this.setState({
                                newOrganizationName: '',
                                refreshTable: !this.state.refreshTable,
                                showCreateOrganizationModal: false
                            });
                        })
                        .catch(err => {
                            if (err.status === 400) {
                                this.setState({
                                    createOrganizationInvalidMessage: 'Name already taken',
                                    validOrganizationName: false
                                });
                            }
                            console.error(err); // eslint-disable-line no-console
                        });
                }
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

    refreshTable() {
        this.setState({
            refreshTable: !this.state.refreshTable
        });
    }

    render() {
        return <section className="content">

            <div className="box box-primary">

                <OrganizationsDataTable basePath={this.props.basePath}
                                        checkOrganizationName={this.checkOrganizationName}
                                        closeCreateOrganization={this.closeCreateOrganization}
                                        createOrganization={this.createOrganization}
                                        createOrganizationInvalidMessage={this.state.createOrganizationInvalidMessage}
                                        newOrganizationName={this.state.newOrganizationName}
                                        onCreateOrganizationNameChange={this.onCreateOrganizationNameChange}
                                        openCreateOrganization={this.openCreateOrganization}
                                        refreshTable={this.state.refreshTable}
                                        restClient={this.props.restClient}
                                        showCreateOrganizationModal={this.state.showCreateOrganizationModal}
                                        validOrganizationName={this.state.validOrganizationName}/>

            </div>

        </section>;
    }

}
