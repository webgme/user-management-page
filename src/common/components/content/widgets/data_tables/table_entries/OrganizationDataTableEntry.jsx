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
        const { name, isMember, isAdmin } = this.props;

        return (
            <tr role="row" className="odd">
                <td>
                    {name}
                </td>
                <td>
                    {isAdmin ? <i className="fa fa-check-circle" style={STYLE.isAdmin}/> : null}
                    {isAdmin && isMember === false ? <span className="admin-not-member">!</span> : null}
                </td>
            </tr>
        );
    }
}
