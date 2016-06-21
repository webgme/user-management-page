/**
 * Authorization widget
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import React from 'react/lib/React';
// Self-defined
import Multiselect from './Multiselect';

const STYLING = {
    submitButtonGroup: {
        lineHeight: 3.6
    }
};

export default class AuthorizationWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authorization: false
        };
    }

    componentWillMount() {
        this.props.restClient.canUserAuthorize(this.props.ownerId)
            .then(authorization => {
                this.setState({
                    authorization: authorization
                });
            });
    }

    render() {

        let selectableButtons = [];
        Object.keys(this.props.selectableButtons).forEach((key, index) => {
            selectableButtons.push(
                <Button bsStyle={this.props.selectableButtons[key] ? "primary" : null}
                        onClick={this.props.selectableButtonsChange}
                        key={index}>{key[0].toUpperCase() + key.substring(1)}
                </Button>
            );
        });

        let submitButtons = [];
        this.props.submitButtons.forEach((oneSubmitButton, index) => {
            submitButtons.push(
                <Button bsStyle={oneSubmitButton.submitButtonState}
                        className={(this.props.disableLast && index === this.props.submitButtons.length - 1 &&
                                    this.props.noRightsSelected) ? "disabled" : ""}
                        key={index}
                        onClick={this.props.disableLast && index === this.props.submitButtons.length - 1 &&
                                    this.props.noRightsSelected ? event => event.target.blur() :
                                                                  oneSubmitButton.submitButtonHandler}>
                    {oneSubmitButton.submitButtonText}
                </Button>
            );
        });

        return (
        this.state.authorization ? <div className="row">
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
                                    onChange={this.props.handleMultiselectChange}
                                    options={this.props.multiselectOptions}
                                    placeholder="Select one or more (type to search)"
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
        </div> : null
        );
    }

}

AuthorizationWidget.defaultProps = {
    selectableButtons: []
};