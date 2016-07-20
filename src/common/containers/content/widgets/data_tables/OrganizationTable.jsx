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
import { sortObjectArrayByField } from '../../../../../client/utils/utils';

const mapStateToProps = (state, ownProps) => {
    const { organizations } = state.organizations;
    const { sortCategory, sortedForward } = state.tables.organizationMembers;
    const { organizationId } = ownProps;

    const members = retrieveMembersAndAdmins(organizations, organizationId);

    return {
        members: sortedForward ?
            members.sort(sortObjectArrayByField(sortCategory)) :
            members.sort(sortObjectArrayByField(sortCategory)).reverse()
    };
};

export default connect(mapStateToProps)(OrganizationTable);

