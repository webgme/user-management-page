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
        const { basePath } = this.props;

        const buildLink = `${basePath}projects/${this.props.owner}/${this.props.name}`;

        return (
            <tr role="row" className="odd">

                <td style={this.props.columnStyle}>
                    <Link to={`${basePath}projects/${this.props.owner}`}>{this.props.owner}</Link>
                </td>

                <td className="sorting_1">
                    <Link to={buildLink}>{this.props.name}</Link>
                </td>

                <td style={this.props.columnStyle}>
                    <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={
                        <Popover title="Last Viewed At:" id="Viewed At">
                            {this.props.info.viewedAt ? new Date(this.props.info.viewedAt).toString() :
                                                        this.props.unavailable}
                            <br/><br/>
                            <i>{`Viewed by: ${this.props.info.viewer ? this.props.info.viewer :
                                                                       this.props.unavailable}`}</i>
                        </Popover>}>
                        <i>{this.props.info.viewedAt ? timeAgo(this.props.info.viewedAt) :
                                                       timeAgo(new Date(1447879297957).toISOString())}</i>
                    </OverlayTrigger>
                </td>

                <td style={this.props.columnStyle}>
                    <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={
                        <Popover title="Last Modified At:" id="Modified At">
                            {new Date(this.props.info.modifiedAt).toString()}
                            <br/><br/>
                            <i>{`Modified by: ${this.props.info.modifier ? this.props.info.modifier :
                                                                           this.props.unavailable}`}</i>
                        </Popover>}>
                        <i>{this.props.info.modifiedAt ? timeAgo(this.props.info.modifiedAt) :
                                                         timeAgo(new Date(1447879297957).toISOString())}</i>
                    </OverlayTrigger>
                </td>

                <td style={this.props.columnStyle}>
                    <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={
                        <Popover title="Created At:" id="Created At">
                            {new Date(this.props.info.createdAt).toString()}
                            <br/><br/>
                            <i>{`Created by: ${this.props.info.creator ? this.props.info.creator :
                                                                         this.props.unavailable}`}</i>
                        </Popover>}>
                        <i>{this.props.info.createdAt ? timeAgo(this.props.info.createdAt) :
                                                        timeAgo(new Date(1447879297957).toISOString())}</i>
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
        createdAt: PropTypes.Date,
        modifiedAt: PropTypes.Date,
        viewedAt: PropTypes.Date
    }),
    name: PropTypes.string,
    owner: PropTypes.string
};

ProjectsDataTableEntry.defaultProps = {
    unavailable: "Unavailable"
};
