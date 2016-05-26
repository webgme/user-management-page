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
            selectValue: 10
        };
        {/* This is required for nonReact functions to use this in its context*/}
        this.handleSelect = this.handleSelect.bind(this);
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
            selectValue: event.target.value
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


        // Formatting table entries
        let projectList = this.state.projects;
        let formattedEntries = [];
        let self = this;
        projectList.forEach(function(project, index) {
            let eachProject = Object.assign({}, project);
            eachProject.id = index;
            // change this to reduce later or filter (consider efficiency though)
            if (index < self.state.selectValue) {
                formattedEntries.push(<DataTableEntry key={eachProject.id} {...eachProject} />);
            }
        });

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
                                 aria-live="polite">Showing 1 to {formattedEntries.length}
                            </div>
                        </div>

                        <DataTablePagination />

                    </div>

                </div>
            </div>
        </div>;

    }

}
