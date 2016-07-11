/**
 * Profile page container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Self-defind
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
                        <li className="list-group-item">
                            <b>UserID:</b> <a className="pull-right">&nbsp;{user._id}&nbsp;</a>
                        </li>
                        <li className="list-group-item">
                            <b>Email</b> <a className="pull-right">&nbsp;{user.email}&nbsp;</a>
                        </li>
                        <li className="list-group-item">
                            <b>Site Admin</b> <a className="pull-right">{user.siteAdmin ? 'Yes' : 'No'}</a>
                        </li>
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
