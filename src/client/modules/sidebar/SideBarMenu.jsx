/* globals*/
import React from 'react';

export default class SideBarMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <ul className="sidebar-menu">
            <li className="header">Site Navigation</li>
            <li className="active">
                <a href="#"><i className="fa fa-link"/> <span>My Profile</span> </a>
            </li>
            <li>
                <a href="#"><i className="fa fa-link"/> <span>My Projects</span> </a>
            </li>
            <li>
                <a href="#"><i className="fa fa-link"/> <span>My Organizations</span> </a>
            </li>
            <li className="treeview">
                <a href="#">
                    <i className="fa fa-link"/> <span>Multilevel</span> <i className="fa fa-angle-left pull-right"/>
                </a>
                <ul className="treeview-menu">
                    <li><a href="#"><i className="fa fa-circle-o">''</i>Sublevel 1</a></li>
                    <li><a href="#"><i className="fa fa-circle-o">''</i>Sublevel 2</a></li>
                </ul>
            </li>
        </ul>;
    }

}
