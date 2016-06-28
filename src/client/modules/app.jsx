/**
 * Main app for SPA (Single Page Application)
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';
// Self-defined components
import Footer from './footer/Footer';
import Header from './header/Header';
import RestClient from '../rest_client/restClient';
import SideBar from './sidebar/SideBar';
import {THEME_COLORS} from '../utils/utils';

/**
 * This is the main layout of the web-page.
 */
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.restClient = new RestClient();
        this.state = {
            themeColor: 'purple'
        };
        // Event handlers
        this.handleColorSwitch = this.handleColorSwitch.bind(this);
    }

    handleColorSwitch(event) {
        let themeColor;
        if (event.target.outerHTML.length > 20) {
            let rgbString = event.target.outerHTML.match(/background-color: (.*?);/)[1];
            themeColor = Object.keys(THEME_COLORS).filter(color => {
                return THEME_COLORS[color] === rgbString;
            })[0];
        } else {
            themeColor = event.target.innerHTML.toLowerCase();
        }
        this.setState({
            themeColor: themeColor
        });
    }

    render() {

        // Passing props through the route
        let ContentWrapperWithRestClient = React.Children.map(this.props.children,
            child => React.cloneElement(child, {
                basePath: this.props.route.basePath,
                restClient: this.restClient,
                themeColor: this.state.themeColor
            }));

        // Wrapper can be "skin-blue, skin-black, skin-purple, skin-yellow, skin-red, or skin-green"
        return <div className={`wrapper skin-${this.state.themeColor}`}>

            <Header restClient={this.restClient}
                    handleColorSwitch={this.handleColorSwitch}
                    basePath={this.props.route.basePath}/>

            <SideBar restClient={this.restClient}
                     location={this.props.location}
                     basePath={this.props.route.basePath}/>

            {ContentWrapperWithRestClient}

            <Footer/>

        </div>;
    }

}
