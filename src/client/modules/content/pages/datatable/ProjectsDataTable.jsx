import React from 'react';
import DataTableEntry from './DataTableEntry.jsx';
import DataTableCategory from './DataTableCategory.jsx';
import DataTablePagination from './DataTablePagination.jsx';
import RestClient from '../../../../rest_client/restClient.js';

export default class ProjectsDataTable extends React.Component {

    constructor(props) {
        super(props);
        this.restClient = new RestClient('', true);
        this.state = {
            projects: [],
            selectValue: 10,
            pageNumber: 1,
            searchText: ''
        };
        {/* This is required for nonReact functions to use this the functions context*/}
        this.handleSelect = this.handleSelect.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
        this.handleNextPagination = this.handleNextPagination.bind(this);
        this.handlePreviousPagination = this.handlePreviousPagination.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        var self = this;
        this.restClient.projects.getAllProjects()
            .then(function(data) {
                self.setState({projects: data});
            });
    }

    handleSelect(event) {
        this.setState({
            selectValue: parseInt(event.target.value.trim())
        });
    }

    handlePagination(event) {
        this.setState({
            pageNumber: parseInt(event.target.innerHTML.trim(), 10)
        });
    }

    // Restrictions are applied to allowing clicks so no need to account in the event handler
    handlePreviousPagination() {
        this.setState({
            pageNumber: this.state.pageNumber - 1
        });
    }

    // Restrictions are applied to allowing clicks so no need to account in the event handler
    handleNextPagination() {
        this.setState({
            pageNumber: this.state.pageNumber + 1
        });
    }

    handleSearch(event) {
        this.setState({
            searchText: event.target.value
        });
    }

    render() {

        // Formatting table categories
        let formattedCategories = [];
        let categories = [
            {id: 1, name: 'Project Name:'},
            {id: 2, name: 'Owner'},
            {id: 3, name: 'Organization:'},
            {id: 4, name: 'Last Viewed:'},
            {id: 5, name: 'Last Changed:'}
        ];
        categories.forEach(function(category) {
            formattedCategories.push(<DataTableCategory key={category.id} name={category.name}/>);
        });


        // Setting up bounds
        let self = this;
        let projectList = this.state.projects.filter( oneProject => {
            let filterRegex = new RegExp(self.state.searchText);
            return filterRegex.test(oneProject.name);
        }),
            startIndexInProjects = ( this.state.pageNumber - 1 ) * this.state.selectValue,
            displayNumStart = startIndexInProjects + 1,
            displayNumEnd;

        // Putting together "show string"
        if (projectList.length > (startIndexInProjects + this.state.selectValue)) {
            displayNumEnd = (startIndexInProjects + this.state.selectValue);
        } else {
            displayNumEnd = projectList.length;
        }
        let showString = 'Showing ' + displayNumStart + ' to ' + displayNumEnd;
        if (displayNumStart > projectList.length) {
            showString = 'Nothing to show.';
        }

        // Formatting table entries
        let formattedEntries = [];
        for(let i = displayNumStart - 1; i < displayNumEnd; i++) {
            formattedEntries.push(<DataTableEntry key={i} {...Object.assign({}, projectList[i])} />);
        }

        // Formatting selections (can make more efficient later)
        let formattedSelectOptions = [];
        let selectOptions = [10, 25, 50 , 100];
        selectOptions.forEach(function(opt, index) {
            formattedSelectOptions.push(<option value={String(opt)} key={index}>{opt}</option>)
        });

        // Formatting pagination buttons
        let formattedPaginationButtons = [],
            numPages = 6;
        for(let i = 1; i <= numPages; i++) {
            formattedPaginationButtons.push(
            <li className={this.state.pageNumber === i ? "paginate_button active" : "paginate_button "} key={i}>
                <a onClick={this.handlePagination} href="javascript:;" aria-controls="example1" data-dt-idx={i} tabIndex="0">{i}</a>
            </li>);
        }


        return <div className="box">
            <div className="box-header">
                <h3 className="box-title">Data Table With Full Features</h3>
            </div>
            <div className="box-body">
                <div id="example1_wrapper" className="dataTables_wrapper form-inline dt-bootstrap">
                    <div className="row">

                        {/* Number of entries shown */}
                        <div className="col-sm-6">
                            <div className="dataTables_length" id="example1_length">
                                <label>Show
                                    <select name="example1_length"
                                            aria-controls="example1"
                                            className="form-control input-sm"
                                            onChange={this.handleSelect}>

                                        {formattedSelectOptions}

                                    </select> projects
                                </label>
                            </div>
                        </div>

                        {/* Search bar */}
                        <div className="col-sm-6">
                            <div id="example1_filter" className="dataTables_filter">
                                <label>Search:
                                    <input type="text"
                                           className="form-control input-sm"
                                           placeholder="Filter by project name"
                                           value={this.state.searchText}
                                           aria-controls="example1"
                                           onChange={this.handleSearch}/>
                                </label>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <table id="example1"
                                   className="table table-bordered table-striped dataTable"
                                   role="grid"
                                   aria-describedby="example1_info">

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
                    </div>

                    <div className="row">
                        <div className="col-sm-5">
                            <div className="dataTables_info" id="example1_info" role="status" aria-live="polite">

                                {showString}

                            </div>
                        </div>

                        <div className="col-sm-7">
                            <div className="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                                <ul className="pagination">
                                    <li id="example1_previous"
                                        className={this.state.pageNumber === 1 ? "paginate_button previous disabled" : "paginate_button previous"}
                                        onClick={this.state.pageNumber === 1 ? ()=>{} : this.handlePreviousPagination}>
                                        <a href="javascript:;" aria-controls="example1" data-dt-idx="0" tabIndex="0">Previous</a>
                                    </li>

                                    {formattedPaginationButtons}

                                    <li id="example1_next"
                                        className={this.state.pageNumber === numPages ? "paginate_button next disabled" : "paginate_button next"}
                                        onClick={this.state.pageNumber === numPages ? ()=>{} : this.handleNextPagination}>
                                        <a href="javascript:;" aria-controls="example1" data-dt-idx="7" tabIndex="0">Next</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>;

    }

}
