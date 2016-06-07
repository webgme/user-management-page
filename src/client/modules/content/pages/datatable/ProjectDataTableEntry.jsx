// Libraries
import React from '../../../../../../node_modules/react/lib/React';
import {Link} from 'react-router/lib';
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
