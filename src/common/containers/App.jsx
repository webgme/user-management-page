/**
 * App container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import App from '../components/App';

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    };
};

export default connect(mapStateToProps)(App);
