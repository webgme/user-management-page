import React from 'react';

export default class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <footer className="main-footer">
            <div className="pull-right hidden-xs">
                WebGME Profile
            </div>
            <strong>Copyright &copy; 2016 <a href="https://webgme.org" target="_blank">
                Vanderbilt University ISIS WebGME
            </a>.</strong> All rights reserved.
        </footer>
    }
}