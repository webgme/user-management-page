import React from 'react';

export default class DataTableCategories extends React.Component {

    render() {

        let whichWay = this.props.numTimesClicked % 2 === 1 ? 'fa fa-level-down' : 'fa fa-level-up';


        return <th className="sorting_asc"
                   tabIndex="0"
                   aria-controls="example1"
                   rowSpan="1"
                   colSpan="1" aria-sort="ascending"
                   aria-label="Rendering engine: activate to sort column descending">
            {this.props.name}
            {this.props.name === 'UserID:' ? <i className={whichWay}
                                                style={{"textAlign": "right"}}
                                                onClick={this.props.orderEntries}/> : <i/>}
            </th>;
    }
}

DataTableCategories.propTypes = {
    name: React.PropTypes.string
};
