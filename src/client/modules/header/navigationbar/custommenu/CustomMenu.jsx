import React from 'react';
import MessageMenu from './MessageMenu.jsx';
import NotificationsMenu from './NotificationsMenu.jsx';
import TasksMenu from './TasksMenu.jsx';
import UserMenu from './UserMenu.jsx';
import SettingsMenu from './SettingsMenu.jsx';

export default class CustomMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
                <MessageMenu />
                <NotificationsMenu />
                <TasksMenu />
                <UserMenu />
                <SettingsMenu />
            </ul>
        </div>
    }
}