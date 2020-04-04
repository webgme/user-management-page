/**
 * Container widget for the users data table
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */
// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Table} from 'react-bootstrap';
// Self-defined
import {fetchTokensIfNeeded} from '../../../actions/tokens';
import {fetchUserIfNeeded} from '../../../actions/user';
import CustomModal from './CustomModal';
import {timeAgo} from '../../../../client/utils/utils';
import {TokensTable as STYLE} from '../../../../client/style';
import LoginField from './LoginField';

export default class TokensTable extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {dispatch} = this.props;

        dispatch(fetchTokensIfNeeded());
        dispatch(fetchUserIfNeeded());
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
                        onClick={this.props.showNewTokenModal}>
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
                                                onClick={this.props.deleteAccessToken.bind(this, token.displayName)}/>
                                            </td>
                                        </tr>);
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                }
                <CustomModal
                    closeHandler={this.props.hideModal}
                    cancelButtonMessage={this.props.modalCancelBtnMessage}
                    cancelButtonStyle="default"
                    confirmButtonMessage={this.props.modalConfirmBtnMessage}
                    confirmButtonStyle="primary"
                    confirmHandler={this.props.onGenerateToken}
                    modalMessage={this.props.modalMessage}
                    hideCancelBtn={this.props.hideModalCancelBtn}
                    hideConfirmBtn={this.props.hideModalConfirmBtn}
                    showModal={this.props.showModal}
                    title={this.props.modalTitle}>
                    {this.props.showLoginFieldInModal ?
                        <LoginField autoFocus={true}
                            hint="Token Name"
                            indentStyle={STYLE.modalDialogTextField}
                            iconClass="fa fa-key"
                            valid={this.props.isValidTokenName}
                            onInputChange={this.props.tokenNameChanged}
                            onEnter={this.props.onGenerateToken}
                            invalidMessage={this.props.invalidTokenMessage}
                            name="token"/> : null}
                </CustomModal>
            </div>
        );
    }
}


TokensTable.propTypes = {
    tokens: PropTypes.array.isRequired,
    showNewTokenModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    modalTitle: PropTypes.string.isRequired,
    modalCancelBtnMessage: PropTypes.string.isRequired,
    modalConfirmBtnMessage: PropTypes.string.isRequired,
    onGenerateToken: PropTypes.func.isRequired,
    deleteAccessToken: PropTypes.func.isRequired,
    modalMessage: PropTypes.object.isRequired,
    hideModalCancelBtn: PropTypes.bool.isRequired,
    hideModalConfirmBtn: PropTypes.bool.isRequired,
    showModal: PropTypes.bool.isRequired,
    showLoginFieldInModal: PropTypes.bool.isRequired,
    isValidTokenName: PropTypes.bool.isRequired,
    tokenNameChanged: PropTypes.func.isRequired,
    invalidTokenMessage: PropTypes.string.isRequired,
};
