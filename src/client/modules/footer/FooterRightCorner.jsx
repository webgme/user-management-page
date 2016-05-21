import React from 'react';

export default class FooterCopyright extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="pull-right hidden-xs">
            Version 0.1.0-beta1
        </div>;
    }

}
