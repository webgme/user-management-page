/**
 * Content Wrapper - holds all the individual pages
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import Link from 'react-router/lib/Link';
import React from 'react/lib/React';
// Self-defined
import {capitalizeFirstLetter} from '../../utils/utils';

const STYLING = {
    breadCrumbIcon: {
        fontSize: "25px"
    },
    breadCrumbText: {
        fontSize: "13px"
    }
};

export default class ContentWrapper extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let PageWithRestClient = React.cloneElement(this.props.children, {
            restClient: this.props.restClient
        });

        let breadcrumbs = [],
            pathWithoutBase = this.props.location.pathname.replace(this.props.basePath, ''),
            parameters = pathWithoutBase.split('/');

        // Initial one for the page
        breadcrumbs.push(
            <li style={STYLING.breadCrumbText} key={0}>
                <Link to={`${this.props.basePath}${parameters[0]}`}>
                    {capitalizeFirstLetter(parameters[0])}
                </Link>
            </li>
        );

        Object.keys(this.props.params).forEach((oneParam, index) => {
            if (index === (Object.keys(this.props.params).length - 1)) {
                breadcrumbs.push(
                    <li style={STYLING.breadCrumbText} key={index + 1}>
                        <Link to={`${this.props.basePath}${pathWithoutBase}`}>
                            {capitalizeFirstLetter(this.props.params[oneParam])}
                        </Link>
                    </li>
                );
            } else {
                breadcrumbs.push(
                    <li style={STYLING.breadCrumbText} key={index + 1}>
                        {capitalizeFirstLetter(this.props.params[oneParam])}
                    </li>
                );
            }
        });

        return <div className="content-wrapper">

            <section className="content-header">
                {/* <h2 style={{fontFamily: "Garamond", fontWeight: 680}}>
                    WebGME Management
                    <small> ...(optional)... </small>
                </h2>*/}

                {/* Leaves space for breadcrumb */}
                <br/><br/>
                <ol className="breadcrumb">
                    <li style={STYLING.breadCrumbIcon}>
                        <Link to={this.props.basePath}>
                            <i className="fa fa-home"/>
                        </Link>
                    </li>

                    {breadcrumbs}

                </ol>
            </section>

            {PageWithRestClient}

        </div>;
    }

}
