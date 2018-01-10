/**
 * Footer component (copyright, version#)
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
// Style
import { Footer as STYLE } from '../../../client/style';

export default class Footer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="main-footer" style={STYLE.mainFooter}>

                <strong style={STYLE.footerLeft}>&copy; 2018
                    <a href="https://www.vanderbilt.edu" target="_blank">
                        &nbsp;Vanderbilt University
                    </a>
                    <a href="https://www.isis.vanderbilt.edu" target="_blank">
                        &nbsp;ISIS
                    </a>
                    <a href="https://www.webgme.org" target="_blank">
                        &nbsp;WebGME
                    </a>
                </strong>

                <span className="pull-right hidden-xs" style={STYLE.footerRight}>
                    <a href="https://github.com/webgme/user-management-page/releases" target="_blank">v0.3.4</a>
                </span>

            </footer>
        );
    }

}
