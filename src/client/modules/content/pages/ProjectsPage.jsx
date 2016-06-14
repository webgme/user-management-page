// Libraries
import Button from '../../../../../node_modules/react-bootstrap/lib/Button';
import ButtonGroup from '../../../../../node_modules/react-bootstrap/lib/ButtonGroup';
import DoughnutChart from '../../../../../node_modules/react-chartjs/lib/doughnut';
import LineChart from '../../../../../node_modules/react-chartjs/lib/line';
import React from '../../../../../node_modules/react/lib/React';
// Self defined
import DataTable from '../widgets/datatable/DataTable.jsx';
import ProjectsDataTableEntry from '../widgets/datatable/ProjectsDataTableEntry.jsx';
import {convertHexToRGBA, getPastWeeksDays, getRandomColorHex, shadeColor} from '../../../utils/utils.js';

export default class ProjectsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            doughnutChartData: [],
            lineChartData: {},
            projects: [],
            displayDoughnut: 1, // 1 indicates displaying everyone's commits, 2 indicates commits by self
            displayLine: 1, // 1 indicates displaying everyone's commits, 2 indicates commits by self
            dayOfTheWeek: new Date().getDay()
        };
        this.retrieveData = this.retrieveData.bind(this);
        this.toggleCommitViewDoughnut = this.toggleCommitViewDoughnut.bind(this);
        this.toggleCommitViewLine = this.toggleCommitViewLine.bind(this);
    }

    componentDidMount() {
        this.retrieveData();
    }

    retrieveData() {

        Promise.all([
            this.props.restClient.projects.getAllProjects(), // These are the ones user has access to
            this.props.restClient.user.getCurrentUser()
        ]).then(([allProjects, currentUserData]) => {

            // Set up the table data first
            this.setState({
                projects: allProjects
            });

            let doughnutChartData = [],
                lineChartData = [],
                allTimesCommitted = {}, // Hashmap of projectName to array of commit times (epoch value)
                promiseArrayToGetLatestCommits = [],
                arrayOfProjectNames = [];

            allProjects.forEach(project => {
                promiseArrayToGetLatestCommits.push(
                    this.props.restClient.projects.getLatestCommits(project.owner, project.name)
                );
                arrayOfProjectNames.push(project.name);
            });

            Promise.all(promiseArrayToGetLatestCommits)
                .then(arrayOfCommitsForAllProjects => {
                    arrayOfCommitsForAllProjects.forEach((commitsForOneProject, index) => {
                        allTimesCommitted[arrayOfProjectNames[index]] = [];// Initialize hashed entry

                        // Doughnut Chart
                        // Only get the commits of current user if user toggled
                        let filteredCommits = commitsForOneProject;
                        if (this.state.displayDoughnut === 2) {
                            filteredCommits = filteredCommits.filter(eachCommit => {
                                return eachCommit.updater.indexOf(currentUserData._id) !== -1;
                            });
                        }
                        // Format the chart data
                        let randomColor = getRandomColorHex();
                        doughnutChartData.push({
                            value: filteredCommits.length || 0,
                            color: randomColor,
                            highlight: shadeColor(randomColor, 20),
                            label: arrayOfProjectNames[index]
                        });

                        // Line Chart
                        // Getting the times of each commit
                        commitsForOneProject.forEach(eachCommit => {
                            if (this.state.displayLine === 2) {
                                if (eachCommit.updater.indexOf(currentUserData._id) !== -1) {
                                    allTimesCommitted[arrayOfProjectNames[index]].push(eachCommit.time);
                                }
                            } else {
                                allTimesCommitted[arrayOfProjectNames[index]].push(eachCommit.time);
                            }
                        });
                    });

                    // Hashmap of times processed here
                    for (let projectsCommitTimes in allTimesCommitted) {
                        allTimesCommitted[projectsCommitTimes].sort();
                        let buildData = Array(7).fill(0);
                        let timeNow = new Date().getTime(),
                            millisecondsInADay = 60 * 60 * 24 * 1000;
                        let bounds = [];
                        for (let i = 7; i >= 0; i--) {
                            bounds.push(timeNow - (i * millisecondsInADay));
                        }

                        let index = 0,
                            boundsIndex = 0;
                        while (index < allTimesCommitted[projectsCommitTimes].length && boundsIndex < bounds.length) {
                            if (allTimesCommitted[projectsCommitTimes][index] >= bounds[boundsIndex] &&
                                allTimesCommitted[projectsCommitTimes][index] < bounds[boundsIndex + 1]) {
                                buildData[boundsIndex] += 1;
                                index++;
                            } else if (allTimesCommitted[projectsCommitTimes][index] < bounds[boundsIndex]) {
                                index++;
                            } else {
                                boundsIndex++;
                            }
                        }

                        let randomColor = getRandomColorHex();
                        lineChartData.push({
                            label: projectsCommitTimes, // this is the name of the project
                            fillColor: convertHexToRGBA(randomColor, 20),
                            strokeColor: convertHexToRGBA(randomColor, 100),
                            pointColor: convertHexToRGBA(randomColor, 100),
                            pointStrokeColor: shadeColor(randomColor, 50), // Lightened because its the shading
                            pointHighlightFill: shadeColor(randomColor, 50), // Lightened because its the shading
                            pointHighlightStroke: convertHexToRGBA(randomColor, 100),
                            data: buildData
                        });
                    }
                })
                .then(() => {
                    this.setState({
                        doughnutChartData: doughnutChartData,
                        lineChartData: {
                            labels: getPastWeeksDays(),
                            datasets: lineChartData
                        }
                    });
                });

        });
    }

    toggleCommitViewLine(event) {
        let holdOldDisplayNum = this.state.displayLine;
        let newDisplayNum = event.target.innerHTML === 'Only My Commits' ? 2 : 1;

        this.setState({
            displayLine: newDisplayNum
        });

        if (holdOldDisplayNum !== newDisplayNum) {
            this.retrieveData();
        }
    }

    toggleCommitViewDoughnut(event) {
        let holdOldDisplayNum = this.state.displayDoughnut;
        let newDisplayNum = event.target.innerHTML === 'Only My Commits' ? 2 : 1;

        this.setState({
            displayDoughnut: newDisplayNum
        });

        if (holdOldDisplayNum !== newDisplayNum) {
            this.retrieveData();
        }
    }

    render() {

        let categories = [
            {id: 1, name: 'Owner:'},
            {id: 2, name: 'Project Name:'},
            {id: 3, name: 'Last Viewed:'},
            {id: 4, name: 'Last Changed:'}
        ];

        return <section className="content">

            <DataTable restClient={this.restClient}
                       categories={categories}
                       whichTable="projects"
                       tableName="Projects"
                       entries={this.state.projects}
                       basePath={this.props.routes[0].basePath}>
                <ProjectsDataTableEntry/>
            </DataTable>

            <div className="row">
                <div className="col-md-6">
                    <div className="box box-primary">
                        <div className="box-header with-border">
                            <h3 className="box-title">Timeline of Latest Commits (Sorted by Project)</h3>

                            <div className="box-tools pull-right">
                                <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                    <i className="fa fa-minus"/>
                                </button>
                                <ButtonGroup>
                                    <Button bsStyle={this.state.displayLine === 1 ? "primary" : null}
                                            onClick={this.toggleCommitViewLine}>Total Commits
                                    </Button>
                                    <Button bsStyle={this.state.displayLine === 2 ? "primary" : null}
                                            onClick={this.toggleCommitViewLine}>Only My Commits
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="chart">
                                <LineChart data={this.state.lineChartData} options={{}} redraw/>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="col-md-6">
                    <div className="box box-info">
                        <div className="box-header with-border">
                            <h3 className="box-title">All Latest Commits By Project</h3>

                            <div className="box-tools pull-right">
                                <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                    <i className="fa fa-minus"/>
                                </button>
                                <ButtonGroup>
                                    <Button bsStyle={this.state.displayDoughnut === 1 ? "primary" : null}
                                            onClick={this.toggleCommitViewDoughnut}>Total Commits
                                    </Button>
                                    <Button bsStyle={this.state.displayDoughnut === 2 ? "primary" : null}
                                            onClick={this.toggleCommitViewDoughnut}>Only My Commits
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </div>

                        <div className="box-body">
                            <div className="chart">
                                <DoughnutChart data={this.state.doughnutChartData} options={{}} redraw/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </section>;
    }

}
