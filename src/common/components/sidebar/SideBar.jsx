/**
 * Sidebar component
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
// Self-defined components
import SideBarMenu from '../../containers/sidebar/SideBarMenu';
import SideBarUserPanel from '../../containers/sidebar/SideBarUserPanel';

export default class SideBar extends Component {

    render() {

        return (
            <aside className="main-sidebar">

                <section className="sidebar">

                    <SideBarUserPanel/>

                    <SideBarMenu location={this.props.location}/>

                </section>

            </aside>
        );
    }

}
