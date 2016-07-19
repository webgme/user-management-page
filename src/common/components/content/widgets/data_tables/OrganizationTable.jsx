/* global */

/**
 * Container widget for the single organization table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
// Self-defined
import DataTable from './DataTable';
import OrganizationDataTableEntry from './table_entries/OrganizationDataTableEntry';
import { sortObjectArrayByField} from '../../../../../client/utils/utils';
import { fetchOrganizationsIfNeeded } from '../../../../actions/organizations';

export default class OrganizationTable extends Component {

    constructor(props) {
        super(props);
        // Event handlers
        this.handleOrderEntries = this.handleOrderEntries.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchOrganizationsIfNeeded());
    }

    handleOrderEntries(/*event*/) {

        // if (this.props.display === 1) {
        //     this.setState({
        //         members: this.state.sortedForward ?
        //             this.state.members.sort(sortObjectArrayByField('name')).reverse() :
        //             this.state.members.sort(sortObjectArrayByField('name')),
        //         sortedForward: !this.state.sortedForward
        //     });
        // } else {
        //     this.setState({
        //         admins: this.state.sortedForward ?
        //             this.state.admins.sort(sortObjectArrayByField('name')).reverse() :
        //             this.state.admins.sort(sortObjectArrayByField('name')),
        //         sortedForward: !this.state.sortedForward
        //     });
        // }
    }

    render() {

        const { members } = this.props.data;
        const { canAuthorize } = this.props;

        const categories = [
            {id: 1, name: 'User'},
            {id: 2, name: 'Admin'}
        ];

        return (
            <div>
                {/* Self-defined header */}
                <div className="box-header" style={{paddingBottom: 0}}>
                    <h3 className="box-title" style={{fontSize: 28}}>
                        <i className={this.props.iconClass}/> {` Members`}
                    </h3>
                </div>

                <DataTable categories={categories}
                           entries={members}
                           orderEntries={this.handleOrderEntries}
                           sortable={true}
                           sortedForward={true}>
                    <OrganizationDataTableEntry canAuthorize={canAuthorize}/>
                </DataTable>
            </div>
        );
    }
}

OrganizationTable.propTypes = {
    data: PropTypes.shape({
        members: PropTypes.array.isRequired
    }).isRequired
};
