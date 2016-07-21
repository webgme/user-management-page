/**
 * User menu container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
// Self-defined
import { fetchUserIfNeeded } from '../../../actions/user';
import { getUserIconSource } from '../../../../client/utils/utils';
import { UserMenu as STYLE, ProfileImage as PROFILE_STYLE } from '../../../../client/style';

export default class UserMenu extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchUserIfNeeded());
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
                    <span className="hidden-xs">&nbsp;{user._id}&nbsp;</span>
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
                            <a href="/logout">
                                <Button style={STYLE.logoutButtonBorder}>Sign Out</Button>
                            </a>
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
