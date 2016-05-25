import React from 'react';

export default class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <footer className="main-footer">

            <strong>Copyright &copy; 2016
                <a href="https://www.webgme.org" target="_blank">
                    Vanderbilt University ISIS WebGME
                </a>.All rights reserved.
            </strong>

            <div className="pull-right hidden-xs">
                Version 0.1.0-beta1
            </div>;

        </footer>;
    }

}
