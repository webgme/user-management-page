/**
 * Profile page container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
// Self-defined
import ProfileBox from '../widgets/ProfileBox';
import { fetchUserIfNeeded } from '../../../actions/user';
import { fetchConfigIfNeeded } from '../../../actions/general';
// Style
import { ProfilePage as STYLE } from '../../../../client/style';

export default class ProfilePage extends Component {

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchUserIfNeeded());
        dispatch(fetchConfigIfNeeded());
    }

    render() {
        const { dispatch, restClient, user } = this.props;

        return (
            <section className="content" style={STYLE.profileBox}>

                <ProfileBox dispatch={dispatch}
                            editable={true}
                            isCurrentUser={true}
                            config={this.props.config}
                            restClient={restClient}
                            user={user} />

            </section>
        );
    }

}

ProfilePage.propTypes = {
    user: PropTypes.object.isRequired
};
