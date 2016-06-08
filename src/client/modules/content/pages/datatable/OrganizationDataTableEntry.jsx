// Libraries
import React from '../../../../../../node_modules/react/lib/React';
import DataTableEntry from './DataTableEntry.jsx';

export default class OrganizationDataTableEntry extends React.Component {

    render() {
        return <DataTableEntry>
            <td>
                {this.props.name}
            </td>
            <td>{this.props.admin ? <i className="fa fa-check-circle" style={{color: "green"}}/> :
                                    <i className="fa fa-times-circle" style={{color: "red"}}/>}</td>
        </DataTableEntry>;
    }
}
