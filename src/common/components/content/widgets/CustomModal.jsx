/**
 * Custom modal widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class CustomModal extends Component {

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.closeHandler}
                   style={this.props.style}>

                <Modal.Header closeButton>
                    <Modal.Title>
                        <strong>{this.props.title}</strong>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h4>
                        {this.props.modalMessage}
                    </h4>
                </Modal.Body>

                {this.props.children}

                <Modal.Footer>
                    <Button bsStyle={this.props.confirmButtonStyle}
                            id={this.props.confirmId}
                            onClick={this.props.confirmHandler} >
                        {this.props.confirmButtonMessage}
                    </Button>
                    <Button bsStyle={this.props.cancelButtonStyle}
                            onClick={this.props.closeHandler}>
                        {this.props.cancelButtonMessage}
                    </Button>
                </Modal.Footer>

            </Modal>
        );
    }
}

CustomModal.propTypes = {
    cancelButtonMessage: PropTypes.string.isRequired,
    cancelButtonStyle: PropTypes.string.isRequired,
    closeHandler: PropTypes.func.isRequired,
    confirmButtonMessage: PropTypes.string.isRequired,
    confirmButtonStyle: PropTypes.string.isRequired,
    confirmHandler: PropTypes.func.isRequired,
    confirmId: PropTypes.string,
    modalMessage: PropTypes.string,
    showModal: PropTypes.bool.isRequired,
    style: PropTypes.object,
    title: PropTypes.string
};
