/* global $, window */

/**
 * Custom entries for the projects data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router';
import PrettyLink from '../../../../utils/PrettyLink';

// Self-defined
import { fetchUserIfNeeded } from '../../../../../actions/user';
import { timeAgo } from '../../../../../../client/utils/utils';
import { DEFAULT_ISODATE } from '../../../../../../client/utils/constants';
import {getUserDisplayName} from '../../../../../../client/utils/usersUtils';

export default class ProjectsDataTableEntry extends Component {

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchUserIfNeeded());
    }

    render() {
        const { basePath, info, name, owner, unavailable, searchText } = this.props,
            buildLink = `${basePath}projects/${owner}/${name}`,
            columnStyle = [{width: "13%"}, {width: "50%"}];

        return (
            <tr role="row" className="odd">

                <td style={$(window).width() > 768 ? columnStyle[0] : columnStyle[1]}>
                    <Link to={`${basePath}projects/${owner}`}>{getUserDisplayName(owner)}</Link>
                </td>

                <td className="sorting_1" style={columnStyle[1]}>
                    <PrettyLink to={buildLink} searchText={searchText}>{name}</PrettyLink>
                </td>

                <td className="hidden-xs" style={columnStyle[0]}>
                    <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={
                        <Popover title="Last Viewed At:" id="Viewed At">
                            {info.viewedAt ? new Date(info.viewedAt).toString() : unavailable}
                            <br/><br/>
                            <i>{`Viewed by: ${info.viewer ? getUserDisplayName(info.viewer) : unavailable}`}</i>
                        </Popover>}>
                        <i>{info.viewedAt ? timeAgo(info.viewedAt) : timeAgo(DEFAULT_ISODATE)}</i>
                    </OverlayTrigger>
                </td>

                <td className="hidden-xs" style={columnStyle[0]}>
                    <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={
                        <Popover title="Last Modified At:" id="Modified At">
                            {new Date(info.modifiedAt).toString()}
                            <br/><br/>
                            <i>{`Modified by: ${info.modifier ? getUserDisplayName(info.modifier) : unavailable}`}</i>
                        </Popover>}>
                        <i>{info.modifiedAt ? timeAgo(info.modifiedAt) : timeAgo(DEFAULT_ISODATE)}</i>
                    </OverlayTrigger>
                </td>

                <td className="hidden-xs" style={columnStyle[0]}>
                    <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={
                        <Popover title="Created At:" id="Created At">
                            {new Date(info.createdAt).toString()}
                            <br/><br/>
                            <i>{`Created by: ${info.creator ? getUserDisplayName(info.creator) : unavailable}`}</i>
                        </Popover>}>
                        <i>{info.createdAt ? timeAgo(info.createdAt) : timeAgo(DEFAULT_ISODATE)}</i>
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
    owner: PropTypes.string,
    searchText: PropTypes.string
};

ProjectsDataTableEntry.defaultProps = {
    unavailable: "Unavailable"
};
