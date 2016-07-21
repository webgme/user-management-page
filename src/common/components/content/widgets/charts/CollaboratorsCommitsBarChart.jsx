/**
 * BarGraph for 'commits by collaborators' widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries:
import React, { Component, PropTypes } from 'react';
import { Bar as BarChart } from 'react-chartjs';
// Self defined:
import { fetchCommitsIfNeeded } from '../../../../actions/projects';

export default class CollaboratorsCommitsBarGraph extends Component {

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
    }

    shouldComponentUpdate(nextProps/* , nextState */) {
        return this.props.data !== nextProps.data;
    }

    render() {
        const { data, options } = this.props;
        const { height, width } = this.props;

        return (
            <BarChart data={data}
                      height={height}
                      width={width}
                      options={options || {}}
                      redraw={true}/>
        );
    }
}

CollaboratorsCommitsBarGraph.propTypes = {
    data: PropTypes.object.isRequired
};

CollaboratorsCommitsBarGraph.defaultProps = {
    unavailable: "Unavailable"
};
