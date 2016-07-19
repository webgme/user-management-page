/**
 * Sidebar user panel container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import SideBarUserPanel from '../../components/sidebar/SideBarUserPanel';

const mapStateToProps = (state) => {
    const { user } = state.user;

    return {
        user
    };
};

export default connect(mapStateToProps)(SideBarUserPanel);
