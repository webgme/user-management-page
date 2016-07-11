/**
 * Profile page container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Self-defined
import EditableBox from '../../../components/content/widgets/EditableBox';
import { fetchUserIfNeeded } from '../../../actions/user';
// Style
import { ProfilePage as STYLE } from '../../../../client/style';

class ProfilePage extends Component {

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchUserIfNeeded());
    }

    render() {
        const { user } = this.props;

        return <section className="content" style={STYLE.profileBox}>

            <div className="box box-primary" style={STYLE.profileBoxBorder}>
                <div className="box-body box-profile">

                    <h3 className="profile-username text-center">&nbsp;{user._id}&nbsp;</h3>

                    <p className="text-muted text-center">WebGME</p>

                    <ul className="list-group list-group-unbordered">
                        <EditableBox label={"UserID"}
                                     text={user._id ? user._id : ''} />
                        <EditableBox label={"Email"}
                                     text={user.email ? user.email : ''} />
                        <EditableBox label={"Site Admin"}
                                     text={user.siteAdmin ? 'Yes' : 'No'} />
                    </ul>

                </div>
            </div>

        </section>;
    }

}

ProfilePage.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    const { user } = state.user;

    return {
        user
    };
};

export default connect(mapStateToProps)(ProfilePage);
