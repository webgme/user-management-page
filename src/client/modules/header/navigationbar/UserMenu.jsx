/* global window, require */
import React from '../../../../../node_modules/react/lib/React';
import {Link} from 'react-router/lib';

const STYLING = {
    logoutButtonPadding: {
        padding: "9px 100px"
    },
    logoutButtonBorder: {
        borderColor: "#777777"
    },
    logoutAreaBorder: {
        padding: "2px"
    }
};

export default class UserMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: {_id: 'loading'}
        };
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    componentDidMount() {
        var self = this;
        this.props.restClient.user.getCurrentUser()
            .then(function(data) {
                self.setState({userData: data});
            });
    }

    handleSignOut() {
        // Manually reload page or won't actually show login page (not part of user management)
        window.location.reload();
    }

    render() {

        return <li className="dropdown user user-menu">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <img src={'/rest/external/usermanagement/' + require('webgme/src/client/img/gme-logo.png')} className="user-image" alt="User Image"/>
                <span className="hidden-xs">{this.state.userData._id}</span>
            </a>
            <ul className="dropdown-menu">
                <li className="user-header">
                    <img src={'/rest/external/usermanagement/' + require('webgme/src/client/img/gme-logo.png')} className="img-circle" alt="User Image"/>
                    <p>
                        {this.state.userData._id}
                        <small>Member since Nov. 2012</small>
                    </p>
                </li>
                <li className="user-footer" style={STYLING.logoutAreaBorder}>
                    <div className="col-xs-4 text-center" style={STYLING.logoutButtonPadding}>
                        <Link to="/login" className="btn btn-default btn-flat"
                              onClick={this.handleSignOut}
                              style={STYLING.logoutButtonBorder}>Sign Out
                        </Link>
                    </div>
                </li>
            </ul>
        </li>;
    }
}
