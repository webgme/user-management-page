/**
 * Individual organization page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';
import withRouter from 'react-router/lib/withRouter';
// Self defined
import OrganizationAuthorizationWidget from '../widgets/authorization_widget/OrganizationAuthorizationWidget';
import OrganizationTable from '../widgets/data_tables/OrganizationTable';

class OrganizationPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display: 1, // 1 - members, 2 - admins
            refreshTable: false
        };
        // Event Handlers
        this.refreshTable = this.refreshTable.bind(this);
        this.handleTableSwitch = this.handleTableSwitch.bind(this);
    }

    refreshTable() {
        this.setState({
            refreshTable: !this.state.refreshTable
        });
    }

    handleTableSwitch(event) {
        let newDisplayNum = event.target.innerHTML === 'Members' ? 1 : 2;

        if (newDisplayNum !== this.props.display) {
            this.setState({
                display: newDisplayNum
            });
        }
    }

    render() {

        return (

            <section className="content">
                {/* <h3> {this.props.params.organizationId} </h3> */}

                <OrganizationTable display={this.state.display}
                                   handleTableSwitch={this.handleTableSwitch}
                                   organizationId={this.props.params.organizationId}
                                   ownerId={this.props.params.ownerId}
                                   refreshTable={this.state.refreshTable}
                                   restClient={this.props.restClient}/>

                <OrganizationAuthorizationWidget display={this.state.display}
                                                 organizationId={this.props.params.organizationId}
                                                 refreshTable={this.refreshTable}
                                                 restClient={this.props.restClient}/>

            </section>
        );
    }

}

// Needs withRouter for component's context (router is contained in there)
export default withRouter(OrganizationPage);

OrganizationPage.propTypes = {
    params: React.PropTypes.shape({
        organizationId: React.PropTypes.string.isRequired
    })
};
