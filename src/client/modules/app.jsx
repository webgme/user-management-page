/* global window */
import React from 'react';
import Header from './header/Header.jsx';
import SideBar from './sidebar/SideBar.jsx';
import ContentWrapper from './content/ContentWrapper.jsx';
import Footer from './footer/Footer.jsx';

/**
 * This is the main layout of the web-page.
 */
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {route: window.location.pathname + window.location.hash.substr(1)};
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({
                route: window.location.pathname + window.location.hash.substr(1)
            });
        });
    }

    /**
     * ---------------------------------------------------------|
     * SKINS         | skin-blue                                |
     *               | skin-black                               |
     *               | skin-purple                              |
     *               | skin-yellow                              |
     *               | skin-red                                 |
     *               | skin-green                               |
     * ---------------------------------------------------------|
     * @return {XML} Can make this a user setting in the future
     */
    render() {

        return <div className="wrapper skin-blue">
            <Header/>
            <SideBar/>
            <ContentWrapper passRoute={this.state.route}/>
            <Footer/>
        </div>;
    }

}
