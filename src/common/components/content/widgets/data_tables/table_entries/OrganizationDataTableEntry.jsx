/**
 * Custom entries for the organization data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
// Style
import { AdminBadge as STYLE } from '../../../../../../client/style';

export default class OrganizationDataTableEntry extends Component {

    render() {
        const { admin, name } = this.props;

        return (
            <tr role="row" className="odd">
                <td>
                    {name}
                </td>
                {admin === undefined ? null :
                    <td>{admin ? <i className="fa fa-check-circle" style={STYLE.isAdmin}/> :
                                 <i className="fa fa-times-circle" style={STYLE.isNotAdmin}/>}
                    </td>}
            </tr>
        );
    }
}
