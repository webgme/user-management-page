/**
 * Formatting for data table widget's headers
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';

export default class DataTableCategories extends React.Component {

    constructor(props) {
        super(props);
    }

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
            <div onClick={this.props.sortable && (/name/i).test(this.props.name) ? this.props.orderEntries : () => {}}
                 style={this.props.sortable && (/name/i).test(this.props.name) ? {cursor: "pointer", float: "left"} : {float: "left"}}>
                {this.props.name}
                {this.props.sortable && (/name/i).test(this.props.name) ?
                    <i className={this.props.sortedForward ? "fa fa-level-down" : "fa fa-level-up"}
                       style={{textAlign: "right", cursor: "pointer"}}
                       onClick={this.props.orderEntries}/> : <i/>}
            </div>
        </th>;
    }
}

DataTableCategories.propTypes = {
    name: React.PropTypes.string
};
