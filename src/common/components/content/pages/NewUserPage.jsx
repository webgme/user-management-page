/*globals*/
/**
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import React, { Component, PropTypes } from 'react';

// Self-defined
import RegisterForm from '../../login/RegisterForm';
import { fetchUserIfNeeded } from '../../../actions/user';

// Style
import { ProfilePage as STYLE } from '../../../../client/style';

export default class NewUserPage extends Component {

    constructor(props) {
        super(props);
        this.createUser = this.createUser.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchUserIfNeeded());
    }

    createUser() {
        console.log(arguments);
    }

    render() {
        const canCreate = this.props.user && this.props.user.siteAdmin;

        return (
            <section className="content" style={STYLE.profileBox}>
                <div className="col-md-6 col-md-offset-3">
                    <div className="box box-primary">
                        <div className="box-header" style={{paddingBottom: 0}}>
                            <h3 className="box-title" style={{fontSize: 28}}>
                                <i className="fa fa-user-plus"/>{` New User`}
                            </h3>
                        </div>
                        <div className="box-body">
                            <RegisterForm basePath={this.props.basePath}
                                          onNewUser={this.createUser}
                                          title=""
                                          backLinkData={{
                                              title: 'Back to users',
                                              path: `${this.props.basePath}users`
                                          }}
                                          allowUserCreation={canCreate}/>
                            </div>
                        </div>
                    </div>
            </section>
        );
    }

}

NewUserPage.propTypes = {
    user: PropTypes.object.isRequired
};
