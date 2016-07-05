/**
 * Sidebar component
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
// Self-defined components
import SideBarMenu from './SideBarMenu';
import SideBarUserPanel from '../../containers/sidebar/SideBarUserPanel';

export default class SideBar extends Component {

    render() {
        return <aside className="main-sidebar">

            <section className="sidebar">

                <SideBarUserPanel basePath={this.props.basePath}/>

                <SideBarMenu location={this.props.location}
                             basePath={this.props.basePath}/>

            </section>
        </aside>;
    }

}
