/**
 * Profile page container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Self-defined
import ProfileBox from '../../../components/content/widgets/ProfileBox';
import { fetchUserIfNeeded } from '../../../actions/user';
// Style
import { ProfilePage as STYLE } from '../../../../client/style';

class ProfilePage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchUserIfNeeded());
    }

    render() {
        const { dispatch, restClient, user } = this.props;

        return (
            <section className="content" style={STYLE.profileBox}>

                <ProfileBox dispatch={dispatch}
                            restClient={restClient}
                            user={user} />

            </section>
        );
    }

}

ProfilePage.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    const { user } = state.user;

    return {
        user
    };
};

export default connect(mapStateToProps)(ProfilePage);
