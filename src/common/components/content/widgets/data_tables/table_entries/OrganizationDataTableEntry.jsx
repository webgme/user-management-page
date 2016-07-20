/**
 * Custom entries for the organization data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, {Component} from 'react';
import {OverlayTrigger, Popover} from 'react-bootstrap';

// Self-defined
import CustomModal from '../../CustomModal';
// Style
import {AdminBadge as STYLE} from '../../../../../../client/style';

export default class OrganizationDataTableEntry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };

        this.close = this.close.bind(this);
        this.confirm = this.confirm.bind(this);
        this.open = this.open.bind(this);
        this.getAdminElem = this.getAdminElem.bind(this);
    }

    open() {
        this.setState({
            showModal: true
        });
    }

    close() {
        this.setState({
            showModal: false
        });
    }

    confirm(event) {
        this.setState({
            showModal: false
        }, this.props.removeMember(event));
    }

    getAdminElem() {
        var result = [];
        const {name, isMember, isAdmin, canAuthorize} = this.props;
        if (isAdmin) {
            if (canAuthorize) {
                result.push(
                    <OverlayTrigger key="pop-over-admin" trigger={["hover", "focus"]} placement="top" overlay={
                            <Popover title="Revoke Admin" id="admin">
                                {`Click to remove '${name}' admin rights from organization.`}
                            </Popover>}>
                        <i key="admin"
                           action="removeAdmin"
                           id={name}
                           onClick={this.props.setAdmin}
                           className="fa fa-check-circle"
                           style={STYLE.isAdmin}/>
                    </OverlayTrigger>);
            } else {
                result.push(<i key="admin" className="fa fa-check-circle" style={{color: 'green'}}/>);
            }

            if (!isMember) {
                result.push(
                    <OverlayTrigger key="pop-over" trigger={["hover", "focus"]} placement="top" overlay={
                            <Popover title="Admin not a Member" id="admin">
                                {`User '${name}' is an admin but not a member.`}
                            </Popover>}>
                        <span className="admin-not-member"> ! </span>
                    </OverlayTrigger>
                );
            }
        } else if (canAuthorize) {
            result.push(
                <OverlayTrigger key="pop-over" trigger={["hover", "focus"]} placement="top" overlay={
                            <Popover title="Assign Admin" id="admin">
                                {`Click to add '${name}' as an admin for the organization.`}
                            </Popover>}>
                    <i key="admin"
                       action="makeAdmin"
                       id={name}
                       onClick={this.props.setAdmin}
                       className="fa fa-times-circle"
                       style={STYLE.isNotAdmin}/>
                </OverlayTrigger>);
        } else {
            result.push(<i key="admin" className="fa fa-times-circle" style={{color: 'red'}}/>);
        }

        return result;
    }

    render() {
        const {name, isMember} = this.props;

        return (
            <tr role="row" className="odd">
                <CustomModal cancelButtonMessage="Cancel"
                             cancelButtonStyle="default"
                             closeHandler={this.close}
                             confirmButtonMessage="OK"
                             confirmButtonStyle="danger"
                             confirmHandler={this.confirm}
                             confirmId={name}
                             modalMessage={'Are you sure you want to remove ' + name +
                              ' from the organization?'}
                             showModal={this.state.showModal}
                             title="Remove Member"/>
                <td>
                    {name}
                    {this.props.canAuthorize && isMember ?
                        <i className="fa fa-remove"
                           id={this.props.name}
                           onClick={this.open}
                           style={{cursor: "pointer", float: "right", fontSize: "15px"}}/> : null}
                </td>
                <td style={{width: '10%', textAlign: 'center'}}>
                    {this.getAdminElem()}
                </td>
            </tr>
        );
    }
}
