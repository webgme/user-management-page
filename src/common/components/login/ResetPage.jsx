/* eslint-disable require-jsdoc */
/* global window */

/**
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup} from 'react-bootstrap';
import {withRouter, Redirect} from 'react-router-dom';

import LoginField from '../content/widgets/LoginField';
// Style
import {LoginForm as STYLE} from '../../../client/style';

class ResetPage extends Component {

    state = {
        password: '',
        goToLogin: false,
        hasAdditionalInfo: false,
        additionalInfo: '',
        cannotReset: false,
    }

    constructor(props) {
        super(props);

        // Event handlers
        this.onCancel = this.onCancel.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onUpdateClick = this.onUpdateClick.bind(this);
    }

    componentDidMount() {
        const {userId, resetHash} = this.props;
        this.props.loginClient.verifyReset(userId, resetHash)
            .then(_ => {
                // TODO there is nothing to do in case we were successfull...
            })
            .catch(_ => {
                // in case of any error, we just redirect the user to the login page
                this.setState({
                    hasAdditionalInfo: true,
                    additionalInfo: 'Invalid reset parameters!',
                    cannotReset: true,
                });
            });
    }

    onUpdateClick() {
        const {userId, resetHash} = this.props;
        this.props.loginClient.updatePassword(userId, resetHash, this.state.password)
            .then(_ => {
                // TODO right now we do not care if it was successfull or not...
                this.setState({
                    goToLogin: true,
                });
            })
            .catch(_ => {
                this.setState({
                    hasAdditionalInfo: true,
                    additionalInfo: 'Failed to update password!',
                    cannotReset: true,
                });
            });

    }

    onPasswordChange(event) {
        this.setState({
            password: event.target.value,
        });
    }

    onCancel() {
        this.setState({goToLogin: true});
    }

    render() {

        if (this.state.goToLogin) {
            return <Redirect to={this.props.basePath+'login'} />;
        }

        return <div className="login-box-body">
            <p className="login-box-msg">
                Please enter your new password {this.props.userId}:
            </p>
            {this.state.hasAdditionalInfo ?
                <div>
                    <div className="row">
                        <div className="col-sm-12" style={STYLE.invalidLogin.column}>
                            <span style={STYLE.invalidLogin.text}>{this.state.additionalInfo}</span>
                        </div>
                    </div>
                    <br/>
                </div> : null}
            <form autoComplete="off" method="patch">
                <LoginField
                    hint="Password"
                    iconClass="glyphicon glyphicon-lock"
                    name="password"
                    onEnter={this.onUpdateClick}
                    onInputChange={this.onPasswordChange}
                    textType="password"
                    value={this.state.password}/>

                <div className="row">
                    <div className="col-sm-4">
                    </div>
                    <div className="col-sm-8">
                        <div style={{float: 'right', marginTop: '5px'}}>
                            <ButtonGroup>
                                {this.state.cannotReset ? null : <Button
                                    bsStyle="warning"
                                    onClick={this.onUpdateClick}>
                                    Set Password
                                </Button>}
                                <Button
                                    bsStyle="primary"
                                    onClick={this.onCancel}>
                                    Cancel
                                </Button>
                            </ButtonGroup>
                        </div>

                    </div>

                </div>
            </form>
        </div>;
    }
}

ResetPage.propTypes = {
    basePath: PropTypes.string,
    loginClient: PropTypes.object,
    userName: PropTypes.string,
    resetHash: PropTypes.string,

};

export default withRouter(ResetPage)