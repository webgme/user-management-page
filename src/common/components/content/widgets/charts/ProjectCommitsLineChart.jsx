/**
 * LineChart widget for Commits
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Line as LineChart } from 'react-chartjs';
// Self-defined
import { fetchCommitsIfNeeded } from '../../../../actions/projects';
import { fetchUserIfNeeded } from '../../../../actions/user';
import { getDefaultDataset, processProjectCommitsLine } from '../../../../../client/utils/utils';

export default class ProjectCommitsLineChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: getDefaultDataset(this.props.user._id, 7),
            numCommits: 100
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const { ownerId, projectName } = this.props;

        dispatch(fetchCommitsIfNeeded(ownerId, projectName, this.state.numCommits));
        dispatch(fetchUserIfNeeded());
    }

    componentWillReceiveProps(nextProps) {
        const { commits, user, display } = nextProps;
        this.setState({
            data: processProjectCommitsLine(commits, user._id, display)
        });
    }

    componentWillMount() {
        const { commits, user, display } = this.props;
        this.setState({
            data: processProjectCommitsLine(commits, user._id, display)
        });
    }

    shouldComponentUpdate(nextProps /* , nextState */) {
        return this.props.commits !== nextProps.commits ||
            this.props.display !== nextProps.display ||
            this.props.whichChart !== nextProps.whichChart ||
            this.props.lineChartDisplay !== nextProps.lineChartDisplay;
    }

    render() {
        return (
            <LineChart data={this.state.data}
                       height={300}
                       width={500}
                       options={{}}
                       redraw={true}/>
        );
    }
}

ProjectCommitsLineChart.propTypes = {
    commits: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
};

ProjectCommitsLineChart.defaultProps = {
    unavailable: "Unavailable"
};
