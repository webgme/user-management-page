/**
 * Profile page container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import ProfilePage from '../../../components/content/pages/ProfilePage';

const mapStateToProps = (state) => {
    const { user } = state.user;
    const { config } = state.general.config;
    const { tokens } = state.tokens;

    return {
        user,
        config,
        tokens
    };
};

export default connect(mapStateToProps)(ProfilePage);
