/**
 * Reusable data table widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
// Self-defined
import DataTableCategory from './table_utilities/DataTableCategory';
import DataTablePagination from './table_utilities/DataTablePagination';
// Style
import { DataTable as STYLE } from '../../../../../client/style';

export default class DataTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectValue: 10,
            pageNumber: 1,
            searchText: ''
        };
        this.handlePagination = this.handlePagination.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handlePagination(event) {

        let newPageNum = this.state.pageNumber;
        if (event.target.innerHTML.trim() === 'Next') {
            newPageNum += 1;
        } else if (event.target.innerHTML.trim() === 'Previous') {
            newPageNum -= 1;
        } else {
            newPageNum = parseInt(event.target.innerHTML.trim(), 10);
        }

        this.setState({
            pageNumber: newPageNum
        });
    }

    handleSearch(event) {
        this.setState({
            searchText: event.target.value.toLowerCase()
        });
    }

    handleSelect(event) {
        // Release focus
        event.target.blur();

        this.setState({
            selectValue: parseInt(event.target.value.trim(), 10),
            pageNumber: 1
        });
    }

    render() {

        // Formatting table categories
        let formattedCategories = [];
        this.props.categories.forEach(category =>
            formattedCategories.push(<DataTableCategory key={category.id}
                                                        name={category.name}
                                                        orderEntries={this.props.orderEntries}
                                                        sortable={this.props.sortable}
                                                        sortedForward={this.props.sortedForward}
                                                        style={this.props.categoryStyle}/>));

        // Setting up bounds
        let entriesList = this.props.entries.filter(oneEntry => {
                let filterRegex = new RegExp(this.state.searchText);
                return filterRegex.test(oneEntry.name.toLowerCase());
            }),
            startIndexInProjects = (this.state.pageNumber - 1) * this.state.selectValue,
            displayNumStart = startIndexInProjects + 1,
            displayNumEnd;

        // Putting together "show string"
        if (entriesList.length > (startIndexInProjects + this.state.selectValue)) {
            displayNumEnd = (startIndexInProjects + this.state.selectValue);
        } else {
            displayNumEnd = entriesList.length;
        }
        let showString = 'Showing ' + displayNumStart + ' to ' + displayNumEnd;
        if (displayNumStart > entriesList.length) {
            showString = 'Nothing to show.';
        }

        // Formatting table entries
        let formattedEntries = [];
        for (let i = displayNumStart - 1; i < displayNumEnd; i++) {
            let properties = {};
            Object.keys(entriesList[i]).forEach(prop => {
                properties[prop] = entriesList[i][prop];
                properties.handleRevoke = this.props.handleRevoke;
                properties.key = i;
                properties.ownerId = this.props.ownerId;
                properties.projectName = this.props.projectName;
            });
            formattedEntries.push(React.cloneElement(this.props.children, properties));
        }

        // Formatting selections (can make more efficient later)
        let formattedSelectOptions = [];
        let selectOptions = [10, 25, 50, 100];
        selectOptions.forEach((opt, index) =>
            formattedSelectOptions.push(<option value={String(opt)} key={index}>{opt}</option>));

        // Formatting pagination buttons
        let formattedPaginationButtons = [],
            numPages = Math.floor(entriesList.length / this.state.selectValue) + 1;
        for (let i = 1; i <= numPages; i++) {
            formattedPaginationButtons.push(
                <li className={this.state.pageNumber === i ? "paginate_button active" : "paginate_button "} key={i}>
                    <a aria-controls="example1"
                       data-dt-idx={i}
                       href="#"
                       onClick={this.handlePagination}
                       style={STYLE.paginationButtons}
                       tabIndex="0">{i}</a>
                </li>);
        }

        // Setting up minimum height of table
        const minHeight = 70 + 35 * (this.props.entries.length < this.state.selectValue ? entriesList.length :
                                                                                          this.state.selectValue),
            tableMinHeight = {
                minHeight: minHeight + "px"
            };

        // Rules for showing showString, pagination, and select options
        let showBasedOnRawData = this.props.entries.length > selectOptions[0];
        let showPagination = this.state.selectValue < entriesList.length;

        return (
            <div className="box-body">

                <div id="example1_wrapper"
                     className="dataTables_wrapper form-inline dt-bootstrap"
                     style={this.props.style}>

                    <div className="row">

                        {/* Optional title */}
                        <div className="col-sm-6" style={{paddingTop: "8px"}}>
                            <strong>{this.props.showOtherTitle ? this.props.content : ''}</strong>
                        </div>

                        {/* Search bar */}
                        <div className="col-sm-6">
                            <div id="example1_filter" className="dataTables_filter" style={{float: "right"}}>
                                <label>
                                    <input type="text"
                                           className="form-control input-sm"
                                           placeholder={`Filter...`}
                                           value={this.state.searchText}
                                           aria-controls="example1"
                                           onChange={this.handleSearch}/>
                                </label>
                            </div>
                        </div>

                    </div>

                    {this.props.entries.length === 0 ?
                        <div style={{textAlign: "center"}}>No {this.props.content}...</div> :
                        <div className="row">

                            <div className="col-sm-12" style={tableMinHeight}>
                                <table aria-describedby="example1_info"
                                       className="table table-bordered table-striped dataTable"
                                       id="example1"
                                       role="grid">

                                    <thead>
                                    <tr role="row">
                                        {formattedCategories}
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {formattedEntries}
                                    </tbody>

                                </table>
                            </div>

                        </div>}

                    <div className="row">

                        {/* "Showing" */}
                        <div className="col-sm-3">
                            {showBasedOnRawData ?
                                <div className="dataTables_info" id="example1_info" role="status"
                                     aria-live="polite">
                                    <div>
                                        <label style={{fontWeight: "normal", lineHeight: "2.4"}}>
                                            {showString}
                                        </label>
                                    </div>
                                </div> : null }
                        </div>

                        {/* Pagination buttons */}
                        <div className="col-sm-6" style={{textAlign: "center"}}>
                            {showPagination ?
                                <DataTablePagination clickHandler={this.handlePagination}
                                                     formattedPaginationButtons={formattedPaginationButtons}
                                                     numPages={numPages}
                                                     pageNumber={this.state.pageNumber}/> : null }
                        </div>

                        {/* Select dropdown */}
                        <div className="col-sm-3" style={{textAlign: "right"}}>
                            {showBasedOnRawData ?
                                <div className="dataTables_length" id="example1_length">
                                    <label style={{fontWeight: "normal"}}>{this.props.content} per page
                                        <select name="example1_length"
                                                aria-controls="example1"
                                                className="form-control input-sm"
                                                onChange={this.handleSelect}
                                                style={{padding: "5px 1px"}}>

                                            {formattedSelectOptions}

                                        </select>
                                    </label>
                                </div> : null}
                        </div>

                    </div>
                </div>

            </div>
        );
    }

}
