import React from 'react';

export default class ContentWrapperHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <section className="content-header">
            <h1>
                WebGME Management:
                <small> ...(optional)... </small>
            </h1>
            <ol className="breadcrumb">
                <li>
                    <a href="#"><i className="fa fa-dashboard"/> Level</a>
                </li>
                <li className="active">Here
                </li>
            </ol>
        </section>;
    }

}
