/* globals window */
/**
 * Main app for SPA (Single Page Application)
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
// Self-defined
import Footer from './footer/Footer';
import Header from './header/Header';
import RestClient from '../../client/rest_client/restClient';
import SideBar from './sidebar/SideBar';
import HomePage from '../../common/containers/content/pages/HomePage';
import OrganizationPage from '../../common/containers/content/pages/OrganizationPage';
import OrganizationsPage from '../../common/containers/content/pages/OrganizationsPage';
import ProfilePage from '../../common/containers/content/pages/ProfilePage';
import ProjectPage from '../../common/containers/content/pages/ProjectPage';
import ProjectsPage from '../../common/containers/content/pages/ProjectsPage';
import UserPage from '../../common/containers/content/pages/UserPage';
import UsersPage from '../../common/containers/content/pages/UsersPage';
import NewUserPage from '../../common/containers/content/pages/NewUserPage';
import StatusPage from '../../common/containers/content/pages/StatusPage';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.restClient = new RestClient(this.props.basePath + 'api/');
        // Set the referrer in the session store (if not already set)
        if (window.top === window && typeof window.sessionStorage.getItem('originalReferrer') !== 'string') {
            window.sessionStorage.setItem('originalReferrer', window.document.referrer);
        }
    }

    render() {
        const {themeColor, siteAdmin, basePath} = this.props;
        const {pathname} = this.props.location;
        const {restClient} = this;

        // Wrapper can be "skin-blue, skin-black, skin-purple, skin-yellow, skin-red, or skin-green"
        return (
            <div className={`wrapper skin-${themeColor}`}>

                <Header
                    basePath={this.props.basePath}
                    pathname={pathname}
                />

                <SideBar pathname={pathname} siteAdmin={siteAdmin}/>
                <div className="content-wrapper">
                    <section className="content-header"/>
                    <Route
                        exact
                        path={`${basePath}`}
                        render={() => (<Redirect to={`${basePath}home`}/>)
                        }
                    />
                    <Route
                        exact
                        path={`${basePath}home`}
                        render={() => (<HomePage pathname={pathname} restClient={restClient}/>)
                        }
                    />
                    <Route
                        exact
                        path={`${basePath}organizations`}
                        render={() => (<OrganizationsPage pathname={pathname} restClient={restClient}/>)
                        }
                    />
                    <Route
                        exact
                        path={`${basePath}organizations/:organizationId`}
                        render={({match}) => (
                            <OrganizationPage pathname={pathname} params={match.params} restClient={restClient}/>)
                        }
                    />
                    <Route
                        exact
                        path={`${basePath}profile`}
                        render={() => (<ProfilePage pathname={pathname} restClient={restClient}/>)
                        }
                    />

                    <Route
                        exact
                        path={`${basePath}projects`}
                        render={() => (<ProjectsPage pathname={pathname} restClient={restClient}/>)
                        }
                    />

                    <Route
                        exact
                        path={`${basePath}projects/:ownerId`}
                        render={({match}) => (
                            <ProjectsPage pathname={pathname} params={match.params} restClient={restClient}/>)
                        }
                    />

                    <Route
                        exact
                        path={`${basePath}projects/:ownerId/:projectName`}
                        render={({match}) => (
                            <ProjectPage pathname={pathname} params={match.params} restClient={restClient}/>)
                        }
                    />

                    <Route
                        exact
                        path={`${basePath}users`}
                        render={() => (<UsersPage pathname={pathname} restClient={restClient}/>)
                        }
                    />

                    <Route
                        exact
                        path={`${basePath}users/:userId`}
                        render={({match}) => (
                            <UserPage pathname={pathname} params={match.params} restClient={restClient}/>)
                        }
                    />

                    <Route
                        exact
                        path={`${basePath}newuser`}
                        render={() => (<NewUserPage pathname={pathname} restClient={restClient}/>)
                        }
                    />

                    <Route
                        exact
                        path={`${basePath}status`}
                        render={() => (<StatusPage pathname={pathname} restClient={restClient}/>)
                        }
                    />
                </div>
                <Footer/>
            </div>
        );
    }

}

App.propTypes = {
    themeColor: PropTypes.string.isRequired,
    siteAdmin: PropTypes.bool
};
