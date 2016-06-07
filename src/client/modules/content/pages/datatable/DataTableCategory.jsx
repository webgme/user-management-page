// Libraries
import React from '../../../../../../node_modules/react/lib/React';

export default class DataTableCategories extends React.Component {

    render() {

        return <th className="sorting_asc"
                   tabIndex="0"
                   aria-controls="example1"
                   rowSpan="1"
                   colSpan="1" aria-sort="ascending"
                   aria-label="Rendering engine: activate to sort column descending">
            {this.props.name}
            {this.props.sortable ? <i className={this.props.numTimesClicked % 2 === 1 ? "fa fa-level-down" :
                                                                                        "fa fa-level-up"}
                                      style={{textAlign: "right"}}
                                      onClick={this.props.orderEntries}/> : <i/>}
        </th>;
    }
}

DataTableCategories.propTypes = {
    name: React.PropTypes.string
};
