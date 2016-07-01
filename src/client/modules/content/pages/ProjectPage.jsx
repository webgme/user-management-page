/* global window */

/**
 * Individual project page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import Button from 'react-bootstrap/lib/Button';
import React from 'react/lib/React';
// Self defined
import CollaboratorsCommitsBarChart from '../widgets/charts/CollaboratorsCommitsBarChart';
import ProjectAuthorizationWidget from '../widgets/authorization_widget/ProjectAuthorizationWidget';
import ProjectCollaboratorTable from '../widgets/data_tables/ProjectCollaboratorTable';

export default class ProjectPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshTable: false
        };
        // Event Handlers
        this.refreshTable = this.refreshTable.bind(this);
    }

    refreshTable() {
        this.setState({
            refreshTable: !this.state.refreshTable
        });
    }

    render() {

        return (
            <section className="content">

                <div className="box box-primary">
                    <div className="row">
                        <h2 className="col-md-10" style={{paddingLeft: "30px", paddingTop: "14px"}}>
                            <i className="fa fa-cube"/>{` ${this.props.params.ownerId} / ${this.props.params.projectName}`}
                        </h2>
                        <div className="col-md-2" style={{paddingRight: "30px", paddingTop: "14px"}}>
                            <a href={"/?project=" + window.encodeURIComponent(`${this.props.params.ownerId}+${this.props.params.projectName}`)}>
                                <Button bsStyle="primary" style={{float: "right"}}>
                                    Open in editor
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-6">

                        <ProjectCollaboratorTable ownerId={this.props.params.ownerId}
                                                  projectName={this.props.params.projectName}
                                                  refreshTable={this.state.refreshTable}
                                                  restClient={this.props.restClient}/>

                    </div>

                    <div className="col-md-6">

                        <ProjectAuthorizationWidget ownerId={this.props.params.ownerId}
                                                    projectName={this.props.params.projectName}
                                                    refreshTable={this.refreshTable}
                                                    restClient={this.props.restClient}/>

                        <div className="row">
                            <CollaboratorsCommitsBarChart options={{}}
                                                          ownerId={this.props.params.ownerId}
                                                          projectName={this.props.params.projectName}
                                                          restClient={this.props.restClient}
                                                          title="Latest Commits"/>
                        </div>

                    </div>
                </div>

            </section>
        );
    }

}
