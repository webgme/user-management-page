/**
 * Pagination for data table widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';

const STYLE = {
    unselectable: {
        WebkitUserSelect: "none",
        KhtmlUserSelect: "none",
        MozUserSelect: "none",
        MsUserSelect: "none",
        OUserSelect: "none",
        userSelect: "none",
        outlineStyle: "none",
        WebkitTapHighlightColor: "transparent"}
};

export default class DataTableEntry extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="dataTables_paginate paging_simple_numbers"
                    id="example1_paginate"
                    style={{fontSize: "12px"}}>
                <ul className="pagination" style={{margin: 0}}>
                    <li id="example1_previous"
                        className={this.props.pageNumber === 1 ? "paginate_button previous disabled" :
                                                                 "paginate_button previous"}
                        onClick={this.props.pageNumber === 1 ? null : this.props.clickHandler}>
                        <a data-dt-idx="0"
                           href="#" aria-controls="example1"
                           style={STYLE.unselectable}
                           tabIndex="0">Previous</a>
                    </li>

                    {this.props.formattedPaginationButtons}

                    <li id="example1_next"
                        className={this.props.pageNumber === this.props.numPages ? "paginate_button next disabled" :
                                                                                   "paginate_button next"}
                        onClick={this.props.pageNumber === this.props.numPages ? null : this.props.clickHandler}>
                        <a aria-controls="example1"
                           data-dt-idx="7"
                           href="#"
                           style={STYLE.unselectable}
                           tabIndex="0">Next</a>
                    </li>
                </ul>
            </div>
        );
    }
}
