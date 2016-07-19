/**
 * OrganizationsDataTableEntry container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import OrganizationsDataTableEntry from
    '../../../../../components/content/widgets/data_tables/table_entries/OrganizationsDataTableEntry';

const mapStateToProps = (state) => {
    return {
        basePath: state.basePath
    };
};

export default connect(mapStateToProps)(OrganizationsDataTableEntry);
