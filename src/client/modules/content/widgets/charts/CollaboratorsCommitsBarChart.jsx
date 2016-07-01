/* global window, $ */

/**
 * BarGraph for 'commits by collaborators' widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries:
import BarChart from 'react-chartjs/lib/bar';
import React from 'react/lib/React';
// Self defined:
import {convertHexToRGBA, getRandomColorHex, shadeColor} from '../../../../utils/utils.js';

export default class CollaboratorsCommitsBarGraph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: [],
                datasets: [],
                height: 0.0,
                width: 0.0
            },
            numCommits: 100
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        $(window).resize(() => {
            this.updateDimensions();
        });

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

    componentWillMount() {
        this.updateDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.data !== nextState.data ||
               this.state.height !== nextState.height ||
               this.state.width !== nextState.width;
    }

    updateDimensions() {
        console.log('Updating the window dimensions state');
        console.log('New height: ', $(window).height(), 'New width: ', $(window).width());
        console.log('Width of barChartBox: ', $("#barChartBox").width());
        this.setState({
            height: $(window).height(),
            width: $(window).width()
        });
    }

    render() {

        return (
            <div className="col-md-12">
                <div className="box">

                    <div className="box-header with-border">
                        <h3 className="box-title">{this.props.title}</h3>

                        <div className="box-tools pull-right">
                            <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                <i className="fa fa-minus"/>
                            </button>
                        </div>
                    </div>

                    <div className="box-body" id="barChartBox">
                        <BarChart data={this.state.data}
                                  height={this.state.height / 3}
                                  options={this.props.options}
                                  redraw={true}
                                  width={-120 + this.state.width * 10.0 / 21.0}/>
                    </div>

                </div>
            </div>
        );
    }

}
