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
import {fetchConfigIfNeeded} from '../../../actions/general';
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
            modalTitle: 'Generate Tokens',
            showDuplicateMessage: false,
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
        dispatch(fetchConfigIfNeeded());
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
                console.error(err);
            });
    }

    showNewTokenModal() {
        this.setState({
            showModal: true,
            modalMessage: this.getTokenNameForm(),
        });
    }

    hideModal() {
        const {dispatch} = this.props;
        this.setState({
            showModal: false,
            modalMessage: null,
            tokenName: '',
            hideConfirmBtn: false,
            cancelBtnMessage: 'Cancel',
            modalTitle: 'Generate Token',
            showDuplicateMessage: false,
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

    getTokenNameForm() {
        return (
            <div className="form-group form-inline">
                <label htmlFor="tokenName"> DisplayName: </label>
                <input type="text"
                    onChange={this.tokenNameChanged.bind(this)}
                    autoFocus={true}
                    className="form-control" name="tokenName" id="tokenName"/>
                <br/>
                {this.state.showDuplicateMessage ?
                    <small className="form-text text-danger">
                        Token with the same name already exists.
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
                <span className='text-danger'>Token ID will only be displayed once.</span>
                <br/><br/>
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
            </div>
        );
    }

    onGenerateToken() {
        this.generateAccessToken(this.state.tokenName)
            .then(res => {
                this.displayTokenModal(res.body);
            })
            .catch(err => {
                if (err.status == 400) {
                    this.setState({showDuplicateMessage: true})
                    this.setState({
                        showModal: true,
                        modalMessage: this.getTokenNameForm(),
                    });
                }
            });
    }

    render() {
        const {tokens, config, user} = this.props,
            isGuest = config.authentication.guestAccount === user._id,
            guestsCanCreateTokens = config.executor.authentication.allowGuests;
        return (
            <div>
                <div className="box-header" style={{paddingBottom: "10px"}}>
                    <h3 className="box-title" style={{fontSize: 28}}>
                        <i className="fa fa-key"/> {' Tokens'}
                    </h3>

                    <Button className="pull-right"
                        disabled={user.disabled || (!guestsCanCreateTokens && isGuest)}
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
                                    {isGuest ? null : <th/>}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tokens.map((token, index) => {
                                        return (<tr key={index}>
                                            <td>{token.displayName || 'N/A'}</td>
                                            <td>{timeAgo(token.issuedAt)}</td>
                                            {isGuest ?
                                                null :
                                                <td><i
                                                    className="glyphicon glyphicon-trash"
                                                    onClick={this.deleteAccessToken.bind(this, token.displayName)}/>
                                                </td>
                                            }
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
