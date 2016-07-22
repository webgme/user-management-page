/**
 * Formatting for data table widget's headers
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
// Style
import { Unselectable } from '../../../../../../client/style';

export default class DataTableCategories extends Component {

    render() {
        return (
            <th className={this.props.className || ""}
                style={Object.assign(Unselectable, this.props.style)}>
                <div onClick={this.props.sortable ? this.props.orderEntries : () => {}}
                     style={this.props.sortable ? {cursor: "pointer", float: "left"} : {float: "left"}}>
                    {this.props.name}
                </div>
            </th>
        );
    }
}

DataTableCategories.propTypes = {
    name: PropTypes.string
};
