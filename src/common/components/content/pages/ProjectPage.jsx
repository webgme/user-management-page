/* global window */

/**
 * Individual project page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
// Self defined
import CollaboratorsCommitsBarChart from '../widgets/charts/CollaboratorsCommitsBarChart';
import ProjectAuthorizationWidget from '../../../containers/content/pages/widgets/authorization_widget/ProjectAuthorizationWidget';
import ProjectCollaboratorTable from '../widgets/data_tables/ProjectCollaboratorTable';
import { canUserAuthorize } from '../../../../client/utils/restUtils';
import { fetchOrganizationsIfNeeded } from '../../../actions/organizations';
import { fetchUserIfNeeded } from '../../../actions/user';

class ProjectPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchOrganizationsIfNeeded());
        dispatch(fetchUserIfNeeded());
    }

    render() {

        const { authorization } = this.props;
        const { ownerId, projectName } = this.props.params;

        return (
            <section className="content">

                <div className="box box-primary">
                    <div className="row">
                        <h2 className="col-md-10" style={{paddingLeft: "30px", paddingTop: "14px"}}>
                            <i className="fa fa-cube"/>{` ${ownerId} / ${projectName}`}
                        </h2>
                        <div className="col-md-2" style={{paddingRight: "30px", paddingTop: "14px"}}>
                            <a href={"/?project=" + window.encodeURIComponent(`${ownerId}+${projectName}`)}>
                                <Button bsStyle="primary" style={{float: "right"}}>
                                    View in editor
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-6">

                        <ProjectCollaboratorTable authorization={authorization}
                                                  ownerId={ownerId}
                                                  projectName={projectName}
                                                  restClient={this.props.restClient} />

                    </div>

                    <div className="col-md-6">

                        <ProjectAuthorizationWidget authorization={authorization}
                                                    ownerId={ownerId}
                                                    projectName={projectName}
                                                    restClient={this.props.restClient} />

                        <div className="row">
                            <CollaboratorsCommitsBarChart options={{}}
                                                          ownerId={ownerId}
                                                          projectName={projectName}
                                                          restClient={this.props.restClient}
                                                          title="Latest Commits" />
                        </div>

                    </div>
                </div>

            </section>
        );
    }

}

ProjectPage.propTypes = {
    authorization: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const { organizations } = state.organizations;
    const { user } = state.user;
    const { ownerId } = ownProps.params;

    let authorization = canUserAuthorize(user, organizations, ownerId);

    return {
        authorization
    };
};

export default connect(mapStateToProps)(ProjectPage);
