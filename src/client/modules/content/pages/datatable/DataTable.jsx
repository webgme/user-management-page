// Libraries
import React from '../../../../../../node_modules/react/lib/React';
import Button from '../../../../../../node_modules/react-bootstrap/lib/Button';
import ButtonGroup from '../../../../../../node_modules/react-bootstrap/lib/ButtonGroup';
// Self-defined
import DataTableCategory from './DataTableCategory.jsx';
import DataTablePagination from './DataTablePagination.jsx';

export default class DataTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectValue: 10,
            pageNumber: 1,
            searchText: ''
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSelect(event) {
        this.setState({
            selectValue: parseInt(event.target.value.trim(), 10)
        });
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

    render() {
        let self = this;

        // Formatting table categories
        let formattedCategories = [];
        this.props.categories.forEach(category =>
            formattedCategories.push(<DataTableCategory key={category.id}
                                                        name={category.name}
                                                        orderEntries={self.props.orderEntries}
                                                        numTimesClicked={self.props.numTimesClicked}
                                                        sortable={self.props.sortable}/>));

        // Setting up bounds
        let entriesList = this.props.entries.filter(oneEntry => {
                let filterRegex = new RegExp(self.state.searchText);
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
            for (let prop in entriesList[i]) {
                properties[prop] = entriesList[i][prop];
                properties.basePath = this.props.basePath;
                properties.key = i;
            }
            formattedEntries.push(React.cloneElement(this.props.children, properties));
        }

        // Formatting selections (can make more efficient later)
        let formattedSelectOptions = [];
        let selectOptions = [10, 25, 50, 100];
        selectOptions.forEach((opt, index) =>
            formattedSelectOptions.push(<option value={String(opt)} key={index}>{opt}</option>));

        // Formatting pagination buttons
        let formattedPaginationButtons = [],
            numPages = 6;
        for (let i = 1; i <= numPages; i++) {
            formattedPaginationButtons.push(
                <li className={this.state.pageNumber === i ? "paginate_button active" : "paginate_button "} key={i}>
                    <a onClick={this.handlePagination} href="javascript:;" aria-controls="example1" data-dt-idx={i}
                       tabIndex="0">{i}</a>
                </li>);
        }

        return (

                <div className="box">
                    <div className="box-header">
                            <h3 className="box-title">{this.props.tableName}</h3>
                        { (this.props.dualTable && this.props.dualTable.show) ?
                            <ButtonGroup style={{float: "right"}}>
                                <Button bsStyle={this.props.display === 1 ? "primary" : null}
                                        onClick={this.props.handleTableSwitch}
                                        id="or">{this.props.dualTable.options[0]}</Button>
                                <Button bsStyle={this.props.display === 2 ? "primary" : null}
                                        onClick={this.props.handleTableSwitch}
                                        id="ow">{this.props.dualTable.options[1]}</Button>
                            </ButtonGroup> : null}
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

                                            </select> {(this.props.tableName.toLowerCase())}
                                        </label>
                                    </div>
                                </div>

                                {/* Search bar */}
                                <div className="col-sm-6">
                                    <div id="example1_filter" className="dataTables_filter" style={{float: "right"}}>
                                        <label>Search:
                                            <input type="text"
                                                   className="form-control input-sm"
                                                   placeholder={`Search ${this.props.tableName.toLowerCase()} name`}
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
                                        <div style={{lineHeight: 6}}>
                                            {showString}
                                        </div>
                                    </div>
                                </div>

                                <DataTablePagination pageNumber={this.state.pageNumber}
                                                     clickHandler={this.handlePagination}
                                                     formattedPaginationButtons={formattedPaginationButtons}
                                                     numPages={numPages}/>

                            </div>
                        </div>
                    </div>
                </div>
        );
    }

}
