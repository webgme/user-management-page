import React from 'react';

export default class ToggleSidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span className="sr-only">Toggle navigation</span>
        </a>
    }
}