import React from 'react';
import Select from 'react-select';


var MultiSelectField = React.createClass({
    displayName: 'MultiSelectField',
    propTypes: {
        label: React.PropTypes.string
    },
    getInitialState () {
        return {
            disabled: false,
            crazy: false,
            options: [],
            value: []
        };
    },
    handleSelectChange (value) {
        this.setState({ value });
    },
    toggleDisabled (e) {
        this.setState({ disabled: e.target.checked });
    },

    render () {
        return (
            <div className="section">
                <h3 className="section-heading">{this.props.label}</h3>
                <Select multi
                        simpleValue
                        disabled={this.state.disabled}
                        value={this.state.value}
                        placeholder={this.props.placeholder}
                        options={this.props.options}
                        onChange={this.handleSelectChange} />
            </div>
        );
    }
});

module.exports = MultiSelectField;
