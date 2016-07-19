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
        const { data, options, title } = this.props;

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="box">

                        <div className="box-header with-border">
                            <h3 className="box-title">{title}</h3>

                            <div className="box-tools pull-right">
                                <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                    <i className="fa fa-minus"/>
                                </button>
                            </div>
                        </div>

                        <div className="box-body" id="barChartBox">
                            <BarChart data={data}
                                      height={300}
                                      width={600}
                                      options={options || {}}
                                      redraw={true}/>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

CollaboratorsCommitsBarGraph.propTypes = {
    data: PropTypes.object.isRequired
};
