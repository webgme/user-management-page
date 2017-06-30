/**
 * Custom entries for the organizations data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import {OverlayTrigger, Popover} from 'react-bootstrap';
import { Link } from 'react-router';

export default class OrganizationsDataTableEntry extends Component {

    render() {

        const { basePath, adminOrganizations, disabled, _id } = this.props;

        const buildLink = `${basePath}organizations/${this.props._id}`;

        return (
            <tr role="row" className="odd">
                <td className="sorting_1">
                    <Link to={buildLink} style={disabled ? {color: 'grey'} : {}}>{_id}</Link>
                    {disabled ?
                        <OverlayTrigger key="pop-over-disabled" trigger={["hover", "focus"]} placement="top" overlay={
                            <Popover title="Organization Disabled" id="disabled">
                                {`'${_id}' is disabled.`}
                            </Popover>}>
                            <i className="fa fa-ban pull-right" style={{color: 'grey'}}/>
                        </OverlayTrigger> :
                        adminOrganizations[_id] ?
                            <OverlayTrigger key="pop-over-admin" trigger={["hover", "focus"]} placement="top" overlay={
                            <Popover title="Admin" id="admin">
                                {`You have admin rights to '${_id}'.`}
                            </Popover>}>
                                <i className="fa fa-graduation-cap pull-right"/>
                            </OverlayTrigger> : null}
                </td>
            </tr>
        );
    }
}

OrganizationsDataTableEntry.propTypes = {
    basePath: PropTypes.string.isRequired
};
