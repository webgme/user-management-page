/**
 * UsersDataTableEntry container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import UsersDataTableEntry from
    '../../../../../components/content/widgets/data_tables/table_entries/UsersDataTableEntry';

const mapStateToProps = (state) => {
    const { basePath } = state;

    return {
        basePath
    };
};

export default connect(mapStateToProps)(UsersDataTableEntry);
