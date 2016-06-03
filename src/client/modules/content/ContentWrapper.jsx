import React from '../../../../node_modules/react/lib/React';

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
