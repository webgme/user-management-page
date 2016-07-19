/**
 * Individual organization page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
// Self defined
import OrganizationAuthorizationWidget from
    '../../../containers/content/widgets/authorization_widget/OrganizationAuthorizationWidget';
import OrganizationTable from '../../../containers/content/widgets/data_tables/OrganizationTable';
import { fetchOrganizationsIfNeeded } from '../../../actions/organizations';
import { fetchUserIfNeeded } from '../../../actions/user';

export default class OrganizationPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchOrganizationsIfNeeded());
        dispatch(fetchUserIfNeeded());
    }

    render() {
        const { canAuthorize } = this.props;

        return (

            <section className="content">
                {/* <h3> {this.props.params.organizationId} </h3> */}

                <div className="box box-primary">
                    <OrganizationTable organizationId={this.props.params.organizationId}
                                       ownerId={this.props.params.ownerId}
                                       restClient={this.props.restClient}/>
                </div>

                <OrganizationAuthorizationWidget canAuthorize={canAuthorize}
                                                 organizationId={this.props.params.organizationId}
                                                 restClient={this.props.restClient}/>

            </section>
        );
    }

}

OrganizationPage.propTypes = {
    canAuthorize: PropTypes.bool.isRequired,
    params: PropTypes.shape({
        organizationId: React.PropTypes.string.isRequired
    })
};
