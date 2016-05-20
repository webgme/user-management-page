import React from 'react';

export default class NotificationsMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <li className="dropdown notifications-menu">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <i className="fa fa-bell-o"/>
                <span className="label label-warning">10</span>
            </a>
            <ul className="dropdown-menu">
                <li className="header">You have 10 notifications</li>
                <li>
                    <ul className="menu">
                        <li>
                            <a href="#">
                                <i className="fa fa-users text-aqua"/> 5 new members joined today
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="footer"><a href="#">View all</a></li>
            </ul>
        </li>
    }
}