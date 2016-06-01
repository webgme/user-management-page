/* global window */
import React from 'react';

export default class ContentWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.restClient = this.props.restClient;
    }

    render() {

        let PageWithRestClient = React.cloneElement(this.props.children, {
            restClient: this.restClient
        });

        return <div className="content-wrapper">

            <section className="content-header">
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
            </section>

            {PageWithRestClient}

        </div>;
    }

}
