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
            authorization: false,
            hover: false,
            showModal: false
        };
        this.close = this.close.bind(this);
        this.confirm = this.confirm.bind(this);
        this.open = this.open.bind(this);
        this.toggleHover = this.toggleHover.bind(this);
    }

    componentDidMount() {
        this.props.restClient.canUserAuthorize(this.props.ownerId)
            .then(authorization => {
                this.setState({
                    authorization: authorization
                });
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

    open() {
        this.setState({
            showModal: true
        });
    }

    toggleHover() {
        this.setState({
            hover: !this.state.hover
        });
    }

    render() {

        let rights = this.props.read ? 'Read  ' : '';
        rights += this.props.write ? 'Write  ' : '';
        rights += this.props.delete ? 'Delete' : '';

        // Building rights origin (needs breaks)
        let rightsOrigin = [];
        this.props.rightsOrigin.split('\n').forEach((line, index) => {
            rightsOrigin.push(
                <span key={index}>
                    {line}
                    <br/>
                </span>
            );
        });

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
                        OK
                    </Button>
                    <Button bsStyle="default" onClick={this.close}>
                        Cancel
                    </Button>
                </Modal.Footer>

            </Modal>

            <td>
                <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={
                        <Popover title="Rights Origin" id="Rights Origin">
                            {rightsOrigin}
                        </Popover>}>
                    <div style={{float: "left"}}>
                        <i className={`fa fa-user${this.props.inOrg ? '-plus' : ''}`}
                           style={{fontSize: "15px", float: "left"}}/>
                        <span style={{paddingLeft: "8px"}}>
                            {this.props.name}
                        </span>
                    </div>
                </OverlayTrigger>
            </td>

            <td>
                {rights}
                {/* Only the owner(s) can see the remove option */}
                {this.state.authorization ?
                    this.props.ownerId === this.props.name ?
                        <OverlayTrigger overlay={<Popover id="1"><strong>You are the owner</strong></Popover>}
                                        placement="top"
                                        rootClose={true}
                                        trigger={["click"]}>
                            <i className="fa fa-tag"
                               onMouseEnter={this.toggleHover}
                               onMouseLeave={this.toggleHover}
                               style={{float: "right", color: this.state.hover ? "green" : "", cursor: "pointer", fontSize: "15px"}}/>
                        </OverlayTrigger> :
                        <i className="fa fa-remove"
                           id={this.props.name}
                           onClick={this.open}
                           onMouseEnter={this.toggleHover}
                           onMouseLeave={this.toggleHover}
                           style={{float: "right", color: this.state.hover ? "red" : "", cursor: "pointer", fontSize: "15px"}}/> :
                 null}
            </td>
        </tr>;
    }
}
