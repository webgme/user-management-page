/**
 * Header component
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import Link from 'react-router/lib/Link';
import React from 'react/lib/React';
// Self defined
import ColorMenu from './navigationbar/ColorMenu';
import SettingsMenu from './navigationbar/SettingsMenu';
import UserMenu from './navigationbar/UserMenu';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <header className="main-header">

            <Link to={`${this.props.basePath}`} className="logo">
                <span className="logo-mini"><b>GME</b></span>
                <span className="logo-lg"><b>GME</b>Profile</span>
            </Link>

            <nav className="navbar navbar-static-top" role="navigation">

                <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                    <span className="sr-only">Toggle navigation</span>
                </a>

                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">

                        <ColorMenu handleColorSwitch={this.props.handleColorSwitch}/>

                        <UserMenu restClient={this.props.restClient}
                                  basePath={this.props.basePath}/>

                        <SettingsMenu/>

                    </ul>
                </div>

            </nav>

        </header>;
    }

}
