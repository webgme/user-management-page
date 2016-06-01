import React from 'react';
import Select from 'react-select';

export default class MultiSelectField extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            crazy: false,
            options: [],
            value: []
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange(value) {
        this.setState({ value });
    }

    render() {
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

}
