/**
 * Widget for editable text
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
// Style
import { EditableBox as STYLE } from '../../../../client/style';

export default class EditableBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false
        };
        // Event handlers
        this.checkEnter = this.checkEnter.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    checkEnter(event) {
        if (event.which === 13) {
            this.handleClose();
        }
    }

    handleEdit() {
        this.setState({
            editable: true
        });
    }

    handleClose() {
        this.setState({
            editable: false
        });
    }

    render() {
        const {label, text} = this.props;

        return (
            <li className="list-group-item" onClick={this.handleEdit}
                style={{padding: "18px 18px"}}>

                <div className="col-md-6">
                    <b style={STYLE.text}>{label}</b>
                </div>
                <div className="col-md-6">
                    {this.state.editable ?
                        <input autoFocus={true}
                               className="form-control pull-right"
                               onBlur={this.handleClose}
                               onChange={this.props.onChange}
                               onKeyUp={this.checkEnter}
                               placeholder={text}
                               readOnly={this.props.readOnly}
                               style={STYLE.text}
                               type={"text"}
                               value={text}/> :
                        <a className="pull-right" style={STYLE.text}>
                            &nbsp;{text}&nbsp;
                        </a>}
                </div>

            </li>
        );
    }
}

EditableBox.propTypes = {
    label: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};
