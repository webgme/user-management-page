/* global window */

/**
 * Individual project page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
// Self defined
import ProjectAuthorizationWidget from
    '../../../containers/content/widgets/authorization_widget/ProjectAuthorizationWidget';
import ProjectCollaboratorTable from '../../../containers/content/widgets/data_tables/ProjectCollaboratorTable';
import ProjectSelectableChart from '../../../containers/content/widgets/charts/ProjectSelectableChart';
import ProjectTransferWidget from '../../../containers/content/widgets/ProjectTransferWidget';
import { fetchOrganizationsIfNeeded } from '../../../actions/organizations';
import { fetchUserIfNeeded } from '../../../actions/user';
import { fetchUsersIfNeeded } from '../../../actions/users';
import { ProjectPage as STYLE } from '../../../../client/style';

export default class ProjectPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchOrganizationsIfNeeded());
        dispatch(fetchUserIfNeeded());
        dispatch(fetchUsersIfNeeded());
    }

    render() {
        const { canAuthorize, canTransfer } = this.props;
        const { ownerId, projectName } = this.props.params;
        const { user, restClient } = this.props;

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

            </section>
        );
    }

}

ProjectPage.propTypes = {
    canAuthorize: PropTypes.bool.isRequired,
    canTransfer: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
};
