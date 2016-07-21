/**
 * LineChart widget for Commits
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import ProjectCommitsLineChart from '../../../../containers/content/widgets/charts/ProjectCommitsLineChart';
import CollaboratorsCommitsBarChart from '../../../../containers/content/widgets/charts/CollaboratorsCommitsBarChart';
// Self-defined
import { timeAgo } from '../../../../../client/utils/utils';
import { DEFAULT_ISODATE } from '../../../../../client/utils/constants';

const CHART_TITLES = {
    Bar: 'Latest Commits',
    Line: 'Timeline of Latest Commits'
};

export default class ProjectSelectableCharts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chart: 'Bar',
            lineChartDisplay: 1 // 1 indicates total commits, 2 indicates only user's commits
        };
        // Event handlers
        this.onChartChange = this.onChartChange.bind(this);
        this.toggleLineChartDisplay = this.toggleLineChartDisplay.bind(this);
    }

    onChartChange(event) {
        // Release focus
        event.target.blur();

        this.setState({
            chart: event.target.value
        });
    }

    toggleLineChartDisplay(event) {
        // Release focus
        event.target.blur();

        let oldDisplay = this.state.lineChartDisplay,
            newDisplay;
        if (event.target.innerHTML === 'Total Commits') {
            newDisplay = 1;
        } else if (event.target.innerHTML === 'Only My Commits') {
            newDisplay = 2;
        }

        if (oldDisplay !== newDisplay) {
            this.setState({
                lineChartDisplay: newDisplay
            });
        }
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
                                {chart === 'Line' ?
                                    <ButtonGroup>
                                        <Button bsStyle={lineChartDisplay === 1 ? "primary" : null}
                                                onClick={this.toggleLineChartDisplay}>Total Commits
                                        </Button>
                                        <Button bsStyle={lineChartDisplay === 2 ? "primary" : null}
                                                onClick={this.toggleLineChartDisplay}>Only My Commits
                                        </Button>
                                    </ButtonGroup> : null }

                                <div className="box-tools pull-right">
                                    <select onChange={this.onChartChange} value={chart}>
                                        <option value="Bar">Bar Chart</option>
                                        <option value="Line">Line Chart</option>
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
