import React from 'react';

export default class FooterCopyright extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <strong>Copyright &copy; 2016
            <a href="https://www.webgme.org" target="_blank">
                Vanderbilt University ISIS WebGME
            </a>.All rights reserved.
        </strong>;
    }

}
