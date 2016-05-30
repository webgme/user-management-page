import React from 'react';
import CollaboratorTableEntry from './CollaboratorTableEntry.jsx';
import DataTableCategory from './DataTableCategory.jsx';

export default class CollaboratorDataTable extends React.Component {

    constructor(props) {
        super(props);
        this.restClient = this.props.restClient;
        this.state = {
            collaborators: [],
            selectValue: 10,
            pageNumber: 1,
            searchText: ''
        };
        this.projectName = this.props.projectName;
        this.ownerId =  this.props.ownerId;

        {/* This is required for nonReact functions to use this the functions context*/}
        this.handleSelect = this.handleSelect.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
        this.handleNextPagination = this.handleNextPagination.bind(this);
        this.handlePreviousPagination = this.handlePreviousPagination.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        let self = this;
        let projectWithOwnerId = self.ownerId + '+' + self.projectName;
        // First checking through list of all users and seeing if each has access to the project
        this.restClient.users.getAllUsers()
            .then(function(users) {
                users.forEach(function(userData) {
                    if (userData['_id'] === self.ownerId) {
                    }
                    if (userData['projects'].hasOwnProperty( projectWithOwnerId )) {
                        self.setState({
                            collaborators: (self.state.collaborators.concat( {
                                name: userData['_id'],
                                read: userData.projects[projectWithOwnerId].read,
                                write: userData.projects[projectWithOwnerId].write,
                                delete: userData.projects[projectWithOwnerId].delete
                            }))
                        });
                    }
                });
            })
            .then(function() {
                return self.restClient.organizations.getAllOrganizations();
            })
            // Then checking all organizations and seeing if each has access to the project
            .then(function(allOrganizations) {
                allOrganizations.forEach(function(singleOrganization) {
                    if (singleOrganization.projects.hasOwnProperty( projectWithOwnerId )) {
                        let orgRights = {
                            read: singleOrganization.projects[projectWithOwnerId].read,
                            write: singleOrganization.projects[projectWithOwnerId].write,
                            delete: singleOrganization.projects[projectWithOwnerId].delete
                        };
                        self.restClient.organizations.getOrganizationData(singleOrganization['_id'])
                            .then(function(orgData) {
                                orgData.users.forEach(function(username) {
                                    // Checking if name is already in collaborators list
                                    for(let i = 0; i < self.state.collaborators.length; i++) {
                                        if (self.state.collaborators[i].name !== username) {
                                            self.setState({
                                                collaborators: self.state.collaborators.concat( {
                                                    name: username,
                                                    read: orgRights.read,
                                                    write: orgRights.write,
                                                    delete: orgRights.delete
                                                })
                                            });
                                        } else {
                                            let oldRights = {
                                                read: self.state.collaborators[i].read,
                                                write: self.state.collaborators[i].write,
                                                delete: self.state.collaborators[i].delete
                                            };
                                            //copy state without that person
                                            let collaboratorsWithoutDuplicate = self.state.collaborators.filter( each => {
                                                return each.name !== self.state.collaborators[i].name;
                                            });
                                            self.setState({
                                                collaborators: collaboratorsWithoutDuplicate.concat( {
                                                    name: username,
                                                    read: oldRights.read || orgRights.read,
                                                    write: oldRights.write || orgRights.write,
                                                    delete: oldRights.delete || orgRights.delete
                                                })
                                            });
                                        }
                                    }

                                });
                            });
                    }
                });
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
            searchText: event.target.value.toLowerCase()
        });
    }

    render() {

        // Formatting table categories
        let formattedCategories = [];
        let categories = [
            {id: 1, name: 'UserID:'},
            {id: 2, name: 'Rights (RWD)'}
            // TODO: add icon indicating whether rights are from an organization or self
        ];
        categories.forEach(function(category) {
            formattedCategories.push(<DataTableCategory key={category.id} name={category.name}/>);
        });


        // Setting up bounds
        let self = this;
        let collaboratorList = this.state.collaborators.filter( oneCollaborator => {
                let filterRegex = new RegExp(self.state.searchText);
                return filterRegex.test(oneCollaborator.name.toLowerCase()); //TODO: add back case-insensitive search
            }),
            startIndexInProjects = ( this.state.pageNumber - 1 ) * this.state.selectValue,
            displayNumStart = startIndexInProjects + 1,
            displayNumEnd;

        // Putting together "show string"
        if (collaboratorList.length > (startIndexInProjects + this.state.selectValue)) {
            displayNumEnd = (startIndexInProjects + this.state.selectValue);
        } else {
            displayNumEnd = collaboratorList.length;
        }
        let showString = 'Showing ' + displayNumStart + ' to ' + displayNumEnd;
        if (displayNumStart > collaboratorList.length) {
            showString = 'Nothing to show.';
        }

        // Formatting table entries
        let formattedEntries = [];
        for(let i = displayNumStart - 1; i < displayNumEnd; i++) {
            formattedEntries.push(<CollaboratorTableEntry key={i}
                                                          name={collaboratorList[i].name}
                                                          read={collaboratorList[i].read}
                                                          write={collaboratorList[i].write}
                                                          delete={collaboratorList[i].delete}/>);
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
                <h3 className="box-title">Collaborators</h3>
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

                                    </select> collaborators
                                </label>
                            </div>
                        </div>

                        {/* Search bar */}
                        <div className="col-sm-6">
                            <div id="example1_filter" className="dataTables_filter">
                                <label>Search:
                                    <input type="text"
                                           className="form-control input-sm"
                                           placeholder="Filter by collaborator name"
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
