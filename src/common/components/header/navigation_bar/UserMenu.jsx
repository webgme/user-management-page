/* global window*/
/**
 * User menu container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
// Self-defined
import { fetchUserIfNeeded } from '../../../actions/user';
import { userLogout } from '../../../actions/general';
import { getUserIconSource } from '../../../../client/utils/utils';
import { UserMenu as STYLE, ProfileImage as PROFILE_STYLE } from '../../../../client/style';

export default class UserMenu extends Component {

    constructor(props) {
        super(props);
        this.onSignOutBtnClick = this.onSignOutBtnClick.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchUserIfNeeded());
    }

    onSignOutBtnClick() {
        const { dispatch } = this.props;

        dispatch(userLogout());

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
        tempAnchor.click();

        window.parent.postMessage('logout', '*');
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
                        {` ${user._id}`}</span>
                </a>
                <ul className="dropdown-menu">
                    <li className="user-header" style={STYLE.userHeader}>
                        <img src={getUserIconSource(user._id)}
                             className="img-circle"
                             alt="User Image"
                             style={PROFILE_STYLE}/>
                        <p>
                            {user._id}
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
