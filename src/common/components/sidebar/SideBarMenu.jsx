/**
 * Menu items of sidebar
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
// Style
import {SideBarMenu as STYLE} from '../../../client/style';

export default class SideBarMenu extends Component {

    render() {
        const {basePath, pathname, siteAdmin} = this.props;

        return (
            <ul className="sidebar-menu" style={STYLE.sidebarCategoryStyle}>

                <li className="header">Site Navigation</li>

                <li className={/home$/.test(pathname) ? 'active' : ''}>
                    <Link to={`${basePath}home`} style={{textDecoration: "none"}}>
                        <i className="fa fa-home"/><span>Home</span>
                    </Link>
                </li>

                <li className={/profile$/.test(pathname) ? 'active' : ''}>
                    <Link to={`${basePath}profile`} style={{textDecoration: "none"}}>
                        <i className="fa fa-user"/><span>Profile</span>
                    </Link>
                </li>

                <li className={/tokens/.test(pathname) ? 'active': ''}>
                    <Link to={`${basePath}tokens`} style={{textDecoration: "none"}}>
                        <i className="fa fa-key"/><span>Access Tokens</span>
                    </Link>
                </li>

                <li className={/projects/.test(pathname) ? 'active' : ''}>
                    <Link to={`${basePath}projects`} style={{textDecoration: "none"}}>
                        <i className="fa fa-cubes"/><span>Projects</span>
                    </Link>
                </li>

                <li className={/organizations/.test(pathname) ? 'active' : ''}>
                    <Link to={`${basePath}organizations`} style={{textDecoration: "none"}}>
                        <i className="fa fa-university"/><span>Organizations</span>
                    </Link>
                </li>

                <li className={/users/.test(pathname) ? 'active' : ''}>
                    <Link to={`${basePath}users`} style={{textDecoration: "none"}}>
                        <i className="fa fa-users"/><span>Users</span>
                    </Link>
                </li>

                {siteAdmin ? (
                    <li className={/status$/.test(pathname) ? 'active' : ''}>
                        <Link to={`${basePath}status`} style={{textDecoration: "none"}}>
                            <i className="fa fa-graduation-cap"/><span>Server Status</span>
                        </Link>
                    </li>) : null}

                {/*
            <li className="treeview">
                <a href="#">
                    <i className="fa fa-link"/> <span>Multilevel</span> <i className="fa fa-angle-left pull-right"/>
                </a>
                <ul className="treeview-menu">
                    <li><a href="#"><i className="fa fa-circle-o"/>Sublevel 1</a></li>
                    <li><a href="#"><i className="fa fa-circle-o"/>Sublevel 2</a></li>
                </ul>
            </li>
            */}

            </ul>
        );
    }

}

SideBarMenu.propTypes = {
    basePath: PropTypes.string.isRequired,
    siteAdmin: PropTypes.bool
};
