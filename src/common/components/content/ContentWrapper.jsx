/**
 * Content Wrapper - holds all the individual pages
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, {Component} from 'react';

export default class ContentWrapper extends Component {

    render() {
        const {restClient} = this.props;

        const PageWithRestClient = React.cloneElement(
            React.Children.only(this.props.children, {
                restClient
            }));

        return (
            <div className="content-wrapper">

                <section className="content-header">
                    {/* <h2 style={{fontFamily: "Garamond", fontWeight: 680}}>
                    WebGME Management
                    <small> ...(optional)... </small>
                </h2>*/}
                </section>

                {PageWithRestClient}

            </div>);
    }
}
