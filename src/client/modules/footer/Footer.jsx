import React from 'react';
import FooterCopyright from './FooterCopyright.jsx';
import FooterRightCorner from './FooterRightCorner.jsx';

export default class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <footer className="main-footer">
            <FooterCopyright />
            <FooterRightCorner />
        </footer>;
    }

}
