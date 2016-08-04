/* global */

/**
 * Container widget for the general table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import DataTable from '../../../../components/content/widgets/data_tables/DataTable';
import { sortObjectArrayByField } from '../../../../../client/utils/utils';

const mapStateToProps = (state, ownProps) => {
    const reducerTableName = ownProps.reducerTableName;
    const tableOptions = state.tables[reducerTableName];

    return {
        tableOptions
    };
};

export default connect(mapStateToProps)(DataTable);
