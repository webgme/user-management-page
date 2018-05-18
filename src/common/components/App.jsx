/* globals window */
/**
 * Main app for SPA (Single Page Application)
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Self-defined
import Footer from './footer/Footer';
import Header from './header/Header';
import RestClient from '../../client/rest_client/restClient';
import SideBar from './sidebar/SideBar';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.restClient = new RestClient();
        // Set the referrer in the session store (if not already set)
        if (window.top === window && typeof window.sessionStorage.getItem('originalReferrer') !== 'string') {
            window.sessionStorage.setItem('originalReferrer', window.document.referrer);
        }
    }

    render() {
        const { themeColor } = this.props;
        const { pathname } = this.props.location;
        const {restClient} = this;

        // Passing props through the route
        let ContentWrapperWithRestClient = React.Children.map(this.props.children,
            child => React.cloneElement(child, {
                pathname,
                restClient
            }));

        // Wrapper can be "skin-blue, skin-black, skin-purple, skin-yellow, skin-red, or skin-green"
        return (
            <div className={`wrapper skin-${themeColor}`}>

                <Header basePath={this.props.basePath}
                    pathname={pathname} />

                <SideBar pathname={pathname} />

                {ContentWrapperWithRestClient}

                <Footer/>

            </div>
        );
    }

}

App.propTypes = {
    themeColor: PropTypes.string.isRequired
};
