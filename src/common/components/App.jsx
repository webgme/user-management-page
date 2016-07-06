/**
 * Main app for SPA (Single Page Application)
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
// Self-defined
import Footer from './footer/Footer';
import Header from './header/Header';
import RestClient from '../../client/rest_client/restClient';
import SideBar from './sidebar/SideBar';

/**
 * This is the main layout of the web-page.
 */
export default class App extends Component {

    constructor(props) {
        super(props);
        this.restClient = new RestClient();
    }

    render() {
        const { themeColor } = this.props;

        // Passing props through the route
        let ContentWrapperWithRestClient = React.Children.map(this.props.children,
            child => React.cloneElement(child, {
                basePath: this.props.route.basePath,
                restClient: this.restClient
            }));

        // Wrapper can be "skin-blue, skin-black, skin-purple, skin-yellow, skin-red, or skin-green"
        return (
            <div className={`wrapper skin-${themeColor}`}>

                <Header restClient={this.restClient}
                        basePath={this.props.route.basePath}/>

                <SideBar restClient={this.restClient}
                         location={this.props.location}
                         basePath={this.props.route.basePath}/>

                {ContentWrapperWithRestClient}

                <Footer/>

            </div>
        );
    }

}

App.propTypes = {
    themeColor: PropTypes.string.isRequired
};
