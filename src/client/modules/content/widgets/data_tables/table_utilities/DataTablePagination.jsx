/**
 * Pagination for data table widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';

export default class DataTableEntry extends React.Component {

    constructor(props) {
        super(props);
        this.handleDisabledClick = this.handleDisabledClick.bind(this);
    }

    handleDisabledClick(event) {
        // Release focus
        event.target.blur();
    }

    render() {
        return <div className="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                <ul className="pagination" style={{margin: 0}}>
                    <li id="example1_previous"
                        className={this.props.pageNumber === 1 ? "paginate_button previous disabled" :
                                                                 "paginate_button previous"}
                        onClick={this.props.pageNumber === 1 ? this.handleDisabledClick : this.props.clickHandler}>
                        <a href="#;" aria-controls="example1" data-dt-idx="0" tabIndex="0">Previous</a>
                    </li>

                    {this.props.formattedPaginationButtons}

                    <li id="example1_next"
                        className={this.props.pageNumber === this.props.numPages ? "paginate_button next disabled" :
                                                                                   "paginate_button next"}
                        onClick={this.props.pageNumber === this.props.numPages ? this.handleDisabledClick : this.props.clickHandler}>
                        <a href="#" aria-controls="example1" data-dt-idx="7" tabIndex="0">Next</a>
                    </li>
                </ul>
            </div>;
    }
}
