/* global window */

/**
 * Header component
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react';
import { Link } from 'react-router';
// Self defined
import ColorMenu from '../../containers/header/navigation_bar/ColorMenu';
// import SettingsMenu from './navigation_bar/SettingsMenu';
import Refresh from '../../containers/header/navigation_bar/Refresh';
import UserMenu from '../../containers/header/navigation_bar/UserMenu';
import { capitalizeFirstLetter } from '../../../client/utils/utils';
import { Header as STYLE } from '../../../client/style';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { basePath, pathname } = this.props;

        let breadcrumbs = [],
            pathWithoutBase = pathname.replace(basePath, ''),
            parameters = pathWithoutBase.split('/');

        // Always have home
        // breadcrumbs.push(
        //    <li style={STYLE.breadCrumbListItem} key={0}>
        //        <Link to={basePath} style={STYLE.breadCrumbLink}>
        //            <i className="fa fa-home" style={STYLE.breadCrumbIcon}/>
        //        </Link>
        //    </li>
        // );

        let rest = parameters[0] === 'home' ? parameters.slice(1) : parameters;
        let cumulative = '';
        rest.forEach((oneParam, index) => {
            breadcrumbs.push(
                <li style={STYLE.breadCrumbListItem} key={index + 1}>
                    <Link to={`${basePath}${cumulative}${oneParam}`} style={STYLE.breadCrumbLink}>
                        {index === 0 ? capitalizeFirstLetter(rest[index]) :
                                       rest[index]}
                    </Link>
                </li>
            );
            cumulative += oneParam + '/';
        });

        for (let i = 1; i < breadcrumbs.length; i += 2) {
            breadcrumbs.splice(i, 0,
                <span style={STYLE.breadCrumbLink} key={i + 100}>
                    &nbsp;&nbsp;&nbsp; > &nbsp;&nbsp;&nbsp;
                </span>);
        }

        return (
            <header className="main-header">

                <Link to={`${basePath}`} className="logo" style={{textDecoration: "none"}}>
                    <span className="logo-mini"><b>GME</b></span>
                    <span className="logo-lg"><b>GME</b>Profile</span>
                </Link>

                <nav className="navbar navbar-static-top" role="navigation">

                    <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>

                    <ol className="dropdown messages-menu hidden-xs" style={STYLE.breadCrumb}>
                        {breadcrumbs}
                    </ol>

                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">

                            <Refresh />

                            <ColorMenu />

                            <UserMenu />

                            {/* <SettingsMenu/> */}

                        </ul>
                    </div>

                </nav>

            </header>
        );
    }

}
