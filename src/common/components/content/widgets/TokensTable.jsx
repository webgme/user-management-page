/**
 * Container widget for the users data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */
// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Table, OverlayTrigger, Tooltip} from 'react-bootstrap';
// Self-defined
import {fetchTokensIfNeeded, fetchTokens} from '../../../actions/tokens';
import {fetchUserIfNeeded} from '../../../actions/user';
import CustomModal from './CustomModal';
import {timeAgo} from '../../../../client/utils/utils';
import {TokensTable as STYLE} from '../../../../client/style';

export default class TokensTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalMessage: null,
            tokenName: '',
            hideConfirmBtn: false,
            cancelBtnMessage: 'Cancel',
            modalTitle: 'Generate a new access token',
            errorMessage: '',
        };
        this.showNewTokenModal = this.showNewTokenModal.bind(this);
        this.deleteAccessToken = this.deleteAccessToken.bind(this);
        this.generateAccessToken = this.generateAccessToken.bind(this);
        this.getTokenNameForm = this.getTokenNameForm.bind(this);
        this.onGenerateToken = this.onGenerateToken.bind(this);
        this.tokenNameChanged = this.tokenNameChanged.bind(this);
        this.displayTokenModal = this.displayTokenModal.bind(this);
        this.getTokenContent = this.getTokenContent.bind(this);
        this.copyTextToClipBoard = this.copyTextToClipBoard.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;

        dispatch(fetchTokensIfNeeded());
        dispatch(fetchUserIfNeeded());
    }

    generateAccessToken(name) {
        const {restClient} = this.props;
        return restClient.tokens.createTokenForCurrentUser(name);
    }


    deleteAccessToken(name) {
        const {dispatch, restClient} = this.props;
        restClient.tokens.deleteTokenForCurrentUser(name)
            .then(() => {
                dispatch(fetchTokens());
            })
            .catch((err) => {
                this.setState({
                    showModal: true,
                    modalTitle: 'Error',
                    modalMessage: <div className="text-danger"> {err.message} </div>,
                    hideConfirmBtn: true,
                    cancelBtnMessage: 'Close',
                });
            });
    }

    showNewTokenModal() {
        this.setState({
            showModal: true,
            modalMessage: this.getTokenNameForm(),
            modalTitle: 'Generate a new access token',
            hideConfirmBtn: false,
            hideCancelBtn: false,
        });
    }

    hideModal() {
        const {dispatch} = this.props;
        this.setState({
            showModal: false,
            modalMessage: null,
            tokenName: '',
            hideConfirmBtn: true,
            hideCancelBtn: true,
            cancelBtnMessage: 'Cancel',
            modalTitle: '',
            errorMessage: '',
        });
        dispatch(fetchTokens());
    }

    tokenNameChanged(event) {
        this.setState({
            tokenName: event.target.value,
        });
    }

    copyTextToClipBoard(text, event) {
        navigator.clipboard // eslint-disable-line no-undef
            .writeText(text)
            .then(() => {});
    }

    getTokenNameForm(showError=false, errorMsg) {
        return (
            <div className="form-group form-inline">
                <label htmlFor="tokenName"> Token Name: </label>
                <input type="text"
                    onChange={this.tokenNameChanged.bind(this)}
                    autoFocus={true}
                    className="form-control" name="tokenName" id="tokenName"/>
                <br/>
                {showError ?
                    <small className="form-text text-danger">
                        {errorMsg}
                    </small>:
                    null}
            </div>
        );
    }

    displayTokenModal(token) {
        this.setState({
            showModal: true,
            modalMessage: this.getTokenContent(token.id, token.displayName),
            tokenName: null,
            hideConfirmBtn: true,
            cancelBtnMessage: 'Close',
            modalTitle: 'Generated Token',
        });
    }

    getTokenContent(id, name) {
        return (
            <div>
                Token Name: <span className="text-info">{name || 'No Name'}</span>
                <br/><br/>
                ID: <span className="text-info"> {id} </span>
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={(<Tooltip> Copy </Tooltip>)}
                >
                    <Button
                        className="btn btn-link fa fa-clipboard"
                        onClick={this.copyTextToClipBoard.bind(this, id)}
                    />
                </OverlayTrigger>
                <br/>
                <span className='text-danger'>Token ID will only be displayed once.</span>
            </div>
        );
    }

    onGenerateToken() {
        this.generateAccessToken(this.state.tokenName)
            .then(res => {
                this.displayTokenModal(res.body);
            })
            .catch(err => {
                const errMessage = 'Token generation failed';
                const modalMessage = this.getTokenNameForm(true, err.response.body || errMessage);
                this.setState(() => ({
                    showModal: true,
                    modalMessage: modalMessage,
                    hideConfirmBtn: false,
                    cancelBtnMessage: 'Close',
                }));
            });
    }

    render() {
        const {tokens, user} = this.props;
        return (
            <div>
                <div className="box-header" style={{paddingBottom: "10px"}}>
                    <h3 className="box-title" style={{fontSize: 28}}>
                        <i className="fa fa-key"/> {'Access Tokens'}
                    </h3>

                    <Button className="pull-right"
                        disabled={user.disabled}
                        bsStyle="primary"
                        bsSize="small"
                        onClick={this.showNewTokenModal.bind(this)}>
                        Generate Token
                    </Button>
                </div>
                {tokens.length === 0 ? null :
                    <div style={STYLE.tableWrap}>
                        <Table striped responsive hover size="sm">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Created</th>
                                    <th/>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tokens.map((token, index) => {
                                        return (<tr key={index}>
                                            <td>{token.displayName || 'N/A'}</td>
                                            <td>{timeAgo(token.issuedAt)}</td>
                                            <td><i
                                                className="glyphicon glyphicon-trash"
                                                onClick={this.deleteAccessToken.bind(this, token.displayName)}/>
                                            </td>
                                        </tr>);
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                }
                <CustomModal
                    closeHandler={this.hideModal.bind(this)}
                    cancelButtonMessage={this.state.cancelBtnMessage}
                    cancelButtonStyle="danger"
                    confirmButtonMessage="OK"
                    confirmButtonStyle="default"
                    confirmHandler={this.onGenerateToken.bind(this)}
                    modalMessage={this.state.modalMessage}
                    hideCancelBtn={false}
                    hideConfirmBtn={this.state.hideConfirmBtn}
                    showModal={this.state.showModal}
                    title={this.state.modalTitle}/>
            </div>
        );
    }
}


TokensTable.propTypes = {
    tokens: PropTypes.array.isRequired
};
