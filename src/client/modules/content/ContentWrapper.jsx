/* global window */
import React from 'react';
import {Router, Route, hashHistory, browserHistory} from 'react-router';
import ProjectsPage from './pages/ProjectsPage.jsx';

export default class ContentWrapper extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

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

            {this.props.children || <ProjectsPage/>}

        </div>;
    }

}
