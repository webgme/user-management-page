/**
 * LineChart widget for Commits
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import CollaboratorsCommitsBarChart from '../../../../containers/content/widgets/charts/CollaboratorsCommitsBarChart';
import CommitsDoughnutChart from '../../../../containers/content/widgets/charts/CommitsDoughnutChart';
import ProjectCommitsLineChart from '../../../../containers/content/widgets/charts/ProjectCommitsLineChart';
// Self-defined
import { timeAgo } from '../../../../../client/utils/utils';
import { DEFAULT_ISODATE } from '../../../../../client/utils/constants';
import { fetchProjectsIfNeeded } from '../../../../actions/projects';

const CHART_TITLES = {
    Bar: 'Latest Commits',
    Line: 'Timeline of Latest Commits',
    Doughnut: 'Latest Commits'
};

export default class ProjectSelectableCharts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chart: 'Bar'
        };
        // Event handlers
        this.onChartChange = this.onChartChange.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchProjectsIfNeeded());
    }
    onChartChange(event) {
        // Release focus
        event.target.blur();

        this.setState({
            chart: event.target.value
        });
    }

    render() {
        const { chart, lineChartDisplay } = this.state;
        const { info, ownerId, projectName, unavailable } = this.props;

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="box">

                        {/* Chart selecting */}
                        <div className="box-header with-border">
                            <h3 className="box-title">{CHART_TITLES[chart]}</h3>

                            <div className="box-tools pull-right">
                                <div className="box-tools pull-right">
                                    <select onChange={this.onChartChange} value={chart}>
                                        <option value="Bar">Bar Chart</option>
                                        <option value="Line">Line Chart</option>
                                        <option value="Doughnut">Doughnut Chart</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Chart body */}
                        <div className="row">
                            <div className="col-md-9">
                                <div className="box-body">
                                    {chart === 'Bar' ?
                                        <CollaboratorsCommitsBarChart height={300}
                                                                      ownerId={ownerId}
                                                                      projectName={projectName}
                                                                      width={500}/> : null}
                                    {chart === 'Line' ?
                                        <ProjectCommitsLineChart display={lineChartDisplay}
                                                                 height={300}
                                                                 ownerId={ownerId}
                                                                 projectName={projectName}
                                                                 width={500}/> : null}
                                    {chart === 'Doughnut' ?
                                        <CommitsDoughnutChart display={lineChartDisplay}
                                                              height={300}
                                                              ownerId={ownerId}
                                                              projectName={projectName}
                                                              width={500}/> : null}
                                </div>
                            </div>
                            <div className="col-md-3" style={{paddingRight: "30px"}}>
                                <strong>Last Modified</strong>
                                <br/>
                                <i>{info.modifiedAt ? timeAgo(info.modifiedAt) : timeAgo(DEFAULT_ISODATE)}
                                    <br/>{`by ${info.modifier ? info.modifier : unavailable}`}
                                </i>

                                <br/><br/><br/>

                                <strong>Last Viewed</strong>
                                <br/>
                                <i>{info.viewedAt ? timeAgo(info.viewedAt) : timeAgo(DEFAULT_ISODATE)}
                                    <br/>{`by ${info.viewer ? info.viewer : unavailable}`}
                                </i>

                                <br/><br/><br/>

                                <strong>Created At</strong>
                                <br/>
                                <i>{info.createdAt ? timeAgo(info.createdAt) : timeAgo(DEFAULT_ISODATE)}
                                    <br/>{`by ${info.creator ? info.creator : unavailable}`}
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

ProjectSelectableCharts.propTypes = {
    info: PropTypes.shape({
        createdAt: PropTypes.string,
        viewedAt: PropTypes.string,
        modifiedAt: PropTypes.string,
        creator: PropTypes.string,
        viewer: PropTypes.string,
        modifier: PropTypes.string
    }).isRequired
};

ProjectSelectableCharts.defaultProps = {
    unavailable: "Unavailable"
};
