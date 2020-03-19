/**
 * Container widget for the users data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import TokensTable from '../../../../components/content/widgets/TokensTable';


const mapStateToProps = (state) => {
    const { tokens } = state.tokens;
    const { config } = state.general.config;
    const { user } = state.user;
    return {
        tokens: tokens,
        user: user,
        config: config
    };
};

export default connect(mapStateToProps)(TokensTable);
