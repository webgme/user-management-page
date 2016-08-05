/**
 * Pagination for data table widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
// Style
import { DataTablePagination as STYLE } from '../../../../../../client/style';

export default class DataTableEntry extends Component {

    render() {
        return (
            <div className="dataTables_paginate paging_simple_numbers"
                    style={{fontSize: "12px"}}>
                <ul className="pagination" style={{margin: 0}}>
                    <li id="example1_previous"
                        className={this.props.pageNumber === 1 ? "paginate_button previous disabled" :
                                                                 "paginate_button previous"}
                        onClick={this.props.pageNumber === 1 ? null : this.props.clickHandler}>
                        <a href="#" data-page={this.props.pageNumber} style={STYLE.unselectable}>Previous</a>
                    </li>

                    {this.props.formattedPaginationButtons}

                    <li id="example1_next"
                        className={this.props.pageNumber === this.props.numPages ? "paginate_button next disabled" :
                                                                                   "paginate_button next"}
                        onClick={this.props.pageNumber === this.props.numPages ? null : this.props.clickHandler}>
                        <a href="#" data-page={this.props.pageNumber} style={STYLE.unselectable}>Next</a>
                    </li>
                </ul>
            </div>
        );
    }
}
