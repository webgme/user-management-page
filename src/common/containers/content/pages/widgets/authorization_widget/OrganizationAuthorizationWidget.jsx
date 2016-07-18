/**
 * Separate component to hold the authorization widget for the organization page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Self defined
import AuthorizationWidget from '../../../../../components/content/widgets/authorization_widget/AuthorizationWidget';
import {multiselectFormat, sortObjectArrayByField} from '../../../../../../client/utils/utils';
import { fetchUsers, fetchUsersIfNeeded } from '../../../../../actions/users';
import { fetchOrganizations } from '../../../../../actions/organizations';

class OrganizationAuthorizationWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valuesInMultiselect: ''
        };
        // Event Handlers
        this.handleMultiselectChange = this.handleMultiselectChange.bind(this);
        this.handleSubmitAuthorization = this.handleSubmitAuthorization.bind(this);
    }

    componentDidMount() {
        const { dispatch, users} = this.props;
        dispatch(fetchUsersIfNeeded());

        let multiselectOptions = multiselectFormat(users.sort(sortObjectArrayByField('_id')));
        this.setState({
            multiselectOptions
        });
    }

    componentWillReceiveProps(nextProps) {
        const { users } = nextProps;

        let multiselectOptions = multiselectFormat(users.sort(sortObjectArrayByField('_id')));
        this.setState({
            multiselectOptions
        });
    }

    handleMultiselectChange(value) {
        this.setState({
            valuesInMultiselect: value
        });
    }

    handleSubmitAuthorization(event) {
        const { dispatch } = this.props;
        let promiseArrayToGrant = [];

        if (this.state.valuesInMultiselect !== '') {
            this.state.valuesInMultiselect.split(',').forEach(username => {
                if (/Add/.test(event.target.innerHTML)) { // have to remove rights if none are selected
                    promiseArrayToGrant.push(
                        this.props.restClient.organizations.addUserToOrganization(this.props.organizationId,
                            username)
                    );
                } else if (/Remove/.test(event.target.innerHTML)) {
                    promiseArrayToGrant.push(
                        this.props.restClient.organizations.deleteUserFromOrganization(this.props.organizationId,
                            username)
                    );
                }
            });
        }

        Promise.all(promiseArrayToGrant)
            .then(() => {
                // Have to update the list after authorization rights change
                dispatch(fetchUsers());
                dispatch(fetchOrganizations());
            })
            .catch(err => {
                console.error(err); // eslint-disable-line no-console
            });

        // Empty multiselect after submission
        this.setState({
            valuesInMultiselect: ''
        });

    }

    render() {

        const authorizationWidgetData = {
            // Have to make these selectable to be in the right place
            selectableButtons: [
                {
                    selectableButtonChange: this.handleSubmitAuthorization,
                    selectableButtonText: 'Add members',
                    selectableButtonState: "success"
                },
                {
                    selectableButtonChange: this.handleSubmitAuthorization,
                    selectableButtonText: 'Remove members',
                    selectableButtonState: "danger"
                }
            ]
        };

        return (
            <AuthorizationWidget authorization={this.props.authorization}
                                 boxSize="6"
                                 handleMultiselectChange={this.handleMultiselectChange}
                                 label={"Add or Remove Members"}
                                 multi={true}
                                 multiselectOptions={this.state.multiselectOptions}
                                 selectableButtons={authorizationWidgetData.selectableButtons}
                                 selectableButtonsChange={this.handleAuthorizationChange}
                                 valuesInMultiselect={this.state.valuesInMultiselect}/>
        );
    }

}

OrganizationAuthorizationWidget.propTypes = {
    users: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    const { users } = state.users;

    return {
        users
    };
};

export default connect(mapStateToProps)(OrganizationAuthorizationWidget);
