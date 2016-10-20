/**
 * Individual organization page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import {Button} from 'react-bootstrap';
// Self defined
import OrganizationAuthorizationWidget from
    '../../../containers/content/widgets/authorization_widget/OrganizationAuthorizationWidget';
import OrganizationTable from '../../../containers/content/widgets/data_tables/OrganizationTable';
import CustomModal from '../widgets/CustomModal';
import {fetchOrganizationsIfNeeded, fetchOrganizations} from '../../../actions/organizations';
import {fetchUserIfNeeded} from '../../../actions/user';
import {fetchProjectsIfNeeded} from '../../../actions/projects';
import {ProjectPage as PROJECT_STYLE, HomePage as HOME_STYLE, ProfileBox as STYLE} from '../../../../client/style';

export default class OrganizationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };

        this.deleteOrganization = this.deleteOrganization.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.confirmModal = this.confirmModal.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;

        dispatch(fetchOrganizationsIfNeeded());
        dispatch(fetchProjectsIfNeeded());
        dispatch(fetchUserIfNeeded());
    }

    deleteOrganization() {
        const {dispatch} = this.props;
        this.props.restClient.organizations.deleteOrganization(this.props.params.organizationId)
            .then(() => {
                dispatch(fetchOrganizations());
            })
            .catch(() => {
                dispatch(fetchOrganizations());
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

    confirmModal(event) {
        this.setState({
            showModal: false
        }, this.deleteOrganization(event));
    }

    render() {
        const {basePath, canAuthorize, organizationExists, user, ownedProjects} = this.props;
        let canDelete = user.siteAdmin === true,
            nbrOfOwnedProjects = ownedProjects.length;

        if (!organizationExists) {
            return (<section className="content">
                <Link to={`${this.props.basePath}organizations`}>
                    {`No such organization '${this.props.params.organizationId}', back to organizations ...`}
                </Link>
            </section>);
        }

        return (
            <section className="content">
                <div className="box box-primary" style={PROJECT_STYLE.titleBox}>
                    <div className="row">
                        <div className="col-md-12" style={PROJECT_STYLE.titleContainer}>
                            <div style={PROJECT_STYLE.projectTitle}>
                                <i className="fa fa-university"/>{' ' + this.props.params.organizationId}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="box box-primary">
                            <OrganizationTable canAuthorize={canAuthorize}
                                               organizationId={this.props.params.organizationId}
                                               ownerId={this.props.params.ownerId}
                                               restClient={this.props.restClient}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <OrganizationAuthorizationWidget canAuthorize={canAuthorize}
                                                         organizationId={this.props.params.organizationId}
                                                         restClient={this.props.restClient}/>
                    </div>
                    <div className="col-md-6">
                        <div className="small-box bg-light-blue">
                            <div className="inner">
                                <h3 style={HOME_STYLE.widgetBox}>{this.props.ownedProjects.length}</h3>
                                <p>{this.props.ownedProjects.length > 0 ?
                                    'Projects Owned by Organization' : 'No Projects Associated with Organization'}
                                </p>
                            </div>
                            <div className="icon">
                                <i className="fa fa-cubes"/>
                            </div>
                            <Link to={`${basePath}projects/${this.props.params.organizationId}`}
                                  className="small-box-footer">
                                Show Projects <i className="fa fa-arrow-circle-right"/>
                            </Link>
                        </div>
                    </div>
                </div>

                {canDelete ?
                    <Button bsStyle="danger"
                            onClick={this.showModal}
                            style={STYLE.deleteButton}>
                        Delete ...
                    </Button> : null}

                <CustomModal cancelButtonMessage="Cancel"
                             cancelButtonStyle="default"
                             closeHandler={this.hideModal}
                             confirmButtonMessage="OK"
                             confirmButtonStyle="danger"
                             confirmHandler={this.confirmModal}
                             confirmId={this.props.params.organizationId}
                             modalMessage={'Are you sure you want to delete ' + this.props.params.organizationId + '?' +
                              ' This organization owns ' + nbrOfOwnedProjects + ' project(s).' + (nbrOfOwnedProjects > 0 ?
                              ' Check projects table filtered by owner for full list. ' : ' ') +
                              'Deleted organizations still reside in the database with the extra property' +
                              ' "disabled: true" and can be recovered manually.'
                             }
                             showModal={this.state.showModal}
                             title="Delete Organization"/>
            </section>
        );
    }
}

OrganizationPage.propTypes = {
    basePath: PropTypes.string.isRequired,
    canAuthorize: PropTypes.bool.isRequired,
    ownedProjects: PropTypes.array.isRequired,
    params: PropTypes.shape({
        organizationId: React.PropTypes.string.isRequired
    })
};
