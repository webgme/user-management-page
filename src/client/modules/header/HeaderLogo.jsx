/*globals*/
import React from 'react'

export default class HeaderLogo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <a href="" className="logo">
                <span className="logo-mini"><b>GME</b></span>
                <span className="logo-lg"><b>GME</b>Profile</span>
            </a>
    }
}
