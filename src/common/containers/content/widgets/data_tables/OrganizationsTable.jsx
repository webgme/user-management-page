/* global */

/**
 * Container widget for the organizations table widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import OrganizationsTable from
    '../../../../components/content/widgets/data_tables/OrganizationsTable';
import { sortObjectArrayByField } from '../../../../../client/utils/utils';

const mapStateToProps = (state) => {
    const { organizations } = state.organizations;
    const { sortCategory, sortedForward } = state.tables.organizations;
    const { user } = state.user;

    let formattedOrganizations = [];
    organizations.forEach(org => {
        if (org.admins.indexOf(user._id) !== -1 || org.users.indexOf(user._id) !== -1 ||
            user.siteAdmin) {
            formattedOrganizations.push({name: org._id});
        }
    });

    return {
        organizations: sortedForward ?
            formattedOrganizations.sort(sortObjectArrayByField(sortCategory)) :
            formattedOrganizations.sort(sortObjectArrayByField(sortCategory)).reverse(),
        sortCategory,
        sortedForward,
        user
    };
};

export default connect(mapStateToProps)(OrganizationsTable);
