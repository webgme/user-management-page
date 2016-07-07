/**
 * ProjectsDataTableEntry container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import ProjectsDataTableEntry from '../../../../../../components/content/widgets/data_tables/table_entries/ProjectsDataTableEntry'; // eslint-disable-line max-len

const mapStateToProps = (state) => {
    return {
        basePath: state.basePath
    };
};

export default connect(mapStateToProps)(ProjectsDataTableEntry);
