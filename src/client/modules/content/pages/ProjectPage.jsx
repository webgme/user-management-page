/**
 * Individual project page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

/* global window, $ */

// Libraries
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
                <h2 style={{fontFamily: "-webkit-body"}}>
                    <i className="fa fa-cube"/>{` ${this.props.params.projectName} by ${this.props.params.ownerId}`}
                </h2>

                <div className="row">
                    <div className="col-md-6">

                        <ProjectCollaboratorTable ownerId={this.props.params.ownerId}
                                                  projectName={this.props.params.projectName}
                                                  refreshTable={this.state.refreshTable}
                                                  restClient={this.props.restClient}/>

                        <ProjectAuthorizationWidget ownerId={this.props.params.ownerId}
                                                    projectName={this.props.params.projectName}
                                                    restClient={this.props.restClient}
                                                    refreshTable={this.refreshTable}/>

                    </div>

                    <CollaboratorsCommitsBarChart height={$(window).height() / 1.8}
                                                 options={{}}
                                                 ownerId={this.props.params.ownerId}
                                                 projectName={this.props.params.projectName}
                                                 restClient={this.props.restClient}
                                                 title="Commits By Collaborator"
                                                 width={$(window).width() / 2.36}/>

                </div>

            </section>
        );
    }

}
