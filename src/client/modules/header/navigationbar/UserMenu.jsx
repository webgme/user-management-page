/* global require */
import React from '../../../../../node_modules/react/lib/React';

export default class UserMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: {_id: 'loading'}
        };
    }

    componentDidMount() {
        var self = this;
        this.props.restClient.user.getCurrentUser()
            .then(function(data) {
                self.setState({userData: data});
            });
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
                <li className="user-body">
                    <div className="row">
                        <div className="col-xs-4 text-center">
                            <a href="#">Followers</a>
                        </div>
                        <div className="col-xs-4 text-center">
                            <a href="#">Sales</a>
                        </div>
                        <div className="col-xs-4 text-center">
                            <a href="#">Friends</a>
                        </div>
                    </div>
                </li>
                <li className="user-footer">
                    <div className="pull-left">
                        <a href="#" className="btn btn-default btn-flat">Profile</a>
                    </div>
                    <div className="pull-right">
                        <a href="#" className="btn btn-default btn-flat">Sign out</a>
                    </div>
                </li>
            </ul>
        </li>;
    }
}
