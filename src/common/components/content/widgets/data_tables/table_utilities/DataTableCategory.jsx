/**
 * Formatting for data table widget's headers
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';

export default class DataTableCategories extends Component {

    render() {

        return <th aria-controls="example1"
                   aria-label="Rendering engine: activate to sort column descending"
                   aria-sort="ascending"
                   className="sorting_asc"
                   colSpan="1"
                   rowSpan="1"
                   style={Object.assign({WebkitUserSelect: "none",
                                         KhtmlUserSelect: "none",
                                         MozUserSelect: "none",
                                         MsUserSelect: "none",
                                         OUserSelect: "none",
                                         userSelect: "none",
                                         outlineStyle: "none",
                                         WebkitTapHighlightColor: "transparent"}, this.props.style)}
                   tabIndex="0">
            <div onClick={this.props.sortable ? this.props.orderEntries : () => {}}
                 style={this.props.sortable ? {cursor: "pointer", float: "left"} : {float: "left"}}>
                {this.props.name}
            </div>
        </th>;
    }
}

DataTableCategories.propTypes = {
    name: PropTypes.string
};
