/**
 * Custom entries for the users data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';

export default class UsersDataTableEntry extends Component {

    render() {

        const { name, description } = this.props.data;
        const { siteAdmin, _id} = this.props;

        return (
            <tr role="row" className="odd">

                <td>
                    {name ? name : 'N/A'}
                </td>

                <td>
                    {_id}
                </td>

                <td>
                    {siteAdmin ? 'Yes' : 'No'}
                </td>

                <td>
                    {description ? description : 'N/A'}
                </td>

            </tr>
        );
    }
}

