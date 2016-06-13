// Libraries
import Link from '../../../../node_modules/react-router/lib/Link';
import React from '../../../../node_modules/react/lib/React';
// Self defined
import ColorMenu from './navigationbar/ColorMenu.jsx';
// import MessageMenu from './navigationbar/MessageMenu.jsx';
// import NotificationsMenu from './navigationbar/NotificationsMenu.jsx';
import SettingsMenu from './navigationbar/SettingsMenu.jsx';
// import TasksMenu from './navigationbar/TasksMenu.jsx';
import UserMenu from './navigationbar/UserMenu.jsx';

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
                        {/*<MessageMenu/>*/}
                        {/*<NotificationsMenu/>*/}
                        {/*<TasksMenu/>*/}
                        <UserMenu restClient={this.props.restClient}
                                  basePath={this.props.basePath}/>
                        <SettingsMenu/>
                    </ul>
                </div>
            </nav>

        </header>;
    }

}
