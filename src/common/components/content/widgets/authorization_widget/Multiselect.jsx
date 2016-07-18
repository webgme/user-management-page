/**
 * Custom multiselect dropdown (typing enabled) widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
import Select from 'react-select';
// Style
import { Multiselect as STYLE } from '../../../../../client/style';

export default class MultiSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: [],
            value: []
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange(value) {
        this.props.onChange(value);
    }

    render() {

        return (
            <div className="section" style={STYLE}>
                <h3 className="section-heading">{this.props.label}</h3>
                <Select multi={this.props.multi}
                        onChange={this.handleSelectChange}
                        options={this.props.options}
                        placeholder={this.props.placeholder}
                        simpleValue
                        value={this.props.valuesInMultiselect}/>
            </div>
        );
    }

}
