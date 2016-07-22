/**
 * UsersPage page container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import UsersPage from '../../../components/content/pages/UsersPage';

const mapStateToProps = (state) => {
    const { basePath } = state;

    return {
        basePath
    };
};

export default connect(mapStateToProps)(UsersPage);
