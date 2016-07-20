/**
 * App container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import App from '../components/App';

const mapStateToProps = (state) => {
    // Default blue
    const themeColor = state.user.user.data ? state.user.user.data.themeColor || 'blue' : 'blue';
    return {
        themeColor
    };
};

export default connect(mapStateToProps)(App);
