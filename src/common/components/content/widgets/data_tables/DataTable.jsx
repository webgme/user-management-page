/**
 * Reusable data table widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
// Self-defined
import DataTableCategory from './table_utilities/DataTableCategory';
import DataTablePagination from './table_utilities/DataTablePagination';
import { sortBy, setPageNumber, setSearchText, setSelectValue } from
    '../../../../actions/tables.js';
import { TABLE_FIELDS } from '../../../../../client/utils/constants';
// Style
import { DataTable as STYLE } from '../../../../../client/style';

export default class DataTable extends Component {

    constructor(props) {
        super(props);
        // Event handlers
        this.handleOrderEntries = this.handleOrderEntries.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleOrderEntries(event) {
        const { dispatch, reducerTableName } = this.props,
            category = event.target.innerHTML,
            newSortCategory = TABLE_FIELDS[reducerTableName][category];

        dispatch(sortBy(reducerTableName, newSortCategory));
    }

    handlePagination(event) {
        // Release focus
        event.target.blur();
        const { dispatch, reducerTableName } = this.props;

        let displayPageNumber = parseInt(event.target.dataset.page, 10),
            newPageNumber = parseInt(event.target.dataset.page, 10);

        const parsedText = event.target.innerHTML.trim();
        switch (parsedText) {
            case 'Next':
                newPageNumber += 1;
                break;
            case 'Previous':
                newPageNumber -= 1;
                break;
            default:
                newPageNumber = parseInt(parsedText, 10);
                break;
        }

        if (newPageNumber !== displayPageNumber) {
            dispatch(setPageNumber(reducerTableName, newPageNumber));
        }
    }

    handleSearch(event) {
        const { dispatch, reducerTableName } = this.props;
        const currentSearchText = this.props.tableOptions.searchText;
        const newSearchText = event.target.value.toLowerCase();

        if (newSearchText !== currentSearchText) {
            dispatch(setSearchText(reducerTableName, newSearchText));
        }
    }

    handleSelect(event) {
        // Release focus
        event.target.blur();

        const { dispatch, reducerTableName } = this.props;
        const currentSelectValue = this.props.tableOptions.selectValue;
        const newSelectValue = parseInt(event.target.value.trim(), 10);

        if (newSelectValue !== currentSelectValue) {
            dispatch(setSelectValue(reducerTableName, newSelectValue));
            dispatch(setPageNumber(reducerTableName, 1));
        }
    }

    render() {
        const { categories, entries } = this.props;
        const { pageNumber, searchText, selectValue, sortedForward } = this.props.tableOptions;

        // Formatting table categories
        let formattedCategories = [];
        categories.forEach(category =>
            formattedCategories.push(<DataTableCategory className={category.className}
                                                        key={category.id}
                                                        name={category.name}
                                                        orderEntries={this.handleOrderEntries}
                                                        sortable={this.props.sortable}
                                                        sortedForward={sortedForward}
                                                        style={category.style} />));

        // Filter out nodes..
        let entriesList = entries.filter(oneEntry => {
            let filterRegex = new RegExp(searchText);
            return filterRegex.test(oneEntry.name.toLowerCase());
        });

        // Formatting pagination buttons
        let formattedPaginationButtons = [],
            numPages = Math.floor(entriesList.length / selectValue) + 1,
            startPage,
            displayedPageNumber,
            endPage;

        if (pageNumber > numPages) {
            // Make sure the pageNumber actually exists, if not fall back to first
            displayedPageNumber = 1;
        } else {
            displayedPageNumber = pageNumber;
        }

        if (numPages <= 3) {
            startPage = 1;
            endPage = numPages;
        } else if (displayedPageNumber === 1) {
            startPage = 1;
            endPage = 3;
        } else if (displayedPageNumber === numPages) {
            startPage = numPages - 2;
            endPage = numPages;
        } else {
            startPage = displayedPageNumber - 1;
            endPage = displayedPageNumber + 1;
        }

        for (let i = startPage; i <= endPage; i++) {
            formattedPaginationButtons.push(
                <li className={displayedPageNumber === i ? "paginate_button active" : "paginate_button "} key={i}>
                    <a href="#"
                       data-page={displayedPageNumber}
                       onClick={this.handlePagination}
                       style={STYLE.paginationButtons.buttons}>{i}</a>
                </li>);
        }

        // Putting together "show string"

        var startIndexInProjects = (displayedPageNumber - 1) * selectValue,
            displayNumStart = startIndexInProjects + 1,
            displayNumEnd,
            showString,
            totalNbrOfEntries = this.props.entries.length;

        if (entriesList.length > (startIndexInProjects + selectValue)) {
            displayNumEnd = (startIndexInProjects + selectValue);
        } else {
            displayNumEnd = entriesList.length;
        }

        if (searchText) {
            showString = `${displayNumStart} - ${displayNumEnd} of ${entriesList.length} (${totalNbrOfEntries})`;
        } else {
            showString = `${displayNumStart} - ${displayNumEnd} of ${totalNbrOfEntries}`;
        }

        if (displayNumStart > entriesList.length) {
            showString = 'Nothing to show.';
        }

        // Formatting table entries
        let formattedEntries = [];
        for (let i = displayNumStart - 1; i < displayNumEnd; i++) {
            let properties = {};
            Object.keys(entriesList[i]).forEach(prop => {
                properties[prop] = entriesList[i][prop];
                properties.key = i;
            });
            formattedEntries.push(React.cloneElement(this.props.children, properties));
        }

        // Formatting selections (can make more efficient later)
        let formattedSelectOptions = [];
        const selectOptions = [10, 25, 50, 100];
        selectOptions.forEach((opt, index) =>
            formattedSelectOptions.push(<option value={String(opt)} key={index}>{opt}</option>));

        // Setting up minimum height of table
        const minHeight = 70 + 35 * (this.props.entries.length < selectValue ? entriesList.length :
                                                                                          selectValue),
            tableMinHeight = {
                minHeight: minHeight + "px"
            };

        // Rules for showing showString, pagination, and select options
        let showBasedOnRawData = this.props.entries.length > selectOptions[0];
        let showPagination = selectValue < entriesList.length;

        return (
            <div className="box-body">
                <div className="row">

                    {/* Optional title */}
                    <div className="col-sm-6" style={{paddingTop: "8px"}}>
                        <strong>{this.props.showOtherTitle ? this.props.content : ''}</strong>
                    </div>

                    {/* Search bar */}
                    <div className="col-sm-6">
                        <div style={{float: "right"}}>
                            <label>
                                <input type="text"
                                       className="form-control input-sm"
                                       placeholder={`Filter...`}
                                       style={{display: totalNbrOfEntries <= 10 && searchText === '' ?
                                        'none' : 'inline-block'}}
                                       value={searchText}
                                       onChange={this.handleSearch}/>
                            </label>
                        </div>
                    </div>

                </div>

                {this.props.entries.length === 0 ?
                    <div style={STYLE.noEntriesLabel}>No {this.props.content}...</div> :
                    <div className="row">

                        <div className="col-sm-12" style={tableMinHeight}>
                            <table className="table table-bordered table-striped dataTable">

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
                            <div className="dataTables_info" id="example1_info" role="status">
                                <div>
                                    <label style={STYLE.showString}>
                                        {showString}
                                    </label>
                                </div>
                            </div> : null }
                    </div>

                    {/* Pagination buttons */}
                    <div className="col-sm-6" style={STYLE.paginationButtons.column}>
                        {showPagination ?
                            <DataTablePagination clickHandler={this.handlePagination}
                                                 formattedPaginationButtons={formattedPaginationButtons}
                                                 numPages={numPages}
                                                 pageNumber={displayedPageNumber}/> : null }
                    </div>

                    {/* Select dropdown */}
                    <div className="col-sm-3" style={STYLE.selectDropdown.column}>
                        {showBasedOnRawData ?
                            <div>
                                <label style={STYLE.selectDropdown.label}>Items per page:
                                    <select className="form-control input-sm"
                                            onChange={this.handleSelect}
                                            value={selectValue}
                                            style={STYLE.selectDropdown.options}>

                                        {formattedSelectOptions}

                                    </select>
                                </label>
                            </div> : null}
                    </div>

                </div>
            </div>
        );
    }

}
