/**
 * LineChart widget for Commits
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Line as LineChart } from 'react-chartjs';
// Self-defined
import { fetchCommitsIfNeeded } from '../../../../actions/projects';
import { getDefaultDataset, processProjectCommitsLine } from '../../../../../client/utils/utils';

export default class ProjectCommitsLineChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: getDefaultDataset(7),
            numCommits: 100
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const { ownerId, projectName } = this.props;

        dispatch(fetchCommitsIfNeeded(ownerId, projectName, this.state.numCommits));
    }

    componentWillReceiveProps(nextProps) {
        const { commits } = nextProps;
        this.setState({
            data: processProjectCommitsLine(commits)
        });
    }

    componentWillMount() {
        const { commits } = this.props;
        this.setState({
            data: processProjectCommitsLine(commits)
        });
    }

    shouldComponentUpdate(nextProps /* , nextState */) {
        return this.props.commits !== nextProps.commits;
    }

    render() {
        const { data } = this.state;

        return (
            <LineChart data={data}
                       height={300}
                       width={500}
                       options={{}}
                       redraw={true}/>
        );
    }
}

ProjectCommitsLineChart.propTypes = {
    commits: PropTypes.array.isRequired
};

ProjectCommitsLineChart.defaultProps = {
    unavailable: "Unavailable"
};
