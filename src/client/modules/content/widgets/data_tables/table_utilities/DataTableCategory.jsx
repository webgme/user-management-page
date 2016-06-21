/**
 * Formatting for data table widget's headers
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';

export default class DataTableCategories extends React.Component {

    render() {

        return <th className="sorting_asc"
                   tabIndex="0"
                   aria-controls="example1"
                   rowSpan="1"
                   colSpan="1" aria-sort="ascending"
                   aria-label="Rendering engine: activate to sort column descending">
            {this.props.name}
            {this.props.sortable && (/name/i).test(this.props.name) ?
                <i className={this.props.sortedForward ? "fa fa-level-down" : "fa fa-level-up"}
                   style={{textAlign: "right", cursor: "pointer"}}
                   onClick={this.props.orderEntries}/> : <i/>}
        </th>;
    }
}

DataTableCategories.propTypes = {
    name: React.PropTypes.string
};
