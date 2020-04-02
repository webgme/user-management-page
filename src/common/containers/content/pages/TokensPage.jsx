/**
 * Profile page container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import TokensPage from '../../../components/content/pages/TokensPage';

const mapStateToProps = (state) => {
    const { basePath } = state;

    return {
        basePath,
    };
};

export default connect(mapStateToProps)(TokensPage);
