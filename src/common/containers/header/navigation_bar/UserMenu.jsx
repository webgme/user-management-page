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

const STYLING = {
    logoutButtonPadding: {
        padding: "9px 100px"
    },
    logoutButtonBorder: {
        borderColor: "#777777"
    },
    logoutAreaBorder: {
        padding: "2px"
    },
    userHeader: {
        height: "145px"
    }
};

class UserMenu extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchUserIfNeeded());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.props.user) {
            const { dispatch } = nextProps;
            dispatch(fetchUserIfNeeded());
        }
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
                    <li className="user-header" style={STYLING.userHeader}>
                        <img src="/img/gme-logo.png" className="img-circle" alt="User Image"/>
                        <p>
                            {user._id}
                        </p>
                    </li>
                    <li className="user-footer" style={STYLING.logoutAreaBorder}>
                        <div className="col-xs-4 text-center" style={STYLING.logoutButtonPadding}>
                            <a href="/logout">
                                <Button style={STYLING.logoutButtonBorder}>Sign Out</Button>
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
    return {
        user: state.user.user
    };
};

export default connect(mapStateToProps)(UserMenu);