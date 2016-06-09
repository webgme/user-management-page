// Libraries
import React from '../../../node_modules/react/lib/React';
// Self-defined components
import Header from './header/Header.jsx';
import SideBar from './sidebar/SideBar.jsx';
import Footer from './footer/Footer.jsx';
import RestClient from '../rest_client/restClient.js';

/**
 * This is the main layout of the web-page.
 */
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.restClient = new RestClient('');
        this.state = {
            headerColor: 'purple'
        };
        this.handleColorSwitch = this.handleColorSwitch.bind(this);
    }

    handleColorSwitch(event) {
        let finalColor;
        if (event.target.outerHTML.length > 20) {
            finalColor = event.target.outerHTML
                .match(/background-color: \w+/)[0]
                .replace('background-color: ', '');
        } else {
            finalColor = event.target.innerHTML.toLowerCase();
        }
        this.setState({
            headerColor: finalColor
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

        // Passing props through the route
        let ContentWrapperWithRestClient = React.Children.map(this.props.children,
            child => React.cloneElement(child, {
                restClient: this.restClient
            }));

        // Wrapper can be "skin-blue, skin-black, skin-purple, skin-yellow, skin-red, or skin-green"
        return <div className={"wrapper skin-" + this.state.headerColor}>
            <Header restClient={this.restClient}
                    headerColor={this.state.headerColor}
                    handleColorSwitch={this.handleColorSwitch}/>
            <SideBar restClient={this.restClient} location={this.props.location}/>
            {ContentWrapperWithRestClient}
            <Footer/>
        </div>;
    }

}
