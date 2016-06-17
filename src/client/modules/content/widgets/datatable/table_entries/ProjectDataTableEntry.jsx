/**
 * Custom entries for the project data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import React from 'react/lib/React';

export default class ProjectDataTableEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.confirm = this.confirm.bind(this);
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
        this.setState({showModal: false}, this.props.handleRevoke(event));
    }

    render() {

        let rights = this.props.read ? 'Read  ' : '';
        rights += this.props.write ? 'Write  ' : '';
        rights += this.props.delete ? 'Delete' : '';

        return <tr role="row" className="odd">
            <Modal show={this.state.showModal} onHide={this.close}>

                <Modal.Header closeButton>
                    <Modal.Title>
                        <strong>Revoke rights</strong>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h4>Are you sure you want to revoke {this.props.name}'s rights to {this.props.projectName}
                        {' '}by {this.props.ownerId}?</h4>
                </Modal.Body>

                <Modal.Footer>
                    <Button bsStyle="danger" onClick={this.confirm} id={this.props.name}>
                        Yes revoke {this.props.name}'s rights
                    </Button>
                    <Button bsStyle="primary" onClick={this.close}>
                        No, do not revoke {this.props.name}'s rights
                    </Button>
                </Modal.Footer>

            </Modal>

            <td>
                {this.props.inOrg ? <i className="fa fa-user-plus" style={{fontSize: "15px", float: "left"}}/> :
                                    <i className="fa fa-user" style={{fontSize: "15px", float: "left"}}/> }
                <span style={{paddingLeft: "8px"}}>
                    {this.props.name}
                </span>
            </td>

            <td>
                {rights} {this.props.ownerId === this.props.name ?
                <OverlayTrigger trigger={["click"]}
                                placement="top"
                                rootClose={true}
                                overlay={<Popover id="1"><strong>You are the owner</strong></Popover>}>
                    <i className="fa fa-tag"
                       style={{float: "right", color: "green", cursor: "pointer", fontSize: "15px"}}/>
                </OverlayTrigger> :
                    <i className="fa fa-times-circle-o"
                       style={{float: "right", color: "red", cursor: "pointer", fontSize: "15px"}}
                       onClick={this.open}
                       id={this.props.name}/>}
            </td>
        </tr>;
    }
}
