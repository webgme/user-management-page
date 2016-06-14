/**
 * Authorization widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
// Self-defined
import Multiselect from './Multiselect.jsx';

const STYLING = {
    submitButtonGroup: {
        lineHeight: 3.6
    }
};

export default class AuthorizationWidget extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let selectableButtons = [];
        let index = 0;
        for (let key in this.props.selectableButtons) {
            if (this.props.selectableButtons.hasOwnProperty(key)) {
                selectableButtons.push(
                    <Button bsStyle={this.props.selectableButtons[key] ? "primary" : null}
                            onClick={this.props.selectableButtonsChange}
                            key={index++}>{key[0].toUpperCase() + key.substring(1)}
                    </Button>
                );
            }
        }

        let submitButtons = [];
        this.props.submitButtons.forEach((oneSubmitButton, index) => {
            submitButtons.push(
                <Button bsStyle={oneSubmitButton.submitButtonState ? "danger" : "success"}
                        onClick={oneSubmitButton.submitButtonHandler}
                        key={index}>
                    {oneSubmitButton.submitButtonText}
                </Button>
            );
        });

        return (
            <div className="row">
                <div className={`col-md-${this.props.boxSize}`}>
                    <div className="box box-primary">
                        <div className="box-header with-border">
                            <div className="row">

                                <ButtonGroup>
                                    {selectableButtons}
                                </ButtonGroup>

                                <div className="col-sm-6">
                                    <Multiselect
                                        label={this.props.label}
                                        placeholder={this.props.placeholder}
                                        options={this.props.options}
                                        onChange={this.props.handleMultiselectChange}
                                        valuesInMultiselect={this.props.valuesInMultiselect}/>
                                </div>

                                <div className="row" style={STYLING.submitButtonGroup}>
                                    <ButtonGroup>
                                        {submitButtons}
                                    </ButtonGroup>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
