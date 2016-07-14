/**
 * Profile page container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
// Self-defined
import ProfileBox from '../../../components/content/widgets/ProfileBox';
import { fetchUserIfNeeded } from '../../../actions/user';
import { fetchUsersIfNeeded } from '../../../actions/users';
// Style
import { ProfilePage as STYLE } from '../../../../client/style';

class UserPage extends Component {

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchUserIfNeeded());
        dispatch(fetchUsersIfNeeded());
    }

    render() {
        const { basePath, dispatch, editable, restClient, user } = this.props;

        return (
            <section className="content" style={STYLE.profileBox}>

                <div className="col-md-6 col-md-offset-3" style={{textAlign: "center"}}>
                    <Link to={`${basePath}projects/${user._id}`}>
                        <Button bsStyle="primary">
                            Go To Viewable Projects By {user._id}
                        </Button>
                    </Link>
                </div>

                <br/><br/><br/>

                <ProfileBox dispatch={dispatch}
                            editable={editable}
                            restClient={restClient}
                            user={user} />

            </section>
        );
    }

}

UserPage.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const { basePath } = state;
    const { user } = state.user;
    const { users } = state.users;

    const viewUserId = ownProps.params.userId;
    const viewUser = users.find((eachUser) => {
        return eachUser._id === viewUserId;
    }) || {};

    return {
        basePath,
        editable: user.siteAdmin,
        user: viewUser
    };
};

export default connect(mapStateToProps)(UserPage);
