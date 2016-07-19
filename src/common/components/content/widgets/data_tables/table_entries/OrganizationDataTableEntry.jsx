/**
 * Custom entries for the organization data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, {Component} from 'react';
import {OverlayTrigger, Popover} from 'react-bootstrap';

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
    }

    close() {
        this.setState({
            showModal: false
        });
    }

    confirm(event) {
        this.setState({
            showModal: false
        });
    }

    open() {
        this.setState({
            showModal: true
        });
    }

    render() {
        const {name, isMember, isAdmin} = this.props;

        /**
         * @return {Array} - Badge elements depending on is user is admin and member.
         */
        function getAdminElem() {
            var result = null;
            if (isAdmin) {
                result = [];
                result.push(<i key="badge" className="fa fa-check-circle" style={STYLE.isAdmin}/>);
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
            }

            return result;
        }

        return (
            <tr role="row" className="odd">
                <CustomModal cancelButtonMessage="Cancel"
                             cancelButtonStyle="default"
                             closeHandler={this.close}
                             confirmButtonMessage="OK"
                             confirmButtonStyle="danger"
                             confirmHandler={this.confirm}
                             confirmId={this.props.name}
                             modalMessage={'Are you sure you want to remove ' + this.props.name +
                              ' from the organization?'}
                             showModal={this.state.showModal}
                             title="Remove Member"/>
                <td>
                    {name}
                    {this.props.canAuthorize ? <i className="fa fa-remove" id={this.props.name}
                                                  onClick={this.open}
                                                  style={{cursor: "pointer", float: "right", fontSize: "15px"}}
                    /> : null}
                </td>
                <td style={{width: "10%"}}>
                    {getAdminElem()}
                </td>
            </tr>
        );
    }
}
