/* global $ */

/**
 * Organizations page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
// Self defined
import OrganizationsTable from '../../../containers/content/widgets/data_tables/OrganizationsTable';
import { verifyUserOrOrganizationId } from '../../../../client/utils/loginUtils';
import { fetchOrganizations } from '../../../actions/organizations';
import { fetchUser } from '../../../actions/user';
// Style
import { OrganizationsPage as STYLE } from '../../../../client/style';

export default class OrganizationsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createOrganizationInvalidMessage: 'Organization name must only contain letters, numbers, and' +
            ' the underscore and must be at least 3 characters long',
            newOrganizationName: '',
            showCreateOrganizationModal: false,
            validOrganizationName: true
        };
        // Event handlers
        this.checkOrganizationName = this.checkOrganizationName.bind(this);
        this.closeCreateOrganization = this.closeCreateOrganization.bind(this);
        this.createOrganization = this.createOrganization.bind(this);
        this.onCreateOrganizationNameChange = this.onCreateOrganizationNameChange.bind(this);
        this.openCreateOrganization = this.openCreateOrganization.bind(this);
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
        const { dispatch } = this.props;

        Promise.resolve(this.checkOrganizationName())
            .then(() => {
                if (this.state.validOrganizationName) {
                    this.props.restClient.organizations.createOrganization(this.state.newOrganizationName)
                        .then(() => {
                            this.setState({
                                newOrganizationName: '',
                                showCreateOrganizationModal: false
                            });
                            // Refresh table
                            dispatch(fetchOrganizations());
                            // Refresh user for user.orgs
                            dispatch(fetchUser());
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

    render() {
        return (
            <section className="content">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="box box-primary">
                            <OrganizationsTable checkOrganizationName={this.checkOrganizationName}
                                                closeCreateOrganization={this.closeCreateOrganization}
                                                createOrganization={this.createOrganization}
                                                createOrganizationInvalidMessage={this.state.createOrganizationInvalidMessage}
                                                newOrganizationName={this.state.newOrganizationName}
                                                onCreateOrganizationNameChange={this.onCreateOrganizationNameChange}
                                                openCreateOrganization={this.openCreateOrganization}
                                                showCreateOrganizationModal={this.state.showCreateOrganizationModal}
                                                validOrganizationName={this.state.validOrganizationName}/>

                        </div>
                    </div>
                </div>

            </section>
        );
    }

}
