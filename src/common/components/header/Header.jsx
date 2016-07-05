/* global window */

/**
 * Header component
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import Link from 'react-router/lib/Link';
import React from 'react';
// Self defined
import ColorMenu from './navigationbar/ColorMenu';
// import SettingsMenu from './navigationbar/SettingsMenu';
import UserMenu from './navigationbar/UserMenu';
import {capitalizeFirstLetter} from '../../../client/utils/utils';

const STYLING = {
    breadCrumb: {
        position: "absolute",
        boxSizing: "border-box",
        padding: "15px 15px",
        listStyleType: "none",
        display: "inline"
    },
    breadCrumbIcon: {
        fontSize: "20px"
    },
    breadCrumbListItem: {
        display: "inline",
        color: "white"
    },
    breadCrumbLink: {
        color: "white",
        cursor: "pointer",
        display: "inline",
        fontSize: "13px",
        textDecoration: "none"
    }
};

export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let breadcrumbs = [],
            location = window.location.pathname,
            pathWithoutBase = location.replace(this.props.basePath, ''),
            parameters = pathWithoutBase.split('/');

        // Always have home
        breadcrumbs.push(
            <li style={STYLING.breadCrumbListItem} key={0}>
                <Link to={this.props.basePath} style={STYLING.breadCrumbLink}>
                    <i className="fa fa-home" style={STYLING.breadCrumbIcon}/>
                </Link>
            </li>
        );

        let rest = parameters[0] === 'home' ? parameters.slice(1) : parameters;
        rest.forEach((oneParam, index) => {
            if (index === 0) {
                breadcrumbs.push(
                    <li style={STYLING.breadCrumbListItem} key={index + 1}>
                        <Link to={`${this.props.basePath}${oneParam}`} style={STYLING.breadCrumbLink}>
                            {capitalizeFirstLetter(rest[index])}
                        </Link>
                    </li>
                );
            } else if (index === rest.length - 1) {
                breadcrumbs.push(
                    <li style={STYLING.breadCrumbListItem} key={index + 1}>
                        <Link to={`${this.props.basePath}${pathWithoutBase}`} style={STYLING.breadCrumbLink}>
                            {capitalizeFirstLetter(rest[index])}
                        </Link>
                    </li>
                );
            } else {
                breadcrumbs.push(
                    <li style={STYLING.breadCrumbListItem} key={index + 1}>
                        {capitalizeFirstLetter(rest[index])}
                    </li>
                );
            }
        });

        for (let i = 1; i < breadcrumbs.length; i += 2) {
            breadcrumbs.splice(i, 0,
                <span style={STYLING.breadCrumbLink} key={i + 100}>
                    &nbsp;&nbsp;&nbsp; > &nbsp;&nbsp;&nbsp;
                </span>);
        }

        return <header className="main-header">

            <Link to={`${this.props.basePath}`} className="logo" style={{textDecoration: "none"}}>
                <span className="logo-mini"><b>GME</b></span>
                <span className="logo-lg"><b>GME</b>Profile</span>
            </Link>

            <nav className="navbar navbar-static-top" role="navigation">

                <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                    <span className="sr-only">Toggle navigation</span>
                </a>

                <ol className="dropdown messages-menu" style={STYLING.breadCrumb}>
                    {breadcrumbs}
                </ol>

                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">

                        <ColorMenu onChangeThemeColor={this.props.onChangeThemeColor}/>

                        <UserMenu restClient={this.props.restClient}
                                  basePath={this.props.basePath}/>

                        {/* <SettingsMenu/> */}

                    </ul>
                </div>

            </nav>

        </header>;
    }

}
