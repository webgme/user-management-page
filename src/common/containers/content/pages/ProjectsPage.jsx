/**
 * ProjectsPage page container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import ProjectsPage from '../../../components/content/pages/ProjectsPage';

const mapStateToProps = (state) => {
    const { basePath } = state;

    return {
        basePath
    };
};

export default connect(mapStateToProps)(ProjectsPage);
