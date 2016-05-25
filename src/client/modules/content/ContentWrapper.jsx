/* global window */
import React from 'react';
import OrganizationsPage from './pages/OrganizationsPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import UserProfilePage from './pages/UserProfilePage.jsx';
import {Router, Route, hashHistory, browserHistory} from 'react-router';

export default class ContentWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.restClient = props.restClient;
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

            <Router>
                <Route path="/projects" component={ProjectsPage}/>
                <Route path="/profile" component={UserProfilePage}/>
                <Route path="/organizations" component={OrganizationsPage}/>
            </Router>
            
        </div>;
    }

}

ContentWrapper.propTypes = {
    passRoute: React.PropTypes.string,
    restClient: React.PropTypes.Object
};
