/**
 * User menu container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import UserMenu from '../../../components/header/navigation_bar/UserMenu';

const mapStateToProps = (state) => {
    const { user } = state.user;
    const { basePath } = state.basePath;

    return {
        user,
        basePath
    };
};

export default connect(mapStateToProps)(UserMenu);
