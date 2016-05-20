import React from 'react';
import HeaderLogo from './HeaderLogo.jsx';
import NavigationBar from './navigationbar/NavigationBar.jsx';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <header className="main-header">
            <HeaderLogo />
            <NavigationBar />
        </header>;
    }

}
