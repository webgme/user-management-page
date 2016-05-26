import React from 'react';

export default class DataTableEntry extends React.Component {

    render() {

        let paginationStyle = {
            "marginTop": "20px",
            "marginRight": "170px",
            "marginBottom": "20px",
            "marginLeft": "170px"
        };

        return <div className="col-sm-7">
            <div className="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                <ul className="pagination" style={paginationStyle}>
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
        </div>;
    }
}
