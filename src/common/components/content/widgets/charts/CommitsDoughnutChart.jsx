/**
 * DoughnutChart widget for Commits
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
import { Doughnut as DoughnutChart } from 'react-chartjs';
// Self-defined
import { fetchCommitsIfNeeded, fetchProjectsIfNeeded } from '../../../../actions/projects';

export default class CommitsDoughnutChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numCommits: 100
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const { ownerId, projectName } = this.props;

        dispatch(fetchCommitsIfNeeded(ownerId, projectName, this.state.numCommits));
        dispatch(fetchProjectsIfNeeded());

    }
    shouldComponentUpdate(nextProps /* , nextState */) {
        return this.props.data !== nextProps.data;
    }

    render() {
        const { data, options } = this.props;
        const { height, width } = this.props;

        return (
            <DoughnutChart data={data}
                           height={height}
                           width={width}
                           options={options || {}}
                           redraw={true} />
        );
    }
}
