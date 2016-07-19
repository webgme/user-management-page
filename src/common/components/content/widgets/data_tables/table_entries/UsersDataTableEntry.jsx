/**
 * Custom entries for the users data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { AdminBadge as STYLE } from '../../../../../../client/style';

export default class UsersDataTableEntry extends Component {

    render() {
        // const { name, description } = this.props.data ? this.props.data : {};
        const { siteAdmin, _id} = this.props;
        const { basePath } = this.props;
        const { userId } = this.props;

        return (
            <tr role="row" className="odd">

                <td>
                    <Link to={userId === _id ? `${basePath}profile` : `${basePath}users/${_id}`}>{_id}</Link>
                </td>

                <td style={{width: "10%"}}>
                    {siteAdmin ? <i className="fa fa-check-circle" style={STYLE.isAdmin}/> : null}
                </td>

            </tr>
        );
    }
}

UsersDataTableEntry.propTypes = {
    basePath: PropTypes.string.isRequired
};
