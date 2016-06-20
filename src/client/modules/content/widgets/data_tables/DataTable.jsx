/**
 * Reusable data table widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';
// Self-defined
import DataTableCategory from './DataTableCategory';
import DataTablePagination from './DataTablePagination';

export default class DataTable extends React.Component {

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

    componentWillReceiveProps(nextProps) {
        if (nextProps.display !== this.props.display) {
            this.setState({
                searchText: ''
            });
        }
    }

    handlePagination(event) {
        let newPageNum;
        if (event.target.innerHTML.trim() === 'Next') {
            newPageNum = this.state.pageNumber + 1;
        } else if (event.target.innerHTML.trim() === 'Previous') {
            newPageNum = this.state.pageNumber - 1;
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
                                                        numTimesClicked={this.props.numTimesClicked}
                                                        sortable={this.props.sortable}/>));

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
                properties.basePath = this.props.basePath;
                properties.handleRevoke = this.props.handleRevoke;
                properties.key = i;
                properties.ownerId = this.props.ownerId;
                properties.projectName = this.props.projectName;
                properties.restClient = this.props.restClient;
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
                    <a onClick={this.handlePagination} href="#" aria-controls="example1" data-dt-idx={i}
                       tabIndex="0">{i}</a>
                </li>);
        }

        return (

            <div className="box" style={this.props.style}>

                {/* Customizable Table Header) */}
                {React.cloneElement(this.props.TableHeader, this.props)}

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

                                        </select> {(this.props.tableName.toLowerCase())}
                                    </label>
                                </div>
                            </div>

                            {/* Search bar */}
                            <div className="col-sm-6">
                                <div id="example1_filter" className="dataTables_filter" style={{float: "right"}}>
                                    <label>Filter:
                                        <input type="text"
                                               className="form-control input-sm"
                                               placeholder={`(Type ${this.props.tableName.toLowerCase()} name)`}
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
                                <div className="dataTables_info" id="example1_info" role="status"
                                     aria-live="polite">
                                    <div style={{lineHeight: 6, paddingRight: "0px"}}>
                                        {showString}
                                    </div>
                                </div>
                            </div>

                            {entriesList.length > this.state.selectValue ?
                                <DataTablePagination clickHandler={this.handlePagination}
                                                     formattedPaginationButtons={formattedPaginationButtons}
                                                     numPages={numPages}
                                                     pageNumber={this.state.pageNumber}/> :
                             null }

                        </div>
                    </div>
                </div>

            </div>
        );
    }

}
