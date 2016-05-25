/* global window */
import React from 'react';
import Header from './header/Header.jsx';
import SideBar from './sidebar/SideBar.jsx';
import ContentWrapper from './content/ContentWrapper.jsx';
import Footer from './footer/Footer.jsx';
import RestClient from '../rest_client/restClient.js';

/**
 * This is the main layout of the web-page.
 */
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.restClient = new RestClient('', true);
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
            <Header restClient={this.restClient}/>
            <SideBar restClient={this.restClient}/>
            <ContentWrapper passRoute={this.state.route} restClient={this.restClient}/>
            <Footer/>
        </div>;
    }

}
