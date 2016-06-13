// Libraries
import React from '../../../../../../node_modules/react/lib/React';
import {Link} from 'react-router/lib';
import DataTableEntry from './DataTableEntry.jsx';

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
