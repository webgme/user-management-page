/**
 * Container widget for the users data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Table} from 'react-bootstrap';
// Self-defined
import {fetchTokensIfNeeded, fetchTokens} from '../../../actions/tokens';
import {fetchConfigIfNeeded} from "../../../actions/general";
import {fetchUserIfNeeded} from "../../../actions/user";
import CustomModal from './CustomModal';
import {timeAgo} from '../../../../client/utils/utils';
import {TokensTable as STYLE} from "../../../../client/style";

export default class TokensTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalMessage: null,
            tokenName: '',
            hideConfirmBtn: false,
            cancelBtnMessage: 'Cancel',
            modalTitle: 'Generate Tokens'
        };
        this.showNewTokenModal = this.showNewTokenModal.bind(this);
        this.deleteAccessToken = this.deleteAccessToken.bind(this);
        this.generateAccessToken = this.generateAccessToken.bind(this);
        this.getTokenNameForm = this.getTokenNameForm.bind(this);
        this.onGenerateToken = this.onGenerateToken.bind(this);
        this.tokenNameChanged = this.tokenNameChanged.bind(this);
        this.displayTokenModal = this.displayTokenModal.bind(this);
        this.getTokenContent = this.getTokenContent.bind(this);
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


    deleteAccessToken(id) {
        const {dispatch, restClient} = this.props;
        restClient.tokens.deleteTokenForCurrentUser(id)
            .then(() => {
                dispatch(fetchTokens());
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
        });
        dispatch(fetchTokens());
    }

    tokenNameChanged(event) {
        this.setState({
            tokenName: event.target.value,
        });
    }

    getTokenNameForm() {
        return (
            <div className="form-group form-inline">
                <label htmlFor="tokenName"> DisplayName: </label>
                <input type="text"
                    onChange={this.tokenNameChanged.bind(this)}
                    className="form-control" id="tokenName"/>
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
                ID: <span className="text-info"> {id}</span>
            </div>
        );
    }

    onGenerateToken() {
        this.generateAccessToken(this.state.tokenName)
            .then(res => {
                this.displayTokenModal(res.body);
            })
            .catch((err) => console.error(err));
        this.setState({
            tokenName: '',
            showModal: false,
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
                                    <th>ID</th>
                                    <th>Created</th>
                                    {isGuest ? null : <th/>}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tokens.map((token, index) => {
                                        return (<tr key={index}>
                                            <td>{token.displayName || `token${index + 1}`}</td>
                                            <td>{token.id}</td>
                                            <td>{timeAgo(token.issuedAt)}</td>
                                            {isGuest ?
                                                null :
                                                <td><i
                                                    className="glyphicon glyphicon-trash"
                                                    onClick={this.deleteAccessToken.bind(this, token.id)}/>
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
