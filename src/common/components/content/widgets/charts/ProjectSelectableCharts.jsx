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
            chart: 'Bar',
            componentWidth: this.props.width
        };
        // Event handlers
        this.onChartChange = this.onChartChange.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchProjectsIfNeeded());
        this.setState({
            componentWidth: document.getElementById("selectableChartBox").offsetWidth
        });
    }

    componentDidUpdate() {
        const newWidth = document.getElementById("selectableChartBox").offsetWidth;

        if (newWidth !== this.state.componentWidth) {
            this.setState({
                componentWidth: document.getElementById("selectableChartBox").offsetWidth
            });
        }
    }

    onChartChange(event) {
        // Release focus
        event.target.blur();

        this.setState({
            chart: event.target.value
        });
    }

    render() {
        const { chart, componentWidth } = this.state;
        const { info, ownerId, projectName, unavailable, height, width } = this.props;
        const displayInfoInline = componentWidth > (width + 100);

        return (
            <div className="row hidden-xs" id="selectableChartBox">
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
                            <div className={`col-md-${displayInfoInline ? 9 : 12}`}>
                                <div className="box-body">
                                    {chart === 'Bar' ?
                                        <CollaboratorsCommitsBarChart height={height}
                                                                      ownerId={ownerId}
                                                                      projectName={projectName}
                                                                      width={componentWidth}/> : null}
                                    {chart === 'Line' ?
                                        <ProjectCommitsLineChart height={height}
                                                                 ownerId={ownerId}
                                                                 projectName={projectName}
                                                                 width={width}/> : null}
                                    {chart === 'Doughnut' ?
                                        <CommitsDoughnutChart height={height}
                                                              ownerId={ownerId}
                                                              projectName={projectName}
                                                              width={width}/> : null}
                                </div>
                            </div>
                            {displayInfoInline ?
                                <div className="col-md-3" style={{textAlign: "-webkit-center"}}>
                                    <br/>
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

                                </div> :
                                <div className="col-md-12" style={{textAlign: "-webkit-center"}}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <strong>Last Modified</strong>
                                            <br/>
                                            <i>{info.modifiedAt ? timeAgo(info.modifiedAt) : timeAgo(DEFAULT_ISODATE)}
                                                <br/>{`by ${info.modifier ? info.modifier : unavailable}`}
                                            </i>
                                        </div>

                                        <div className="col-md-4">
                                            <strong>Last Viewed</strong>
                                            <br/>
                                            <i>{info.viewedAt ? timeAgo(info.viewedAt) : timeAgo(DEFAULT_ISODATE)}
                                                <br/>{`by ${info.viewer ? info.viewer : unavailable}`}
                                            </i>
                                        </div>

                                        <div className="col-md-4">
                                            <strong>Created At</strong>
                                            <br/>
                                            <i>{info.createdAt ? timeAgo(info.createdAt) : timeAgo(DEFAULT_ISODATE)}
                                                <br/>{`by ${info.creator ? info.creator : unavailable}`}
                                            </i>
                                        </div>
                                    </div>

                                </div>}
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
