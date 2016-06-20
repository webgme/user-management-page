/**
 * BarGraph for 'commits by collaborators' widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries:
import React from 'react/lib/React';
import BarChart from 'react-chartjs/lib/bar';
// Self defined:
import {convertHexToRGBA, getRandomColorHex, shadeColor} from '../../../../utils/utils.js';

export default class CollaboratorsCommitsBarGraph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: [],
                datasets: []
            },
            numCommits: 100
        };
    }

    componentDidMount() {
        let updaters = {};

        this.props.restClient.projects.getLatestCommits(this.props.ownerId, this.props.projectName, this.state.numCommits) // eslint-disable-line max-len
            .then(arrayOfCommits => {
                arrayOfCommits.forEach(oneCommit => {
                    if (updaters[oneCommit.updater[0]]) {
                        updaters[oneCommit.updater[0]] += 1;
                    } else {
                        updaters[oneCommit.updater[0]] = 1;
                    }
                });

                let randomColor = getRandomColorHex(),
                    labels = [],
                    data = [];

                Object.keys(updaters).forEach(updater => {
                    labels.push(updater);
                    data.push(updaters[updater]);
                });

                this.setState({
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                fillColor: convertHexToRGBA(randomColor, 20),
                                strokeColor: convertHexToRGBA(randomColor, 100),
                                pointColor: convertHexToRGBA(randomColor, 100),
                                pointStrokeColor: shadeColor(randomColor, 50),
                                pointHighlightFill: shadeColor(randomColor, 50),
                                pointHighlightStroke: convertHexToRGBA(randomColor, 100),
                                data: data
                            }
                        ]
                    }
                });
            });
    }

    render() {

        return (
            <div className="col-md-6">
                <div className="box box-info">
                    <div className="box-header with-border">
                        <h3 className="box-title">{this.props.title}</h3>

                        <div className="box-tools pull-right">
                            <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                <i className="fa fa-minus"/>
                            </button>
                        </div>
                    </div>
                    <div className="box-body">
                        <BarChart data={this.state.data}
                                  options={this.props.options}
                                  width={this.props.width}
                                  height={this.props.height}
                                  redraw/>
                    </div>
                </div>
            </div>
        );
    }

}
