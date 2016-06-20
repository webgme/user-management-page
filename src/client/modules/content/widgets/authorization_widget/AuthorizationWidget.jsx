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
import {multiselectFormat, sortObjectArrayByField} from '../../../../utils/utils';

const STYLING = {
    submitButtonGroup: {
        lineHeight: 3.6
    }
};

export default class AuthorizationWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            multiselectOptions: [],
            show: false
        };
        // Data retrieval
        this.retrieveMultiselectOptions = this.retrieveMultiselectOptions.bind(this);
    }

    componentWillMount() {
        this.props.restClient.canUserAuthorize(this.props.ownerId)
            .then(authorization => {
                this.setState({
                    show: authorization
                });
            });
        this.retrieveMultiselectOptions();
    }

    retrieveMultiselectOptions() {
        Promise.all([
            this.props.restClient.users.getAllUsers(),
            this.props.restClient.organizations.getAllOrganizations()
        ]).then(([allUsers, allOrganizations]) => {
            let usersAndOrganizations = allUsers.concat(allOrganizations);
            this.setState({
                multiselectOptions: multiselectFormat(usersAndOrganizations.sort(sortObjectArrayByField('_id')))
            });
        });
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
                <Button bsStyle={oneSubmitButton.submitButtonState}
                        className={(this.props.disableLast && index === this.props.submitButtons.length - 1 &&
                                    this.props.noRightsSelected) ? "disabled" : ""}
                        key={index}
                        onClick={this.props.disableLast && index === this.props.submitButtons.length - 1 &&
                                    this.props.noRightsSelected ? () => {} : oneSubmitButton.submitButtonHandler}>
                    {oneSubmitButton.submitButtonText}
                </Button>
            );
        });

        return (
        this.state.show ? <div className="row">
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
                                    options={this.state.multiselectOptions}
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
