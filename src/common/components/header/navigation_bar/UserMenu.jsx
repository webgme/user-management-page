/* global window, document*/
/**
 * User menu container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
// Self-defined
import BaseClient from '../../../../client/rest_client/baseClient';
import { fetchUserIfNeeded } from '../../../actions/user';
import { userLogout } from '../../../actions/general';
import { getUserIconSource } from '../../../../client/utils/utils';
import { UserMenu as STYLE, ProfileImage as PROFILE_STYLE } from '../../../../client/style';

export default class UserMenu extends Component {

    constructor(props) {
        super(props);
        this.onSignOutBtnClick = this.onSignOutBtnClick.bind(this);
        this.restClient = new BaseClient('');
        this.state = {
            gmeConfig: null
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchUserIfNeeded());
        this.restClient.get(['/gmeConfig.json'])
            .then((gmeConfig) => {
                this.setState({
                    gmeConfig
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    onSignOutBtnClick() {
        const { dispatch } = this.props;
        const { gmeConfig } = this.state;

        // dispatch(userLogout());

        // The redirect target should be the _top so we need to add a temporary anchor..
        let tempAnchor = document.createElement('a');
        let referrer = window.sessionStorage.getItem('originalReferrer');

        tempAnchor.target = '_self';

        if (referrer) {
            tempAnchor.href = '/logout?redirectUrl=' + referrer;
        } else {
            tempAnchor.href = '/logout';
        }

        document.body.appendChild(tempAnchor);
        // Note that path=/ is needed since the cookie is stored at root.
        window.document.cookie = gmeConfig.authentication.jwt.cookieId +
            '=;path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        window.parent.postMessage('logout', '*');

        tempAnchor.click();
    }

    render() {
        const { user } = this.props;

        return (
            <li className="dropdown user user-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <img src={getUserIconSource(user._id)}
                        className="user-image"
                        alt="User Image"
                        style={PROFILE_STYLE}/>
                    <span className="hidden-xs">{user.siteAdmin ? <i className="fa fa-graduation-cap"/> : null}
                        {` ${user.displayName || user._id}`}</span>
                </a>
                <ul className="dropdown-menu">
                    <li className="user-header" style={STYLE.userHeader}>
                        <img src={getUserIconSource(user._id)}
                            className="img-circle"
                            alt="User Image"
                            style={PROFILE_STYLE}/>
                        <p>
                            {user.displayName || user._id}
                        </p>
                    </li>
                    <li className="user-footer" style={STYLE.logoutAreaBorder}>
                        <div className="col-xs-4 text-center" style={STYLE.logoutButtonPadding}>
                            <Button style={STYLE.logoutButtonBorder} onClick={this.onSignOutBtnClick}>Sign Out</Button>
                        </div>
                    </li>
                </ul>
            </li>
        );
    }

}

UserMenu.propTypes = {
    user: PropTypes.object.isRequired
};
