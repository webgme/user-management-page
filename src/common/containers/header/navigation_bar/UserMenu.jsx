/**
 * User menu container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
// Self-defined
import { fetchUserIfNeeded } from '../../../actions/user';
import { UserMenu as STYLE } from '../../../../client/style';

class UserMenu extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchUserIfNeeded());
    }

    render() {
        const { user } = this.props;

        return (
            <li className="dropdown user user-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <img src="/img/gme-logo.png" className="user-image" alt="User Image"/>
                    <span className="hidden-xs">&nbsp;{user._id}&nbsp;</span>
                </a>
                <ul className="dropdown-menu">
                    <li className="user-header" style={STYLE.userHeader}>
                        <img src="/img/gme-logo.png" className="img-circle" alt="User Image"/>
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

const mapStateToProps = (state) => {
    const { user } = state.user;

    return {
        user
    };
};

export default connect(mapStateToProps)(UserMenu);
