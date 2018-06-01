/**
 * Sidebar component
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
// Self-defined components
import SideBarMenu from '../../containers/sidebar/SideBarMenu';
import SideBarUserPanel from '../../containers/sidebar/SideBarUserPanel';
import PropTypes from "prop-types";

export default class SideBar extends Component {

    render() {
        const { pathname, siteAdmin } = this.props;

        return (
            <aside className="main-sidebar">

                <section className="sidebar">

                    <SideBarUserPanel/>

                    <SideBarMenu pathname={pathname} siteAdmin={siteAdmin}/>

                </section>

            </aside>
        );
    }

}

SideBar.propTypes = {
    pathname: PropTypes.string.isRequired,
    siteAdmin: PropTypes.bool
};
