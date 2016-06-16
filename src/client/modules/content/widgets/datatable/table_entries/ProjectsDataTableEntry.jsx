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
import DataTableEntry from './DataTableEntry.jsx';
import {timeAgo} from '../../../../../utils/utils';

export default class ProjectsDataTableEntry extends React.Component {

    render() {
        let buildLink = `${this.props.basePath}projects/${this.props.owner}/${this.props.name}`;

        return <DataTableEntry>
            <td>{this.props.owner}</td>

            <td className="sorting_1">
                <Link to={buildLink}>{this.props.name}</Link>
            </td>

            <td>
                <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={
                        <Popover title="Last Viewed At:" id="Viewed At">
                            {new Date(this.props.info.viewedAt).toString()}
                            <br/><br/>
                            <i>{`Viewed by: ${this.props.info.viewer}`}</i>
                        </Popover>}>
                    <i>{timeAgo(this.props.info.viewedAt)}</i>
                </OverlayTrigger>
            </td>

            <td>
                <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={
                        <Popover title="Last Viewed At:" id="Viewed At">
                            {new Date(this.props.info.modifiedAt).toString()}
                            <br/><br/>
                            <i>{`Modified by: ${this.props.info.modifier}`}</i>
                        </Popover>}>
                    <i>{timeAgo(this.props.info.modifiedAt)}</i>
                </OverlayTrigger>
            </td>

        </DataTableEntry>;
    }
}
