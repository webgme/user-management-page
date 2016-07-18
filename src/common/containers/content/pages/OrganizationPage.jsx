/**
 * Individual organization page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Self defined
import OrganizationAuthorizationWidget from './widgets/authorization_widget/OrganizationAuthorizationWidget';
import OrganizationTable from './widgets/data_tables/OrganizationTable';
import { canUserAuthorize } from '../../../../client/utils/restUtils';
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
        const { authorization } = this.props;

        return (

            <section className="content">
                {/* <h3> {this.props.params.organizationId} </h3> */}

                <div className="box box-primary">
                    <OrganizationTable authorization={authorization}
                                       iconClass="fa fa-institution"
                                       organizationId={this.props.params.organizationId}
                                       ownerId={this.props.params.ownerId}
                                       restClient={this.props.restClient}/>
                </div>

                <OrganizationAuthorizationWidget authorization={authorization}
                                                 organizationId={this.props.params.organizationId}
                                                 restClient={this.props.restClient}/>

            </section>
        );
    }

}

OrganizationPage.propTypes = {
    authorization: PropTypes.bool.isRequired,
    params: PropTypes.shape({
        organizationId: React.PropTypes.string.isRequired
    })
};

const mapStateToProps = (state, ownProps) => {
    const { organizations } = state.organizations;
    const { user } = state.user;
    const { ownerId } = ownProps.params;

    const authorization = canUserAuthorize(user, organizations, ownerId);

    return {
        authorization
    };
};

export default connect(mapStateToProps)(OrganizationPage);
