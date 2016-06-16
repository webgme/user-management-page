/**
 * Custom entries for the organizations data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';
import Link from 'react-router/lib/Link';
// Self-defined
import DataTableEntry from './DataTableEntry';

export default class OrganizationsDataTableEntry extends React.Component {

    render() {

        let buildLink = `${this.props.basePath}organizations/${this.props.name}`;

        return <DataTableEntry>
            <td className="sorting_1">
                <Link to={buildLink}>{this.props.name}</Link>
            </td>
        </DataTableEntry>;
    }
}
