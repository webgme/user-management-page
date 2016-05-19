import React from 'react'
import Header from './header/Header.jsx'
import SideBar from './sidebar/SideBar.jsx'
import ContentWrapper from './content/ContentWrapper.jsx'
import Footer from './footer/Footer.jsx'

/**
 * This is the main layout of the web-page.
 */
export default class App extends React.Component {

    constructor(props) {
        super(props);
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
     * @returns {XML}
     */
    render() {
        return <div className="wrapper skin-blue">
            <Header/>
            <SideBar/>
            <ContentWrapper/>
            <Footer/>
        </div>
    }
}