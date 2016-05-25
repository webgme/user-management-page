import React from 'react';
import MessageMenu from './navigationbar/MessageMenu.jsx';
import NotificationsMenu from './navigationbar/NotificationsMenu.jsx';
import TasksMenu from './navigationbar/TasksMenu.jsx';
import UserMenu from './navigationbar/UserMenu.jsx';
import SettingsMenu from './navigationbar/SettingsMenu.jsx';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <header className="main-header">

            <a href="" className="logo">
                <span className="logo-mini"><b>GME</b></span>
                <span className="logo-lg"><b>GME</b>Profile</span>
            </a>

            <nav className="navbar navbar-static-top" role="navigation">

                <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                    <span className="sr-only">Toggle navigation</span>
                </a>

                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                        <MessageMenu />
                        <NotificationsMenu />
                        <TasksMenu />
                        <UserMenu />
                        <SettingsMenu />
                    </ul>
                </div>
            </nav>

        </header>;
    }

}
