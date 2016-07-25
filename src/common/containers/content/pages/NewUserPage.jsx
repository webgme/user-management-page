/**
 * NewUserPage page container
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import NewUserPage from '../../../components/content/pages/NewUserPage';

const mapStateToProps = (state) => {
    const { basePath } = state;
    const { user } = state.user;

    return {
        basePath,
        user
    };
};

export default connect(mapStateToProps)(NewUserPage);
