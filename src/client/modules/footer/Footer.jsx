/**
 * Footer component (copyright, version#)
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import React from 'react/lib/React';

export default class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <footer className="main-footer" style={{padding: "0px"}}>

            <strong>&copy; 2016
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

            <div className="pull-right hidden-xs">
                Version 0.1.0-beta1
            </div>

        </footer>;
    }

}
