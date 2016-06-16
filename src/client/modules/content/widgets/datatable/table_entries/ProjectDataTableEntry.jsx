/**
 * Custom entries for the project data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';
// Self-defined
import DataTableEntry from './DataTableEntry.jsx';

export default class ProjectDataTableEntry extends React.Component {

    render() {

        let rights = this.props.read ? 'Read  ' : '';
        rights += this.props.write ? 'Write  ' : '';
        rights += this.props.delete ? 'Delete' : '';

        return <DataTableEntry>
            <td>
                {this.props.inOrg ? <i className="fa fa-user-plus"/> : <i className="fa fa-user"/> }
                {'  ' + this.props.name}
            </td>
            <td>{rights}</td>
        </DataTableEntry>;
    }
}
