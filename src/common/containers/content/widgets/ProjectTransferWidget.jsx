/**
 * Transfer project widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self defined
import ProjectTransferWidget from '../../../components/content/widgets/ProjectTransferWidget';
import { getOrgsUserCanTransferTo } from '../../../../client/utils/restUtils';

const mapStateToProps = (state, ownProps) => {
    const { basePath } = state;
    const { organizations } = state.organizations;

    const orgsUserCanTransferTo = getOrgsUserCanTransferTo(organizations, ownProps.userId, ownProps.ownerId);

    return {
        basePath,
        orgsUserCanTransferTo
    };
};

export default connect(mapStateToProps)(ProjectTransferWidget);
