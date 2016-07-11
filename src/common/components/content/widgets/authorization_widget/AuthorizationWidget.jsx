/**
 * Authorization widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
// Self-defined
import Multiselect from './Multiselect';
// Style
import { AuthorizationWidget as STYLE } from '../../../../../client/style';

export default class AuthorizationWidget extends Component {

    render() {

        // Selectable buttons
        let selectableButtons = [];
        Object.keys(this.props.selectableButtons).forEach((key, index) => {
            selectableButtons.push(
                <Button bsStyle={this.props.selectableButtons[index].selectableButtonState}
                        onClick={this.props.selectableButtons[index].selectableButtonChange}
                        key={index}>
                    {this.props.selectableButtons[index].selectableButtonText}
                </Button>
            );
        });

        // Submit buttons
        let submitButtons = [];
        this.props.submitButtons.forEach((oneSubmitButton, index) => {
            submitButtons.push(
                <Button bsStyle={oneSubmitButton.submitButtonState}
                        className={(this.props.disableLast && index === this.props.submitButtons.length - 1 &&
                                    this.props.noneSelected) ? "disabled" : ""}
                        key={index}
                        onClick={this.props.disableLast && index === this.props.submitButtons.length - 1 &&
                                    this.props.noneSelected ? event => event.target.blur() :
                                                                  oneSubmitButton.submitButtonHandler}>
                    {oneSubmitButton.submitButtonText}
                </Button>
            );
        });

        return (
            this.props.authorization ?
                <div className="row">
                    <div className={`col-md-${this.props.boxSize}`}>
                        <div className="box">

                            <div className="box-header with-border">

                                <div className="row">

                                    <div className="col-sm-6">
                                        <Multiselect
                                            label={this.props.label}
                                            onChange={this.props.handleMultiselectChange}
                                            options={this.props.multiselectOptions}
                                            placeholder="Select one or more (type to search)"
                                            valuesInMultiselect={this.props.valuesInMultiselect}/>
                                    </div>

                                    <div className="col-sm-6" style={STYLE.selectableButtonGroup}>
                                        <ButtonGroup>
                                            {selectableButtons}
                                        </ButtonGroup>
                                    </div>

                                </div>

                                <div className="row" style={STYLE.submitButtonGroup}>
                                    <ButtonGroup>
                                        {submitButtons}
                                    </ButtonGroup>
                                </div>

                            </div>

                        </div>
                    </div>
                </div> : null
        );
    }

}

AuthorizationWidget.defaultProps = {
    selectableButtons: [],
    submitButtons: []
};
