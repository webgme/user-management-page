import React from 'react';

export default class ProjectsDataTable extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
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
                                    <th className="sorting_asc"
                                        tabIndex="0"
                                        aria-controls="example1"
                                        rowSpan="1"
                                        colSpan="1" aria-sort="ascending"
                                        aria-label="Rendering engine: activate to sort column descending">
                                        Project Name
                                    </th>
                                    <th className="sorting"
                                        tabIndex="0"
                                        aria-controls="example1"
                                        rowSpan="1"
                                        colSpan="1"
                                        aria-label="Browser: activate to sort column ascending">
                                        Owner:
                                    </th>
                                    <th className="sorting"
                                        tabIndex="0"
                                        aria-controls="example1"
                                        rowSpan="1"
                                        colSpan="1"
                                        aria-label="Platform(s): activate to sort column ascending">
                                        OwnerID:
                                    </th>
                                    <th className="sorting"
                                        tabIndex="0"
                                        aria-controls="example1"
                                        rowSpan="1"
                                        colSpan="1"
                                        aria-label="Engine version: activate to sort column ascending">
                                        Organization
                                    </th>
                                    <th className="sorting"
                                        tabIndex="0"
                                        aria-controls="example1"
                                        rowSpan="1"
                                        colSpan="1"
                                        aria-label="CSS grade: activate to sort column ascending">
                                        Last Changed
                                    </th>
                                </tr>
                                </thead>
                                <tbody>

                                <tr role="row" className="odd">
                                    <td className="sorting_1">DeepForge</td>
                                    <td>Brian</td>
                                    <td>brianUserName</td>
                                    <td>-</td>
                                    <td>5/20/2016</td>
                                </tr><tr role="row" className="even">
                                    <td className="sorting_1">Gecko</td>
                                    <td>Firefox 1.5</td>
                                    <td>Win 98+ / OSX.2+</td>
                                    <td>1.8</td>
                                    <td>A</td>
                                </tr><tr role="row" className="odd">
                                    <td className="sorting_1">Gecko</td>
                                    <td>Firefox 2.0</td>
                                    <td>Win 98+ / OSX.2+</td>
                                    <td>1.8</td>
                                    <td>A</td>
                                </tr><tr role="row" className="even">
                                    <td className="sorting_1">Gecko</td>
                                    <td>Firefox 3.0</td>
                                    <td>Win 2k+ / OSX.3+</td>
                                    <td>1.9</td>
                                    <td>A</td>
                                </tr><tr role="row" className="odd">
                                    <td className="sorting_1">Gecko</td>
                                    <td>Camino 1.0</td>
                                    <td>OSX.2+</td>
                                    <td>1.8</td>
                                    <td>A</td>
                                </tr><tr role="row" className="even">
                                    <td className="sorting_1">Gecko</td>
                                    <td>Camino 1.5</td>
                                    <td>OSX.3+</td>
                                    <td>1.8</td>
                                    <td>A</td>
                                </tr><tr role="row" className="odd">
                                    <td className="sorting_1">Gecko</td>
                                    <td>Netscape 7.2</td>
                                    <td>Win 95+ / Mac OS 8.6-9.2</td>
                                    <td>1.7</td>
                                    <td>A</td>
                                </tr><tr role="row" className="even">
                                    <td className="sorting_1">Gecko</td>
                                    <td>Netscape Browser 8</td>
                                    <td>Win 98SE+</td>
                                    <td>1.7</td>
                                    <td>A</td>
                                </tr><tr role="row" className="odd">
                                    <td className="sorting_1">Gecko</td>
                                    <td>Netscape Navigator 9</td>
                                    <td>Win 98+ / OSX.2+</td>
                                    <td>1.8</td>
                                    <td>A</td>
                                </tr><tr role="row" className="even">
                                    <td className="sorting_1">Gecko</td>
                                    <td>Mozilla 1.0</td>
                                    <td>Win 95+ / OSX.1+</td>
                                    <td>1</td>
                                    <td>A</td>
                                </tr></tbody>
                                <tfoot>
                                <tr><th rowSpan="1" colSpan="1">Rendering engine</th>
                                    <th rowSpan="1" colSpan="1">Browser</th>
                                    <th rowSpan="1" colSpan="1">Platform(s)</th>
                                    <th rowSpan="1" colSpan="1">Engine version</th>
                                    <th rowSpan="1" colSpan="1">CSS grade</th></tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="dataTables_info"
                                 id="example1_info"
                                 role="status"
                                 aria-live="polite">Showing 1 to 10 of 57 entries</div>
                        </div>
                        <div className="col-sm-7">
                            <div className="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                                <ul className="pagination">
                                    <li className="paginate_button previous disabled" id="example1_previous">
                                        <a href="#" aria-controls="example1" data-dt-idx="0" tabIndex="0">Previous</a>
                                    </li>
                                    <li className="paginate_button active">
                                        <a href="#" aria-controls="example1" data-dt-idx="1" tabIndex="0">1</a>
                                    </li>
                                    <li className="paginate_button ">
                                        <a href="#" aria-controls="example1" data-dt-idx="2" tabIndex="0">2</a>
                                    </li>
                                    <li className="paginate_button ">
                                        <a href="#" aria-controls="example1" data-dt-idx="3" tabIndex="0">3</a>
                                    </li>
                                    <li className="paginate_button ">
                                        <a href="#" aria-controls="example1" data-dt-idx="4" tabIndex="0">4</a>
                                    </li>
                                    <li className="paginate_button ">
                                        <a href="#" aria-controls="example1" data-dt-idx="5" tabIndex="0">5</a>
                                    </li>
                                    <li className="paginate_button ">
                                        <a href="#" aria-controls="example1" data-dt-idx="6" tabIndex="0">6</a>
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
