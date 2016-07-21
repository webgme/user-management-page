/**
 * LineChart widget for Commits
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Line as LineChart } from 'react-chartjs';
// Self-defined
import { fetchCommitsIfNeeded, fetchProjectsIfNeeded } from '../../../../actions/projects';
import { convertHexToRGBA, getPastWeeksDays, getRandomColorHex, processProjectCommitsLine,
         shadeColor, timeAgo } from '../../../../../client/utils/utils';

export default class ProjectCommitsLineChart extends Component {

    constructor(props) {
        super(props);
        const randomColor = getRandomColorHex();
        this.state = {
            data: {
                labels: getPastWeeksDays(),
                datasets: [{
                    label: this.props.userId || '',
                    fillColor: convertHexToRGBA(randomColor, 20),
                    strokeColor: convertHexToRGBA(randomColor, 100),
                    pointColor: convertHexToRGBA(randomColor, 100),
                    pointStrokeColor: shadeColor(randomColor, 50), // Lightened because its the shading
                    pointHighlightFill: shadeColor(randomColor, 50), // Lightened because its the shading
                    pointHighlightStroke: convertHexToRGBA(randomColor, 100),
                    data: Array(7).fill(0)
                }]
            }
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const { ownerId, projectName } = this.props;

        dispatch(fetchCommitsIfNeeded(ownerId, projectName, this.state.numCommits));
        dispatch(fetchProjectsIfNeeded());
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: processProjectCommitsLine(nextProps.commits, nextProps.user._id, nextProps.display)
        });
    }

    componentWillMount() {
        this.setState({
            data: processProjectCommitsLine(this.props.commits, this.props.user._id, this.props.display)
        });
    }

    shouldComponentUpdate(nextProps /* , nextState */) {
        return this.props.commits !== nextProps.commits ||
            this.props.display !== nextProps.display;
    }

    render() {
        const { display, info, onChartChange, toggleView, whichChart } = this.props;

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="box">

                        <div className="box-header with-border">
                            <h3 className="box-title">Timeline of Latest Commits</h3>

                            <div className="box-tools pull-right">
                                <ButtonGroup>
                                    <Button bsStyle={display === 1 ? "primary" : null}
                                            onClick={toggleView}>Total Commits
                                    </Button>
                                    <Button bsStyle={display === 2 ? "primary" : null}
                                            onClick={toggleView}>Only My Commits
                                    </Button>
                                </ButtonGroup>
                                <div className="box-tools pull-right">
                                    <select onChange={onChartChange} value={whichChart}>
                                        <option value="Bar">Bar Chart</option>
                                        <option value="Line">Line Chart</option>
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

ProjectCommitsLineChart.propTypes = {
    commits: PropTypes.array.isRequired,
    info: PropTypes.shape({
        createdAt: PropTypes.string,
        viewedAt: PropTypes.string,
        modifiedAt: PropTypes.string,
        creator: PropTypes.string,
        viewer: PropTypes.string,
        modifier: PropTypes.string
    }).isRequired,
    user: PropTypes.object.isRequired
};

ProjectCommitsLineChart.defaultProps = {
    unavailable: "Unavailable"
};
