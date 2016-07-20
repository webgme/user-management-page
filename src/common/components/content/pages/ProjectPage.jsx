/* global window */

/**
 * Individual project page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
// Self defined
import CollaboratorsCommitsBarChart from '../../../containers/content/widgets/charts/CollaboratorsCommitsBarChart';
import CommitsLineChart from '../../../containers/content/widgets/charts/CommitsLineChart';
import ProjectAuthorizationWidget from
    '../../../containers/content/widgets/authorization_widget/ProjectAuthorizationWidget';
import ProjectCollaboratorTable from '../../../containers/content/widgets/data_tables/ProjectCollaboratorTable';
import ProjectTransferWidget from '../../../containers/content/widgets/ProjectTransferWidget';
import { fetchOrganizationsIfNeeded } from '../../../actions/organizations';
import { fetchUserIfNeeded } from '../../../actions/user';
import { fetchUsersIfNeeded } from '../../../actions/users';
import { ProjectPage as STYLE } from '../../../../client/style';

export default class ProjectPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chart: 'Line'
        };
        this.onChartChange = this.onChartChange.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchOrganizationsIfNeeded());
        dispatch(fetchUserIfNeeded());
        dispatch(fetchUsersIfNeeded());
    }

    onChartChange(event) {
        this.setState({
            chart: event.target.value
        });
        // Release focus
        event.target.blur();
    }

    render() {

        const { canAuthorize, canTransfer } = this.props;
        const { ownerId, projectName } = this.props.params;
        const { user, restClient } = this.props;

        const { chart } = this.state;

        return (
            <section className="content">

                <div className="box box-primary">
                    <div className="row">
                        <h2 className="col-md-10" style={STYLE.projectTitle}>
                            <i className="fa fa-cube"/>{` ${ownerId} / ${projectName}`}
                        </h2>
                        <div className="col-md-2" style={STYLE.viewInEditor.column}>
                            <a href={"/?project=" + window.encodeURIComponent(`${ownerId}+${projectName}`)}>
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
                                                    restClient={restClient}/>

                        <ProjectTransferWidget canTransfer={canTransfer}
                                               ownerId={ownerId}
                                               projectName={projectName}
                                               restClient={restClient}
                                               userId={user ? user._id : ''}/>

                        {chart === 'Bar' ?
                        <CollaboratorsCommitsBarChart onChartChange={this.onChartChange}
                                                      ownerId={ownerId}
                                                      projectName={projectName}
                                                      restClient={restClient}
                                                      title="Latest Commits"
                                                      whichChart={chart}/> : null}

                        {chart === 'Line' ?
                        <CommitsLineChart onChartChange={this.onChartChange}
                                          ownerId={ownerId}
                                          projectName={projectName}
                                          restClient={restClient}
                                          title="Latest Commits"
                                          whichChart={chart}/> : null}

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
