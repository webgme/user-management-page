// Libraries
import React from '../../../../../../node_modules/react/lib/React';
import Multiselect from './Multiselect.jsx';
import Button from '../../../../../../node_modules/react-bootstrap/lib/Button';
import ButtonGroup from '../../../../../../node_modules/react-bootstrap/lib/ButtonGroup';

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
                            key={index}>{key[0].toUpperCase() + key.substring(1)}
                    </Button>
                );
                index++;
            }
        }

        return (
            <div className="row">

                <ButtonGroup>
                    {selectableButtons}
                </ButtonGroup>

                <div className="col-sm-5">
                    <Multiselect
                        label={this.props.label}
                        placeholder={this.props.placeholder}
                        options={this.props.options}
                        onChange={this.props.handleMultiselectChange}
                        valuesInMultiselect={this.props.valuesInMultiselect}/>
                </div>

                <div>
                    <ButtonGroup>
                        <Button bsStyle={this.props.submitButtonState ? "danger" : "success"}
                                onClick={this.props.handleSubmitAuthorization}>
                            {this.props.submitButtonText}
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        );

    }

}
