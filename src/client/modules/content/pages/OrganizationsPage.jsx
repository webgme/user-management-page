/**
 * Organizations page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';
// Self defined
import OrganizationsDataTable from '../widgets/data_tables/OrganizationsTable';
import {verifyUserOrOrganizationId} from '../../../utils/loginUtils';

export default class OrganizationsPage extends React.Component {

    constructor(props) {
        super(props);
    }
    //     this.checkOrganizationName = this.checkOrganizationName.bind(this);
    //     this.closeCreateOrganization = this.closeCreateOrganization.bind(this);
    //     this.onCreateOrganizationNameChange = this.onCreateOrganizationNameChange.bind(this);
    //     this.openCreateOrganization = this.openCreateOrganization.bind(this);
    //     this.handleCreateOrganization = this.handleCreateOrganization.bind(this);
    // }
    //
    // checkOrganizationName() {
    //     this.setState({
    //         validOrganizationName: verifyUserOrOrganizationId(this.state.newOrganizationName)
    //     });
    // }
    //
    // closeCreateOrganization() {
    //     this.setState({
    //         showCreateOrganizationModal: false,
    //         newOrganizationName: ''
    //     });
    // }
    //
    // onCreateOrganizationNameChange(event) {
    //     this.setState({
    //         newOrganizationName: event.target.value
    //     });
    // }
    //
    // openCreateOrganization() {
    //     Promise.resolve(this.setState({
    //         showCreateOrganizationModal: true
    //     }))
    //         .then(() => {
    //             Object.keys(STYLE.modalDialog).forEach(property => {
    //                 $('.modal-dialog')[0].style[property] = STYLE.modalDialog[property];
    //             });
    //         });
    // }
    //
    // handleCreateOrganization() {
    //     Promise.resolve(this.checkOrganizationName())
    //         .then(() => {
    //             if (this.state.validOrganizationName) {
    //                 console.log('Making rest call for:', this.state.newOrganizationName);
    //                 this.props.restClient.organizations.createOrganization(this.state.newOrganizationName)
    //                     .then(() => {
    //                         this.retrieveOrganizations();
    //                     })
    //                     .catch(err => {
    //                         console.error(err); // eslint-disable-line no-console
    //                     });
    //             }
    //         });
    // }

    render() {
        return <section className="content">

            <OrganizationsDataTable restClient={this.props.restClient}
                                    basePath={this.props.routes[0].basePath}/>

        </section>;
    }

}
