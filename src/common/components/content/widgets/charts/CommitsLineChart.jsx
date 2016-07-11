/**
 * LineChart widget for Commits
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Line as LineChart } from 'react-chartjs';
// Self-defined
import {convertHexToRGBA, getRandomColorHex, shadeColor,
        getPastWeeksDays,
        isEmpty } from '../../../../../client/utils/utils';

export default class CommitsLineChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            commits: this.props.commits || {}, // Map of projectName to commitArray
            data: {},
            display: 1, // 1 indicates total commits, 2 indicates only user's commits
            userId: ''
        };
        // Data retrieval
        this.processCommits = this.processCommits.bind(this);
        this.retrieveCommits = this.retrieveCommits.bind(this);
        this.retrieveUserId = this.retrieveUserId.bind(this);
        // Event handler
        this.toggleView = this.toggleView.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.data !== nextState.data;
    }

    componentWillMount() {
        if (isEmpty(this.state.commits)) { // Parent did not pass down commits
            Promise.all([this.retrieveCommits(), this.retrieveUserId()])
                .then(([commits, userId]) => {
                    Promise.all([
                        this.setState({commits: commits}),
                        this.setState({userId: userId})
                    ])
                        .then(() => {
                            this.processCommits();
                        });
                });
        } else {
            this.retrieveUserId()
                .then(userId => {
                    this.setState({
                        userId: userId
                    }, this.processCommits);
                });
        }
    }

    processCommits() {

        // Hash projectName to an array of commit times (milliseconds from epoch)
        let timesCommitted = {};
        Object.keys(this.state.commits).forEach(projectName => {

            let filteredCommits = this.state.commits[projectName];
            // If requested, only the ones the user committed
            if (this.state.display === 2) {
                filteredCommits = filteredCommits.filter(eachCommit => {
                    return eachCommit.updater.indexOf(this.state.userId) !== -1;
                });
            }

            timesCommitted[projectName] = filteredCommits.map(oneCommit => {
                return oneCommit.time;
            });
        });

        // Processing times
        let datasets = [];
        Object.keys(timesCommitted).forEach(projectName => {
            timesCommitted[projectName].sort();
            let eachProjectData = Array(7).fill(0), // TODO: extend this to be flexible with user selected timeframe
                timeNow = new Date().getTime(),
                millisecondsInADay = 60 * 60 * 24 * 1000,
                bounds = [];
            for (let i = 7; i >= 0; i--) {
                bounds.push(timeNow - (i * millisecondsInADay));
            }

            let index = 0,
                boundsIndex = 0;
            while (index < timesCommitted[projectName].length && boundsIndex < bounds.length) {
                if (timesCommitted[projectName][index] >= bounds[boundsIndex] &&
                    timesCommitted[projectName][index] < bounds[boundsIndex + 1]) {
                    eachProjectData[boundsIndex] += 1;
                    index++;
                } else if (timesCommitted[projectName][index] < bounds[boundsIndex]) {
                    index++;
                } else {
                    boundsIndex++;
                }
            }

            let randomColor = getRandomColorHex();
            datasets.push({
                label: projectName, // this is the name of the project
                fillColor: convertHexToRGBA(randomColor, 20),
                strokeColor: convertHexToRGBA(randomColor, 100),
                pointColor: convertHexToRGBA(randomColor, 100),
                pointStrokeColor: shadeColor(randomColor, 50), // Lightened because its the shading
                pointHighlightFill: shadeColor(randomColor, 50), // Lightened because its the shading
                pointHighlightStroke: convertHexToRGBA(randomColor, 100),
                data: eachProjectData
            });
        });

        this.setState({
            data: {
                labels: getPastWeeksDays(),
                datasets: datasets
            }
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

                        return commits;
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
            }, this.processCommits);
        }
    }

    render() {
        return (
            <div className="col-md-6">
                <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">Timeline of Latest Commits</h3>

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
                            <LineChart data={this.state.data} options={{}} redraw/>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
