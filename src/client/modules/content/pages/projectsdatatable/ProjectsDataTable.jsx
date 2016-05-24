import React from 'react';
import DataTableEntry from './DataTableEntry.jsx';
import DataTableCategory from './DataTableCategory.jsx';
import DataTablePagination from './DataTablePagination.jsx';

var ProjectsDataTable = React.createClass({

    mockDataForNow: [
        {
            name: 'DeepForge',
            owner: 'Brian',
            organization: '-',
            lastViewed: '5/29/2016',
            lastChanged: '5/20/2016' // convert to Date objects later
        },
        {
            name: 'test project',
            owner: 'test',
            organization: '-',
            lastViewed: 'date',
            lastChanged: 'date' // convert to Date objects later
        },
        {
            name: 'other test project',
            owner: 'test',
            organization: '-',
            lastViewed: 'date',
            lastChanged: 'date' // convert to Date objects later
        }
    ],

    dataTableCategories: ['Project Name:', 'Owner', 'Organization:', 'Last Viewed:', 'Last Changed:'],

    render: function() {

        // Formatting table categories
        let formattedCategories = [];
        let categories = this.dataTableCategories;
        categories.forEach(function(category) {
            formattedCategories.push(<DataTableCategory name={category}/>);
        });

        // Formatting table entries
        let projectList = this.mockDataForNow;
        let formattedEntries = [];
        projectList.forEach(function(project) {
            formattedEntries.push(<DataTableEntry {...Object.assign({}, project)} />);
        });

        return <div className="box">
            <div className="box-header">
                <h3 className="box-title">Data Table With Full Features</h3>
            </div>
            <div className="box-body">
                <div id="example1_wrapper" className="dataTables_wrapper form-inline dt-bootstrap">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="dataTables_length" id="example1_length">
                                <label>Show
                                    <select name="example1_length"
                                            aria-controls="example1"
                                            className="form-control input-sm">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select> entries
                                </label>
                            </div>
                        </div>
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

                                <tfoot>
                                <tr>
                                    {formattedCategories}
                                </tr>
                                </tfoot>

                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="dataTables_info"
                                 id="example1_info"
                                 role="status"
                                 aria-live="polite">Showing 1 to {formattedEntries.length}</div>
                        </div>

                        <DataTablePagination />

                    </div>
                </div>
            </div>
        </div>;
    }

});

module.exports = ProjectsDataTable;
