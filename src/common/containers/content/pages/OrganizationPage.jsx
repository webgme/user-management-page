/**
 * Individual organization page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self defined
import OrganizationPage from '../../../components/content/pages/OrganizationPage';
import { canUserAuthorize } from '../../../../client/utils/restUtils';

const mapStateToProps = (state, ownProps) => {
    const { organizations } = state.organizations;
    const { user } = state.user;
    const { ownerId } = ownProps.params;

    const canAuthorize = canUserAuthorize(user, organizations, ownerId);

    return {
        canAuthorize
    };
};

export default connect(mapStateToProps)(OrganizationPage);
