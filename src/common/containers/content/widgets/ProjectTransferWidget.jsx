/**
 * Transfer project widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self defined
import ProjectTransferWidget from '../../../components/content/widgets/ProjectTransferWidget';
import { getOrgsCanTransferToTo } from '../../../../client/utils/restUtils';

const mapStateToProps = (state, ownProps) => {
    const { basePath } = state;
    const { organizations } = state.organizations;

    const orgsCanTransferTo = getOrgsCanTransferToTo(organizations, ownProps.userId, ownProps.ownerId);

    return {
        basePath,
        orgsCanTransferTo
    };
};

export default connect(mapStateToProps)(ProjectTransferWidget);
