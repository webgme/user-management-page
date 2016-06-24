/**
 * Custom entries for the projects data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import Link from 'react-router/lib/Link';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import React from 'react/lib/React';
// Self-defined
import {timeAgo} from '../../../../../utils/utils';

export default class ProjectsDataTableEntry extends React.Component {

    render() {
        let buildLink = `${this.props.basePath}projects/${this.props.owner}/${this.props.name}`;

        return <tr role="row" className="odd">
            <td>{this.props.owner}</td>

            <td className="sorting_1">
                <Link to={buildLink}>{this.props.name}</Link>
            </td>

            <td>
                <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={
                        <Popover title="Last Viewed At:" id="Viewed At">
                            {this.props.info.viewedAt ? new Date(this.props.info.viewedAt).toString() : this.props.unavailable}
                            <br/><br/>
                            <i>{`Viewed by: ${this.props.info.viewer ? this.props.info.viewer : this.props.unavailable}`}</i>
                        </Popover>}>
                    <i>{this.props.info.viewedAt ? timeAgo(this.props.info.viewedAt) : this.props.unavailable}</i>
                </OverlayTrigger>
            </td>

            <td>
                <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={
                        <Popover title="Last Modified At:" id="Modified At">
                            {new Date(this.props.info.modifiedAt).toString()}
                            <br/><br/>
                            <i>{`Modified by: ${this.props.info.modifier ? this.props.info.modifier : this.props.unavailable}`}</i>
                        </Popover>}>
                    <i>{this.props.info.modifiedAt ? timeAgo(this.props.info.modifiedAt) : this.props.unavailable}</i>
                </OverlayTrigger>
            </td>

            <td>
                <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={
                        <Popover title="Created At:" id="Created At">
                            {new Date(this.props.info.createdAt).toString()}
                            <br/><br/>
                            <i>{`Created by: ${this.props.info.creator ? this.props.info.creator : this.props.unavailable}`}</i>
                        </Popover>}>
                    <i>{this.props.info.createdAt ? timeAgo(this.props.info.createdAt) : this.props.unavailable}</i>
                </OverlayTrigger>
            </td>

        </tr>;
    }
}

ProjectsDataTableEntry.propTypes = {
    basePath: React.PropTypes.string,
    info: React.PropTypes.shape({
        createdAt: React.PropTypes.Date,
        modifiedAt: React.PropTypes.Date,
        viewedAt: React.PropTypes.Date
    }),
    name: React.PropTypes.string,
    owner: React.PropTypes.string
};

ProjectsDataTableEntry.defaultProps = {
    unavailable: "Unavailable"
};
