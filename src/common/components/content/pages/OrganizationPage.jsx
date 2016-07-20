/**
 * Individual organization page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
// Self defined
import OrganizationAuthorizationWidget from
    '../../../containers/content/widgets/authorization_widget/OrganizationAuthorizationWidget';
import OrganizationTable from '../../../containers/content/widgets/data_tables/OrganizationTable';
import {fetchOrganizationsIfNeeded} from '../../../actions/organizations';
import {fetchUserIfNeeded} from '../../../actions/user';
import {fetchProjectsIfNeeded} from '../../../actions/projects';
import {ProjectPage as PROJECT_STYLE, HomePage as HOME_STYLE} from '../../../../client/style';

export default class OrganizationPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {dispatch} = this.props;

        dispatch(fetchOrganizationsIfNeeded());
        dispatch(fetchProjectsIfNeeded());
        dispatch(fetchUserIfNeeded());
    }

    render() {
        const {basePath, canAuthorize} = this.props;

        return (

            <section className="content">
                {/* <h3> {this.props.params.organizationId} </h3> */}
                <div className="box box-primary">
                    <div className="row">
                        <h2 className="col-md-10" style={PROJECT_STYLE.projectTitle}>
                            <i className="fa fa-university"/>{' ' + this.props.params.organizationId}
                        </h2>
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
                        <div className="small-box bg-green">
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
