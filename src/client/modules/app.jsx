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
/**
 * This is the main layout of the web-page.
 */
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.restClient = new RestClient();
        this.state = {
            headerColor: 'purple'
        };
        // Event handlers
        this.handleColorSwitch = this.handleColorSwitch.bind(this);
    }

    handleColorSwitch(event) {
        let headerColor;
        if (event.target.outerHTML.length > 20) {
            headerColor = event.target.outerHTML
                .match(/background-color: \w+/)[0]
                .replace('background-color: ', '');
        } else {
            headerColor = event.target.innerHTML.toLowerCase();
        }
        this.setState({
            headerColor: headerColor
        });
    }

    render() {

        // Passing props through the route
        let ContentWrapperWithRestClient = React.Children.map(this.props.children,
            child => React.cloneElement(child, {
                restClient: this.restClient,
                basePath: this.props.route.basePath
            }));

        // Wrapper can be "skin-blue, skin-black, skin-purple, skin-yellow, skin-red, or skin-green"
        return <div className={`wrapper skin-${this.state.headerColor}`}>

            <Header restClient={this.restClient}
                    headerColor={this.state.headerColor}
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
