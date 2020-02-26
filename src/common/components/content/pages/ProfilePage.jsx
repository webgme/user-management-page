/**
 * Profile page container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Self-defined
import ProfileBox from '../widgets/ProfileBox';
import { fetchUserIfNeeded } from '../../../actions/user';
import { fetchConfigIfNeeded } from '../../../actions/general';
import { fetchTokensIfNeeded } from '../../../actions/tokens';
// Style
import { ProfilePage as STYLE } from '../../../../client/style';

export default class ProfilePage extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchUserIfNeeded());
        dispatch(fetchConfigIfNeeded());
        dispatch(fetchTokensIfNeeded());
    }

    render() {
        const { dispatch, restClient, user, tokens } = this.props;
        return (
            <section className="content" style={STYLE.profileBox}>

                <ProfileBox dispatch={dispatch}
                    editable={true}
                    isCurrentUser={true}
                    config={this.props.config}
                    restClient={restClient}
                    currentUser={user}
                    user={user}
                    tokens={tokens}/>

            </section>
        );
    }

}

ProfilePage.propTypes = {
    user: PropTypes.object.isRequired
};
