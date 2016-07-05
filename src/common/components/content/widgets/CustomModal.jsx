/**
 * Custom modal widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import React from 'react';

export default class CustomModal extends React.Component {

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
    cancelButtonMessage: React.PropTypes.string.isRequired,
    cancelButtonStyle: React.PropTypes.string.isRequired,
    closeHandler: React.PropTypes.func.isRequired,
    confirmButtonMessage: React.PropTypes.string.isRequired,
    confirmButtonStyle: React.PropTypes.string.isRequired,
    confirmHandler: React.PropTypes.func.isRequired,
    confirmId: React.PropTypes.string,
    modalMessage: React.PropTypes.string,
    showModal: React.PropTypes.bool.isRequired,
    style: React.PropTypes.object,
    title: React.PropTypes.string
};
