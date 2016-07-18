/**
 * Custom entries for the users data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class UsersDataTableEntry extends Component {

    render() {
        const { name, description } = this.props.data ? this.props.data : {};
        const { siteAdmin, _id} = this.props;
        const { basePath } = this.props;
        const { userId } = this.props;

        return (
            <tr role="row" className="odd">

                <td>
                    {name ? name : 'N/A'}
                </td>

                <td>
                    <Link to={userId === _id ? `${basePath}profile` : `${basePath}users/${_id}`}>{_id}</Link>
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

UsersDataTableEntry.propTypes = {
    basePath: PropTypes.string.isRequired
};
