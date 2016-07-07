/**
 * Individual organization page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Self defined
import OrganizationAuthorizationWidget from '../widgets/authorization_widget/OrganizationAuthorizationWidget';
import OrganizationTable from '../widgets/data_tables/OrganizationTable';
import { canUserAuthorize } from '../../../../client/utils/restUtils';
import { fetchOrganizationsIfNeeded } from '../../../actions/organizations';
import { fetchUserIfNeeded } from '../../../actions/user';

export default class OrganizationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            display: 1 // 1 - members, 2 - admins
        };
        // Event Handlers
        this.handleTableSwitch = this.handleTableSwitch.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchOrganizationsIfNeeded());
        dispatch(fetchUserIfNeeded());
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch } = nextProps;

        dispatch(fetchOrganizationsIfNeeded());
        dispatch(fetchUserIfNeeded());
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

        const { authorization } = this.props;

        return (

            <section className="content">
                {/* <h3> {this.props.params.organizationId} </h3> */}

                <OrganizationTable authorization={authorization}
                                   display={this.state.display}
                                   handleTableSwitch={this.handleTableSwitch}
                                   organizationId={this.props.params.organizationId}
                                   ownerId={this.props.params.ownerId}
                                   restClient={this.props.restClient}/>

                <OrganizationAuthorizationWidget authorization={authorization}
                                                 display={this.state.display}
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

    let authorization = canUserAuthorize(user, organizations, ownerId);

    return {
        authorization
    };
};

export default connect(mapStateToProps)(OrganizationPage);
