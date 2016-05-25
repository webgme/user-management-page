import React from 'react';
import {Link} from 'react-router';

export default class SideBarMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let sidebarCategoryStyle = {
            "line-height": "30px",
            "font-family": "\"Helvetica Neue\", Roboto, Arial, \"Droid Sans\", sans-serif",
            "color": "#E7E7E7"
        };

        return <ul className="sidebar-menu" style={sidebarCategoryStyle}>
            <li className="header">Site Navigation</li>
            <li className="active">
                <a href="#/profile/"><i className="fa fa-user"/> <span>My Profile</span> </a>
            </li>
            <li>
                <a href="#/projects/"><i className="fa fa-cubes"/> <span>My Projects</span> </a>
            </li>
            <li>
                <a href="#/organizations/"><i className="fa fa-university"/> <span>My Organizations</span> </a>
            </li>
            <li className="treeview">
                <a href="#">
                    <i className="fa fa-link"/> <span>Multilevel</span> <i className="fa fa-angle-left pull-right"/>
                </a>
                <ul className="treeview-menu">
                    <li><a href="#"><i className="fa fa-circle-o"></i>Sublevel 1</a></li>
                    <li><a href="#"><i className="fa fa-circle-o"></i>Sublevel 2</a></li>
                </ul>
            </li>
        </ul>;
    }

}
