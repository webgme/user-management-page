/**
 * Custom entries for the projects data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';
import Link from 'react-router/lib/Link';
// Self-defined
import DataTableEntry from './DataTableEntry.jsx';

export default class ProjectsDataTableEntry extends React.Component {

    render() {
        let buildLink = `${this.props.basePath}projects/${this.props.owner}/${this.props.name}`;

        return <DataTableEntry>
            <td>{this.props.owner}</td>
            <td className="sorting_1">
                <Link to={buildLink}>{this.props.name}</Link>
            </td>
            <td>{this.props.info.viewedAt}</td>
            <td>{this.props.info.modifiedAt}</td>
        </DataTableEntry>;
    }
}
