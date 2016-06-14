/**
 * Custom multiselect dropdown (typing enabled) widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';
import Select from 'react-select/lib/Select';

export default class MultiSelectField extends React.Component {

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
            <div className="section">
                <h3 className="section-heading">{this.props.label}</h3>
                <Select multi
                        simpleValue
                        value={this.props.valuesInMultiselect}
                        placeholder={this.props.placeholder}
                        options={this.props.options}
                        onChange={this.handleSelectChange} />
            </div>
        );
    }

}
