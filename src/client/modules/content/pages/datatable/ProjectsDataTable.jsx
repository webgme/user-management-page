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
            pageNumber: 1
        };
        {/* This is required for nonReact functions to use this the functions context*/}
        this.handleSelect = this.handleSelect.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
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
        let projectList = this.state.projects,
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
        for(let i = displayNumStart; i < displayNumEnd; i++) {
            formattedEntries.push(<DataTableEntry key={i} {...Object.assign({}, projectList[i])} />);
        }


        //Formatting selections (can make more efficient later)
        let selectOptions = [10, 25, 50 , 100];

        
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
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select> entries
                                </label>
                            </div>
                        </div>

                        {/* Search bar */}
                        <div className="col-sm-6">
                            <div id="example1_filter" className="dataTables_filter">
                                <label>Search:
                                    <input type="search"
                                           className="form-control input-sm"
                                           placeholder=""
                                           aria-controls="example1" />
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
                            <div className="dataTables_info"
                                 id="example1_info"
                                 role="status"
                                 aria-live="polite">{showString}
                            </div>
                        </div>

                        <div className="col-sm-7">
                            <div className="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                                <ul className="pagination">
                                    <li className="paginate_button previous disabled" id="example1_previous">
                                        <a href="#" aria-controls="example1" data-dt-idx="0" tabIndex="0">Previous</a>
                                    </li>
                                    <li className={this.state.pageNumber === 1 ? "paginate_button active" : "paginate_button "}>
                                        <a onClick={this.handlePagination} href="javascript:;" aria-controls="example1" data-dt-idx="1" tabIndex="0">1</a>
                                    </li>
                                    <li className={this.state.pageNumber === 2 ? "paginate_button active" : "paginate_button "}>
                                        <a onClick={this.handlePagination} href="javascript:;" aria-controls="example1" data-dt-idx="2" tabIndex="0">2</a>
                                    </li>
                                    <li className={this.state.pageNumber === 3 ? "paginate_button active" : "paginate_button "}>
                                        <a onClick={this.handlePagination} href="javascript:;" aria-controls="example1" data-dt-idx="3" tabIndex="0">3</a>
                                    </li>
                                    <li className={this.state.pageNumber === 4 ? "paginate_button active" : "paginate_button "}>
                                        <a onClick={this.handlePagination} href="javascript:;" aria-controls="example1" data-dt-idx="4" tabIndex="0">4</a>
                                    </li>
                                    <li className={this.state.pageNumber === 5 ? "paginate_button active" : "paginate_button "}>
                                        <a onClick={this.handlePagination} href="javascript:;" aria-controls="example1" data-dt-idx="5" tabIndex="0">5</a>
                                    </li>
                                    <li className={this.state.pageNumber === 6 ? "paginate_button active" : "paginate_button "}>
                                        <a onClick={this.handlePagination} href="javascript:;" aria-controls="example1" data-dt-idx="6" tabIndex="0">6</a>
                                    </li>
                                    <li className="paginate_button next" id="example1_next">
                                        <a href="#" aria-controls="example1" data-dt-idx="7" tabIndex="0">Next</a>
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
