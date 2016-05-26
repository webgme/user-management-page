/* global window */
import React from 'react';
import Header from './header/Header.jsx';
import SideBar from './sidebar/SideBar.jsx';
import ContentWrapper from './content/ContentWrapper.jsx';
import Footer from './footer/Footer.jsx';
import RestClient from '../rest_client/restClient.js';
import {Route} from 'react-router';

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

        console.log('in app', this.props);
        return <div className="wrapper skin-blue">
            <Header/>
            <SideBar restClient={this.restClient}/>
            {this.props.children} {/*<-- This is the ContentWrapper*/}
            <Footer/>
        </div>;
    }

}
