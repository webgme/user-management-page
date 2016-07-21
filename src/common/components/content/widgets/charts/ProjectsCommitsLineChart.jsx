/**
 * LineChart widget for Commits
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Line as LineChart } from 'react-chartjs';
// Self-defined
import { isEmpty, processProjectsCommitsLine, timeAgo } from '../../../../../client/utils/utils';

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
        // Event handler
        this.toggleView = this.toggleView.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.data !== nextState.data;
    }

    componentWillMount() {
        const { user } = this.props;

        if (isEmpty(this.state.commits)) { // Parent did not pass down commits
            this.retrieveCommits()
                .then((commits) => {
                    Promise.resolve(this.setState({
                        commits,
                        userId: user._id
                    }))
                        .then(() => {
                            this.processCommits();
                        });
                });
        } else {
            this.setState({
                userId: user._id
            }, this.processCommits());
        }
    }

    processCommits() {
        const data = processProjectsCommitsLine(this.state.commits, this.state.userId, this.state.display);

        this.setState({
            data
        });
    }

    retrieveCommits(numCommits = 100) {

        return this.props.restClient.projects.getAllProjects() // These are the ones user has access to
            .then(projects => {

                let commits = {}, // Hash of projectName to array of commits
                    projectsCommitRequests = [],
                    projectNames = [];

                projects.forEach(project => {
                    projectsCommitRequests.push(
                        this.props.restClient.projects.getLatestCommits(project.owner, project.name, numCommits)
                    );
                    projectNames.push(project.name);
                });

                return Promise.all(projectsCommitRequests)
                    .then(projectsCommits => {
                        projectsCommits.forEach((projectCommits, index) => {
                            commits[projectNames[index]] = projectCommits;
                        });

                        return commits;
                    });
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
        const { info, onChartChange, whichChart } = this.props;

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="box">

                        <div className="box-header with-border">
                            <h3 className="box-title">Timeline of Latest Commits</h3>

                            <div className="box-tools pull-right">
                                <ButtonGroup>
                                    <Button bsStyle={this.state.display === 1 ? "primary" : null}
                                            onClick={this.toggleView}>Total Commits
                                    </Button>
                                    <Button bsStyle={this.state.display === 2 ? "primary" : null}
                                            onClick={this.toggleView}>Only My Commits
                                    </Button>
                                </ButtonGroup>
                                <div className="box-tools pull-right">
                                    <select onChange={onChartChange}>
                                        <option value="Bar" selected={whichChart === 'Bar'}>Bar Chart</option>
                                        <option value="Line" selected={whichChart === 'Line'}>Line Chart</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-9">
                                <div className="box-body">
                                    <LineChart data={this.state.data}
                                               height={300}
                                               width={500}
                                               options={{}}
                                               redraw={true}/>
                                </div>
                            </div>
                            <div className="col-md-3" style={{paddingRight: "30px"}}>
                                <strong>Last Modified</strong>
                                <br/>
                                <i>{info.modifiedAt ? timeAgo(info.modifiedAt) : timeAgo(new Date(1447879297957).toISOString())}
                                    <br/>{`by ${info.modifier ? info.modifier : this.props.unavailable}`}
                                </i>

                                <br/><br/><br/>

                                <strong>Last Viewed</strong>
                                <br/>
                                <i>{info.viewedAt ? timeAgo(info.viewedAt) : timeAgo(new Date(1447879297957).toISOString())}
                                    <br/>{`by ${info.viewer ? info.viewer : this.props.unavailable}`}
                                </i>

                                <br/><br/><br/>

                                <strong>Created At</strong>
                                <br/>
                                <i>{info.createdAt ? timeAgo(info.createdAt) : timeAgo(new Date(1447879297957).toISOString())}
                                    <br/>{`by ${info.creator ? info.creator : this.props.unavailable}`}
                                </i>

                                <br/><br/><br/>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

CommitsLineChart.propTypes = {
    data: PropTypes.object.isRequired,
    info: PropTypes.shape({
        createdAt: PropTypes.string,
        viewedAt: PropTypes.string,
        modifiedAt: PropTypes.string,
        creator: PropTypes.string,
        viewer: PropTypes.string,
        modifier: PropTypes.string
    }).isRequired
};

CommitsLineChart.defaultProps = {
    unavailable: "Unavailable"
};
