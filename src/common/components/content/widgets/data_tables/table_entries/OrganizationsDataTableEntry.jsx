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

        const { basePath, adminOrganizations } = this.props;

        const buildLink = `${basePath}organizations/${this.props.name}`;

        return (
            <tr role="row" className="odd">
                <td className="sorting_1">
                    <Link to={buildLink}>{this.props.name}</Link>
                    {adminOrganizations[this.props.name] ?
                        <OverlayTrigger key="pop-over-admin" trigger={["hover", "focus"]} placement="top" overlay={
                            <Popover title="Admin" id="admin">
                                {`You have admin rights to '${this.props.name}'.`}
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
