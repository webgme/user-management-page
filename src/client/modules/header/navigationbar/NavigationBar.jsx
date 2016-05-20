/*globals*/
import React from 'react';
import ToggleSidebar from './ToggleSidebar.jsx';
import CustomMenu from './custommenu/CustomMenu.jsx';

export default class NavigationBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <nav className="navbar navbar-static-top" role="navigation">
            <ToggleSidebar />
            <CustomMenu />
        </nav>
    }
}