/**
 * BarGraph for 'commits by collaborators' widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries:
import React, { Component, PropTypes } from 'react';
import { Bar as BarChart } from 'react-chartjs';
// Self defined:
import { fetchCommitsIfNeeded, fetchProjectsIfNeeded } from '../../../../actions/projects';
import { timeAgo } from '../../../../../client/utils/utils';

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
        dispatch(fetchProjectsIfNeeded());
    }

    shouldComponentUpdate(nextProps/* , nextState */) {
        return this.props.data !== nextProps.data;
    }

    render() {
        const { data, info, options, title } = this.props;

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

                        <div className="row">
                            <div className="col-md-9">
                                <div className="box-body" id="barChartBox">
                                    <BarChart data={data}
                                              height={300}
                                              width={600}
                                              options={options || {}}
                                              redraw={true} />
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

                                {/*
                                <select className="pull-right">
                                    <option value="Bar Chart">Bar Chart</option>
                                    <option value="Line Graph">Line Graph</option>
                                </select> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

CollaboratorsCommitsBarGraph.propTypes = {
    data: PropTypes.object.isRequired,
    info: PropTypes.shape({
        createdAt: PropTypes.string,
        viewedAt: PropTypes.string,
        modifiedAt: PropTypes.string,
        creator: PropTypes.string,
        viewer: PropTypes.string,
        modifier: PropTypes.string
    }).isRequired
};

CollaboratorsCommitsBarGraph.defaultProps = {
    unavailable: "Unavailable"
};