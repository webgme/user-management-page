/*globals*/
/**
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import React, { Component, PropTypes } from 'react';

// Self-defined
import { RegisterForm } from '../../../login/RegisterForm';
import { fetchUserIfNeeded } from '../../../actions/user';
import { fetchUsersIfNeeded } from '../../../actions/users';

// Style
import { ProfilePage as STYLE } from '../../../../client/style';

export default class NewUserPage extends Component {

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchUserIfNeeded());
        dispatch(fetchUsersIfNeeded());
    }

    render() {
        const { basePath, dispatch, editable, restClient, user } = this.props;

        return (
            <section className="content" style={STYLE.profileBox}>

            </section>
        );
    }

}

UserPage.propTypes = {
    user: PropTypes.object.isRequired
};