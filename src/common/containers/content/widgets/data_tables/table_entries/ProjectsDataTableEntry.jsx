/**
 * ProjectsDataTableEntry container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import ProjectsDataTableEntry from
    '../../../../../components/content/widgets/data_tables/table_entries/ProjectsDataTableEntry';

const mapStateToProps = (state) => {
    const { basePath } = state;

    return {
        basePath
    };
};

export default connect(mapStateToProps)(ProjectsDataTableEntry);
