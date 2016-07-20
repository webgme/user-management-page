/**
 * Custom entries for the projects data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router';
// Self-defined
import { fetchUserIfNeeded } from '../../../../../actions/user';
import { timeAgo } from '../../../../../../client/utils/utils';

export default class ProjectsDataTableEntry extends Component {

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchUserIfNeeded());
    }

    render() {
        const { basePath, columnStyle, info, name, owner, unavailable } = this.props;

        const buildLink = `${basePath}projects/${owner}/${name}`;

        return (
            <tr role="row" className="odd">

                <td style={columnStyle}>
                    <Link to={`${basePath}projects/${owner}`}>{owner}</Link>
                </td>

                <td className="sorting_1">
                    <Link to={buildLink}>{name}</Link>
                </td>

                <td style={columnStyle}>
                    <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={
                        <Popover title="Last Viewed At:" id="Viewed At">
                            {info.viewedAt ? new Date(info.viewedAt).toString() : unavailable}
                            <br/><br/>
                            <i>{`Viewed by: ${info.viewer ? info.viewer : unavailable}`}</i>
                        </Popover>}>
                        <i>{info.viewedAt ? timeAgo(info.viewedAt) : timeAgo(new Date(1447879297957).toISOString())}</i>
                    </OverlayTrigger>
                </td>

                <td style={columnStyle}>
                    <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={
                        <Popover title="Last Modified At:" id="Modified At">
                            {new Date(info.modifiedAt).toString()}
                            <br/><br/>
                            <i>{`Modified by: ${info.modifier ? info.modifier : unavailable}`}</i>
                        </Popover>}>
                        <i>{info.modifiedAt ? timeAgo(info.modifiedAt) : timeAgo(new Date(1447879297957).toISOString())}</i>
                    </OverlayTrigger>
                </td>

                <td style={columnStyle}>
                    <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={
                        <Popover title="Created At:" id="Created At">
                            {new Date(info.createdAt).toString()}
                            <br/><br/>
                            <i>{`Created by: ${info.creator ? info.creator : unavailable}`}</i>
                        </Popover>}>
                        <i>{info.createdAt ? timeAgo(info.createdAt) : timeAgo(new Date(1447879297957).toISOString())}</i>
                    </OverlayTrigger>
                </td>

            </tr>
        );
    }
}

ProjectsDataTableEntry.propTypes = {
    basePath: PropTypes.string.isRequired,
    columnStyle: PropTypes.shape({
        width: PropTypes.string
    }),
    info: PropTypes.shape({
        createdAt: PropTypes.string,
        modifiedAt: PropTypes.string,
        viewedAt: PropTypes.string
    }),
    name: PropTypes.string,
    owner: PropTypes.string
};

ProjectsDataTableEntry.defaultProps = {
    unavailable: "Unavailable"
};
