/**
 * Footer component (copyright, version#)
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import React from 'react/lib/React';

const STYLE = {
    mainFooter: {
        fontSize: "12px",
        padding: "0px"
    },
    footerLeft: {
        paddingLeft: "10px"
    },
    footerRight: {
        paddingRight: "10px"
    }
};

export default class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <footer className="main-footer" style={STYLE.mainFooter}>

            <strong style={STYLE.footerLeft}>&copy; 2016
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

            <div className="pull-right hidden-xs" style={STYLE.footerRight}>
                Version 0.1.0-beta1
            </div>

        </footer>;
    }

}
