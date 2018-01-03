/* global window */

/**
 * Individual project page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
// Self defined
import ProjectAuthorizationWidget from
    '../../../containers/content/widgets/authorization_widget/ProjectAuthorizationWidget';
import ProjectCollaboratorTable from '../../../containers/content/widgets/data_tables/ProjectCollaboratorTable';
import ProjectSelectableChart from '../../../containers/content/widgets/charts/ProjectSelectableChart';
import ProjectTransferWidget from '../../../containers/content/widgets/ProjectTransferWidget';
import CustomModal from '../widgets/CustomModal';
import {fetchProjects, fetchProjectsIfNeeded} from '../../../actions/projects';
import {fetchOrganizations, fetchOrganizationsIfNeeded} from '../../../actions/organizations';
import { fetchUser, fetchUserIfNeeded } from '../../../actions/user';
import { fetchUsers, fetchUsersIfNeeded } from '../../../actions/users';
import { ProjectPage as STYLE, ProfileBox as MORE_STYLES } from '../../../../client/style';

export default class ProjectPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };

        this.deleteProject = this.deleteProject.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.confirmModal = this.confirmModal.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchOrganizationsIfNeeded());
        dispatch(fetchUserIfNeeded());
        dispatch(fetchUsersIfNeeded());
        dispatch(fetchProjectsIfNeeded());
    }

    deleteProject() {
        const {dispatch} = this.props;
        this.props.restClient.projects.deleteProject(this.props.params.ownerId, this.props.params.projectName)
            .then(() => {
                dispatch(fetchProjects());
                dispatch(fetchUsers());
                dispatch(fetchUser());
                dispatch(fetchOrganizations());
            })
            .catch(() => {
                dispatch(fetchProjects());
            });
    }

    showModal() {
        this.setState({
            showModal: true
        });
    }

    hideModal() {
        this.setState({
            showModal: false
        });
    }

    confirmModal() {
        this.setState({
            showModal: false
        }, this.deleteProject());
    }

    render() {
        const { canAuthorize, canTransfer, canDelete, exists } = this.props;
        const { ownerId, projectName } = this.props.params;
        const { user, restClient } = this.props;

        if (!exists) {
            return (<section className="content">
                <Link to={`${this.props.basePath}projects`}>
                    {`No such project '${ownerId} / ${projectName}', back to projects ...`}
                </Link>
            </section>);
        }

        return (
            <section className="content">

                <div className="box box-primary" style={STYLE.titleBox}>
                    <div className="row">
                        <div className="col-md-12" style={STYLE.titleContainer}>
                            <div style={STYLE.projectTitle}>
                                <i className="fa fa-cube"/>{` ${ownerId} / ${projectName}`}
                            </div>
                            <a className="pull-right" href={"/?project=" + window.encodeURIComponent(`${ownerId}+${projectName}`)}>
                                <Button bsStyle="primary" style={STYLE.viewInEditor.button}>
                                    View in editor
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-6">

                        <ProjectCollaboratorTable canAuthorize={canAuthorize}
                                                  ownerId={ownerId}
                                                  projectName={projectName}
                                                  restClient={restClient} />

                    </div>

                    <div className="col-md-6">

                        <ProjectAuthorizationWidget canAuthorize={canAuthorize}
                                                    ownerId={ownerId}
                                                    projectName={projectName}
                                                    restClient={restClient} />

                        <ProjectTransferWidget canTransfer={canTransfer}
                                               ownerId={ownerId}
                                               projectName={projectName}
                                               restClient={restClient}
                                               userId={user ? user._id : ''} />

                        <ProjectSelectableChart ownerId={ownerId}
                                                height={300}
                                                width={500}
                                                projectName={projectName} />

                    </div>

                </div>

                {canDelete ?
                    <Button bsStyle="danger"
                            onClick={this.showModal}>
                        Delete Project ...
                    </Button> : null}

                <CustomModal cancelButtonMessage="Cancel"
                             cancelButtonStyle="default"
                             closeHandler={this.hideModal}
                             confirmButtonMessage="OK"
                             confirmButtonStyle="danger"
                             confirmHandler={this.confirmModal}
                             confirmId={`${ownerId}+${projectName}`}
                             modalMessage={
                                     'Are you sure you want to delete ' + ownerId + ' / ' + projectName + '?' +
                                     ' A deleted project will be removed from the database and cannot be recovered..'
                             }
                             showModal={this.state.showModal}
                             title="Delete Project"/>
            </section>
        );
    }

}

ProjectPage.propTypes = {
    canAuthorize: PropTypes.bool.isRequired,
    canTransfer: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
};
