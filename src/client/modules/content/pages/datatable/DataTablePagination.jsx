// Libraries
import React from '../../../../../../node_modules/react/lib/React';

export default class DataTableEntry extends React.Component {

    render() {

        return <div className="col-sm-7">
            <div className="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                <ul className="pagination" style={{float: "right"}}>
                    <li id="example1_previous"
                        className={this.props.pageNumber === 1 ? "paginate_button previous disabled" : "paginate_button previous"}
                        onClick={this.props.pageNumber === 1 ? () => {} : this.props.clickHandler}>
                        <a href="javascript:;" aria-controls="example1" data-dt-idx="0" tabIndex="0">Previous</a>
                    </li>

                    {this.props.formattedPaginationButtons}

                    <li id="example1_next"
                        className={this.props.pageNumber === this.props.numPages ? "paginate_button next disabled" : "paginate_button next"}
                        onClick={this.props.pageNumber === this.props.numPages ? () => {} : this.props.clickHandler}>
                        <a href="javascript:;" aria-controls="example1" data-dt-idx="7" tabIndex="0">Next</a> 
                    </li>
                </ul>
            </div>
        </div>;
    }
}
