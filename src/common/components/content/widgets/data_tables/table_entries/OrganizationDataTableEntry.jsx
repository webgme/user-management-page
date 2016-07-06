/**
 * Custom entries for the organization data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react';

export default class OrganizationDataTableEntry extends React.Component {

    render() {
        return <tr role="row" className="odd">
            <td>
                {this.props.name}
            </td>
            {this.props.admin === undefined ? null :
                <td>{this.props.admin ? <i className="fa fa-check-circle" style={{color: "green"}}/> :
                                        <i className="fa fa-times-circle" style={{color: "red"}}/>}</td>}
        </tr>;
    }
}
