/* global */

/**
 * Container widget for the single organization table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import OrganizationTable from
    '../../../../components/content/widgets/data_tables/OrganizationTable';
import { retrieveMembersAndAdmins } from '../../../../../client/utils/restUtils';

const mapStateToProps = (state, ownProps) => {
    const { organizations } = state.organizations;
    const { organizationId } = ownProps;

    const members = retrieveMembersAndAdmins(organizations, organizationId);

    return {
        data: {
            members: members
        }
    };
};

export default connect(mapStateToProps)(OrganizationTable);

