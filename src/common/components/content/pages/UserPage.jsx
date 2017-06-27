/**
 * Profile page container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
// Self-defined
import ProfileBox from '../widgets/ProfileBox';
import { fetchUserIfNeeded } from '../../../actions/user';
import { fetchUsersIfNeeded } from '../../../actions/users';
import { fetchConfigIfNeeded } from '../../../actions/general';
// Style
import { ProfilePage as STYLE } from '../../../../client/style';

export default class UserPage extends Component {

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchUserIfNeeded());
        dispatch(fetchUsersIfNeeded());
        dispatch(fetchConfigIfNeeded());
    }

    render() {
        return (
            <section className="content" style={STYLE.profileBox}>
                {this.props.userExists ?
                <ProfileBox dispatch={this.props.dispatch}
                            editable={this.props.currentUser.siteAdmin && !this.props.user.disabled}
                            currentUser={this.props.currentUser}
                            restClient={this.props.restClient}
                            config={this.props.config}
                            user={this.props.user} /> :
                    <Link to={`${this.props.basePath}users`}>
                        {`No such user '${this.props.userId}', back to users ...`}
                    </Link>}

            </section>
        );
    }

}

UserPage.propTypes = {
    user: PropTypes.object.isRequired
};
