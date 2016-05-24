import React from 'react';

class DataTableCategories extends React.Component {

    render() {
        return <th className="sorting_asc"
                   tabIndex="0"
                   aria-controls="example1"
                   rowSpan="1"
                   colSpan="1" aria-sort="ascending"
                   aria-label="Rendering engine: activate to sort column descending">
            {this.props.name}
            </th>;
    }
}

DataTableCategories.propTypes = {
    name: React.PropTypes.string
};

export default DataTableCategories;
