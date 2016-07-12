/* global $ */

/**
 * Container widget for the single organization table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Self-defined
import DataTable from '../../../../../components/content/widgets/data_tables/DataTable';
import OrganizationDataTableEntry from '../../../../../components/content/widgets/data_tables/table_entries/OrganizationDataTableEntry'; // eslint-disable-line max-len
import { sortObjectArrayByField} from '../../../../../../client/utils/utils';
import { retrieveMembersAndAdmins } from '../../../../../../client/utils/restUtils';
import { fetchOrganizationsIfNeeded } from '../../../../../actions/organizations';

class OrganizationTable extends Component {

    constructor(props) {
        super(props);
        // Event handlers
        this.handleOrderEntries = this.handleOrderEntries.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchOrganizationsIfNeeded());
    }

    handleOrderEntries(event) {

        if (this.props.display === 1) {
            this.setState({
                members: this.state.sortedForward ?
                    this.state.members.sort(sortObjectArrayByField('name')).reverse() :
                    this.state.members.sort(sortObjectArrayByField('name')),
                sortedForward: !this.state.sortedForward
            });
        } else {
            this.setState({
                admins: this.state.sortedForward ?
                    this.state.admins.sort(sortObjectArrayByField('name')).reverse() :
                    this.state.admins.sort(sortObjectArrayByField('name')),
                sortedForward: !this.state.sortedForward
            });
        }
    }

    render() {

        const { data } = this.props;
        const dataTableData = {
            categories: {
                members: [
                    {id: 1, name: 'Member Name'},
                    {id: 2, name: 'Admin'}
                ],
                admins: [
                    {id: 1, name: 'Admin Name'}
                ]
            }
        };

        return (
        <div>
            {/* Users collaborators table */}
            <div className="box">

                {/* Self-defined header */}
                <div className="box-header" style={{paddingBottom: 0}}>
                    <h3 className="box-title" style={{fontSize: 28}}>
                        <i className={this.props.iconClass}/> {` Collaborators`}
                    </h3>
                </div>

                <DataTable categories={dataTableData.categories.members}
                           entries={data.members}
                           iconClass="fa fa-university"
                           orderEntries={this.handleOrderEntries}
                           sortable={true}
                           sortedForward={true}>
                    <OrganizationDataTableEntry/>
                </DataTable>

                <DataTable categories={dataTableData.categories.admins}
                           entries={data.admins}
                           iconClass="fa fa-university"
                           orderEntries={this.handleOrderEntries}
                           restClient={this.props.restClient}
                           sortable={true}
                           sortedForward={true}>
                    <OrganizationDataTableEntry/>
                </DataTable>

            </div>

        </div>
        );
    }
}

OrganizationTable.propTypes = {
    data: PropTypes.shape({
        admins: PropTypes.array.isRequired,
        members: PropTypes.array.isRequired
    }).isRequired
};

const mapStateToProps = (state, ownProps) => {
    const { organizations } = state.organizations;
    const { organizationId } = ownProps;

    const data = retrieveMembersAndAdmins(organizations, organizationId);

    return {
        data
    };
};

export default connect(mapStateToProps)(OrganizationTable);

