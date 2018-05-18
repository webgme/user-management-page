/* globals window */
/**
 * Main app for SPA (Single Page Application)
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
// Self-defined
import Footer from './footer/Footer';
import Header from './header/Header';
import RestClient from '../../client/rest_client/restClient';
import SideBar from './sidebar/SideBar';
import ContentWrapper from '../../common/components/content/ContentWrapper';
import HomePage from '../../common/containers/content/pages/HomePage';
import OrganizationPage from '../../common/containers/content/pages/OrganizationPage';
import OrganizationsPage from '../../common/containers/content/pages/OrganizationsPage';
import ProfilePage from '../../common/containers/content/pages/ProfilePage';
import ProjectPage from '../../common/containers/content/pages/ProjectPage';
import ProjectsPage from '../../common/containers/content/pages/ProjectsPage';
import UserPage from '../../common/containers/content/pages/UserPage';
import UsersPage from '../../common/containers/content/pages/UsersPage';
import NewUserPage from '../../common/containers/content/pages/NewUserPage';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.restClient = new RestClient();
        // Set the referrer in the session store (if not already set)
        if (window.top === window && typeof window.sessionStorage.getItem('originalReferrer') !== 'string') {
            window.sessionStorage.setItem('originalReferrer', window.document.referrer);
        }
    }

    render() {
        const { themeColor, basePath } = this.props;
        const { pathname } = this.props.location;
        const {restClient} = this;

        // Passing props through the route
        // let ContentWrapperWithRestClient = React.Children.map(this.props.children,
        //     child => React.cloneElement(child, {restClient}));

        console.log(basePath);

        // Wrapper can be "skin-blue, skin-black, skin-purple, skin-yellow, skin-red, or skin-green"
        return (
            <div className={`wrapper skin-${themeColor}`}>

                <Header basePath={this.props.basePath}
                    pathname={pathname} />

                <SideBar pathname={pathname} />

                <Route
                    exact
                    path={`${basePath}`}
                    render={() => (
                        <ContentWrapper restClient={restClient}>
                            <HomePage pathname={pathname}/>
                        </ContentWrapper>)
                    }
                />
                <Route
                    exact
                    path={`${basePath}home`}
                    render={() => (
                        <ContentWrapper restClient={restClient}>
                            <HomePage pathname={pathname}/>
                        </ContentWrapper>)
                    }
                />
                <Route
                    exact
                    path={`${basePath}organizations`}
                    render={() => (
                        <ContentWrapper restClient={restClient}>
                            <OrganizationsPage pathname={pathname}/>
                        </ContentWrapper>)
                    }
                />
                <Route
                    exact
                    path={`${basePath}organizations/:organizationId`}
                    render={() => (
                        <ContentWrapper restClient={restClient}>
                            <OrganizationPage pathname={pathname}/>
                        </ContentWrapper>)
                    }
                />
                <Route
                    exact
                    path={`${basePath}profile`}
                    render={() => (
                        <ContentWrapper restClient={restClient}>
                            <ProfilePage pathname={pathname}/>
                        </ContentWrapper>)
                    }
                />

                <Route
                    exact
                    path={`${basePath}projects`}
                    render={() => (
                        <ContentWrapper restClient={restClient}>
                            <ProjectsPage pathname={pathname}/>
                        </ContentWrapper>)
                    }
                />

                <Route
                    exact
                    path={`${basePath}projects/:ownerId`}
                    render={() => (
                        <ContentWrapper restClient={restClient}>
                            <ProjectsPage pathname={pathname}/>
                        </ContentWrapper>)
                    }
                />

                <Route
                    exact
                    path={`${basePath}projects/:ownerId/:projectName`}
                    render={() => (
                        <ContentWrapper restClient={restClient}>
                            <ProjectPage pathname={pathname}/>
                        </ContentWrapper>)
                    }
                />

                <Route
                    exact
                    path={`${basePath}users`}
                    render={() => (
                        <ContentWrapper restClient={restClient}>
                            <UsersPage pathname={pathname}/>
                        </ContentWrapper>)
                    }
                />

                <Route
                    exact
                    path={`${basePath}users/:userId`}
                    render={() => (
                        <ContentWrapper restClient={restClient}>
                            <UserPage pathname={pathname}/>
                        </ContentWrapper>)
                    }
                />

                <Route
                    exact
                    path={`${basePath}newuser`}
                    render={() => (
                        <ContentWrapper restClient={restClient}>
                            <NewUserPage pathname={pathname}/>
                        </ContentWrapper>)
                    }
                />

                <Footer/>

            </div>
        );
    }

}

App.propTypes = {
    themeColor: PropTypes.string.isRequired
};
