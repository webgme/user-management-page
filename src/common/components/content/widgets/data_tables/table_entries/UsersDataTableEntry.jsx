/**
 * Custom entries for the users data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import {OverlayTrigger, Popover} from 'react-bootstrap';
import { Link } from 'react-router';

// Self-defined
import { getUserIconSource } from '../../../../../../client/utils/utils';

export default class UsersDataTableEntry extends Component {

    render() {
        // const { name, description } = this.props.data ? this.props.data : {};
        const { siteAdmin, _id, disabled} = this.props;
        const { basePath } = this.props;
        const { userId } = this.props;

        return (
            <tr role="row" className="odd">

                <td>

                    <Link to={userId === _id ? `${basePath}profile` : `${basePath}users/${_id}`} style={disabled ?
                        {color: 'grey'} : {}}>
                        <img src={getUserIconSource(_id)} height="18px" style={{marginRight: '6px'}}/>
                        {_id}
                    </Link>

                    {disabled ?
                        <OverlayTrigger key="pop-over-disabled" trigger={["hover", "focus"]} placement="top" overlay={
                            <Popover title="User Disabled" id="disabled">
                                {`'${_id}' is disabled.`}
                            </Popover>}>
                                <i className="fa fa-ban pull-right" style={{color: 'grey'}}/>
                        </OverlayTrigger> :
                        siteAdmin ?
                            <OverlayTrigger key="pop-over-admin" trigger={["hover", "focus"]} placement="top" overlay={
                                <Popover title="Site Admin" id="admin">
                                    {`'${_id}' is a site admin.`}
                                </Popover>}>
                                <i className="fa fa-graduation-cap pull-right"/>
                            </OverlayTrigger> : null}
                </td>

            </tr>
        );
    }
}

UsersDataTableEntry.propTypes = {
    basePath: PropTypes.string.isRequired
};
