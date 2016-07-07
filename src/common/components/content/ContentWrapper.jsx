/**
 * Content Wrapper - holds all the individual pages
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react';

export default class ContentWrapper extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let PageWithRestClient = React.cloneElement(this.props.children, {
            restClient: this.props.restClient
        });

        return <div className="content-wrapper">

            <section className="content-header">
                {/* <h2 style={{fontFamily: "Garamond", fontWeight: 680}}>
                    WebGME Management
                    <small> ...(optional)... </small>
                </h2>*/}
            </section>

            {PageWithRestClient}

        </div>;
    }

}
