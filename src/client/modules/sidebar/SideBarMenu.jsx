import React from 'react';
import {Link} from 'react-router';

export default class SideBarMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let sidebarCategoryStyle = {
            "lineHeight": "30px",
            "fontFamily": "\"Helvetica Neue\", Roboto, Arial, \"Droid Sans\", sans-serif",
            "color": "#E7E7E7"
        };

        return (

        <ul className="sidebar-menu" style={sidebarCategoryStyle}>

            <li className="header">Site Navigation</li>

            <li className={this.props.location.pathname === '/profile' ? 'active' : ''}>
                <Link to="/profile"><i className="fa fa-user"/> <span>My Profile</span> </Link>
            </li>

            <li className={this.props.location.pathname === '/projects' ? 'active' : ''}>
                <Link to="/projects"><i className="fa fa-cubes"/> <span>My Projects</span> </Link>
            </li>

            <li className={this.props.location.pathname === '/organizations' ? 'active' : ''}>
                <Link to="/organizations"><i className="fa fa-university"/> <span>My Organizations</span> </Link>
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

        </ul>
        );
    }

}
