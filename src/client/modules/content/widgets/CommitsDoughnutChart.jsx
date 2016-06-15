/**
 * DoughnutChart widget for Commits
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import DoughnutChart from 'react-chartjs/lib/doughnut';
import React from 'react/lib/React';
// Self-defined
import {getRandomColorHex, shadeColor} from '../../../utils/utils.js';

export default class CommitsDoughnutChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            commits: this.props.commits || [],
            data: [],
            display: 1, // 1 indicates total commits, 2 indicates only user's commits
            userId: ''
        };
        // Data retrieval
        this.retrieveAllData = this.retrieveAllData.bind(this);
        this.processCommits = this.processCommits.bind(this);
        this.retrieveCommits = this.retrieveCommits.bind(this);
        this.retrieveUserId = this.retrieveUserId.bind(this);
        // Event handler
        this.toggleView = this.toggleView.bind(this);
    }

    componentWillMount() {
        if (this.state.commits.length === 0) { // Parent did not pass down commits
            this.retrieveAllData();
        } else {
            this.retrieveUserId()
                .then(userId => {
                    this.processCommits(userId);
                });
        }
    }

    retrieveAllData() {
        Promise.all([this.retrieveCommits(), this.retrieveUserId()])
            .then(([, userId]) => { // Instead of first argument, use from state
                this.processCommits(userId);
            });
    }

    processCommits(userId) {

        let data = [];
        Object.keys(this.state.commits).forEach(projectKey => {

            let filteredCommits = this.state.commits[projectKey];
            if (this.state.display === 2) {
                filteredCommits = filteredCommits.filter(eachCommit => {
                    return eachCommit.updater.indexOf(userId) !== -1;
                });
            }

            let randomColor = getRandomColorHex();
            data.push({
                value: filteredCommits.length || 0,
                color: randomColor,
                highlight: shadeColor(randomColor, 20),
                label: projectKey
            });
        });

        this.setState({
            data: data
        });
    }

    retrieveCommits(numCommits = 100) {

        return this.props.restClient.projects.getAllProjects() // These are the ones user has access to
            .then(allProjects => {

                let commits = {}, // Hash of projectName to array of commits
                    projectsCommitRequests = [],
                    projectNames = [];

                allProjects.forEach(project => {
                    projectsCommitRequests.push(
                        this.props.restClient.projects.getLatestCommits(project.owner, project.name, numCommits)
                    );
                    projectNames.push(project.name);
                });

                return Promise.all(projectsCommitRequests)
                    .then(projectsCommits => {
                        projectsCommits.forEach((commitsForOneProject, index) => {
                            commits[projectNames[index]] = commitsForOneProject;
                        });

                        this.setState({
                            commits: commits
                        });
                    });
            });
    }

    retrieveUserId() {
        return this.props.restClient.user.getCurrentUser()
            .then(currentUserInfo => {
                return currentUserInfo._id;
            });
    }

    toggleView(event) {
        let oldDisplay = this.state.display,
            newDisplay;
        if (event.target.innerHTML === 'Total Commits') {
            newDisplay = 1;
        } else if (event.target.innerHTML === 'Only My Commits') {
            newDisplay = 2;
        }

        if (oldDisplay !== newDisplay) {
            this.setState({
                display: newDisplay
            });
            this.retrieveAllData();
        }
    }

    render() {
        return (
            <div className="col-md-6">
                <div className="box box-info">
                    <div className="box-header with-border">
                        <h3 className="box-title">All Latest Commits By Project</h3>

                        <div className="box-tools pull-right">
                            <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                <i className="fa fa-minus"/>
                            </button>
                            <ButtonGroup>
                                <Button bsStyle={this.state.display === 1 ? "primary" : null}
                                        onClick={this.toggleView}>Total Commits
                                </Button>
                                <Button bsStyle={this.state.display === 2 ? "primary" : null}
                                        onClick={this.toggleView}>Only My Commits
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>

                    <div className="box-body">
                        <div className="chart">
                            <DoughnutChart data={this.state.data} options={{}} redraw/>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
