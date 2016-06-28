/** User menu of the header component
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import Button from 'react-bootstrap/lib/Button';
import React from 'react/lib/React';

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

export default class UserMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: {_id: 'loading'}
        };
    }

    componentDidMount() {
        this.props.restClient.user.getCurrentUser()
            .then(data => {
                this.setState({userData: data});
            });
    }

    render() {

        return <li className="dropdown user user-menu">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <img src="/img/gme-logo.png" className="user-image" alt="User Image"/>
                <span className="hidden-xs">{this.state.userData._id}</span>
            </a>
            <ul className="dropdown-menu">
                <li className="user-header" style={STYLING.userHeader}>
                    <img src="/img/gme-logo.png" className="img-circle" alt="User Image"/>
                    <p>
                        {this.state.userData._id}
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
        </li>;
    }
}
