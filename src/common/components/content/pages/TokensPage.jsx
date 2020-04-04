
// Libraries
import React, { Component } from 'react';
// Self defined
import TokensTable from '../../../containers/content/widgets/data_tables/TokensTable';
import {fetchTokens} from '../../../actions/tokens';
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap';


export default class TokensPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showLoginFieldInModal: false,
            tokenName: '',
            hideModalCancelBtn: false,
            hideModalConfirmBtn: false,
            invalidTokenMessage: '',
            isValidTokenName: true,
            modalCancelBtnMessage: 'Cancel',
            modalConfirmBtnMessage: 'OK',
            modalTitle: 'Generate a new access token',
            modalMessage: '',
        };

        this.showNewTokenModal = this.showNewTokenModal.bind(this);
        this.deleteAccessToken = this.deleteAccessToken.bind(this);
        this.generateAccessToken = this.generateAccessToken.bind(this);
        this.onGenerateToken = this.onGenerateToken.bind(this);
        this.tokenNameChanged = this.tokenNameChanged.bind(this);
        this.getTokenContent = this.getTokenContent.bind(this);
        this.copyTextToClipBoard = this.copyTextToClipBoard.bind(this);
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
                    hideModalConfirmBtn: true,
                    modalCancelBtnMessage: 'Close',
                    showLoginField: false,
                });
            });
    }

    showNewTokenModal() {
        this.setState({
            showModal: true,
            showLoginFieldInModal: true,
            modalTitle: 'Generate Token',
            hideModalConfirmBtn: false,
            hideModalCancelBtn: false,
            modalCancelBtnMessage: 'Close',
            modalConfirmBtnMessage: 'Generate',
            isValidTokenName: true,
            modalMessage: 'Please enter the name of the access token you wish to create',
        });
    }

    hideModal() {
        this.setState({
            showModal: false,
            tokenName: '',
            showLoginFieldInModal: false,
            modalMessage: '',
        });
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
        const { dispatch } = this.props;
        Promise.resolve(this.generateAccessToken(this.state.tokenName)
            .then(res => {
                const token = res.body;
                this.setState({
                    showModal: true,
                    modalMessage: this.getTokenContent(token.id, token.displayName),
                    tokenName: null,
                    hideModalConfirmBtn: true,
                    cancelBtnMessage: 'Close',
                    modalTitle: 'Generated Token',
                    showLoginFieldInModal: false,
                });
                dispatch(fetchTokens());
            })
            .catch(err => {
                this.setState({
                    isValidTokenName: err.status !== 400,
                    invalidTokenMessage: 'Name already taken',
                });
            }));
    }

    render() {
        return (
            <section className="content">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="box box-primary">
                            <TokensTable
                                showNewTokenModal={this.showNewTokenModal.bind(this)}
                                hideModal={this.hideModal.bind(this)}
                                modalTitle={this.state.modalTitle}
                                modalCancelBtnMessage={this.state.modalCancelBtnMessage}
                                modalConfirmBtnMessage={this.state.modalConfirmBtnMessage}
                                onGenerateToken={this.onGenerateToken.bind(this)}
                                deleteAccessToken={this.deleteAccessToken.bind(this)}
                                modalMessage={this.state.modalMessage}
                                hideModalCancelBtn={this.state.hideModalCancelBtn}
                                hideModalConfirmBtn={this.state.hideModalConfirmBtn}
                                showModal={this.state.showModal}
                                showLoginFieldInModal={this.state.showLoginFieldInModal}
                                isValidTokenName={this.state.isValidTokenName}
                                tokenNameChanged={this.tokenNameChanged.bind(this)}
                                invalidTokenMessage={this.state.invalidTokenMessage}
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
