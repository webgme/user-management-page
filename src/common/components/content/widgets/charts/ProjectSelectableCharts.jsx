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
import { getDefaultDataset, processProjectCommitsLine, timeAgo } from '../../../../../client/utils/utils';
import { DEFAULT_ISODATE } from '../../../../../client/utils/constants';

export default class ProjectSelectableCharts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: getDefaultDataset(this.props.userId, 7),
            numCommits: 100
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
            this.props.display !== nextProps.display ||
            this.props.whichChart !== nextProps.whichChart ||
            this.props.lineChartDisplay !== nextProps.lineChartDisplay;
    }

    render() {
        const { lineChartDisplay, info, onChartChange, toggleDisplay, unavailable, whichChart } = this.props;

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="box">

                        <div className="box-header with-border">
                            <h3 className="box-title">Timeline of Latest Commits</h3>

                            <div className="box-tools pull-right">
                                {whichChart === 'Line' ?
                                    <ButtonGroup>
                                        <Button bsStyle={lineChartDisplay === 1 ? "primary" : null}
                                                onClick={toggleDisplay}>Total Commits
                                        </Button>
                                        <Button bsStyle={lineChartDisplay === 2 ? "primary" : null}
                                                onClick={toggleDisplay}>Only My Commits
                                        </Button>
                                    </ButtonGroup> : null }

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

ProjectSelectableCharts.defaultProps = {
    unavailable: "Unavailable"
};
