/**
 * SideBarMenu container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import SideBarMenu from '../../components/sidebar/SideBarMenu';

const mapStateToProps = (state) => {
    return {
        basePath: state.basePath
    };
};

export default connect(mapStateToProps)(SideBarMenu);
