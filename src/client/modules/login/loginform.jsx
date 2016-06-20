/**
 * @author pmeijer / https://github.com/pmeijer
 */
import React from 'react/lib/React';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="login-box-body">
            <p className="login-box-msg">Sign in to start your session</p>

            <form>
                <div className="form-group has-feedback">
                    <input type="text" className="form-control" placeholder="User ID"/>
                    <span className="glyphicon glyphicon-user form-control-feedback"/>
                </div>
                <div className="form-group has-feedback">
                    <input type="password" className="form-control" placeholder="Password"/>
                    <span className="glyphicon glyphicon-lock form-control-feedback"/>
                </div>
                <div className="row">
                    <div className="col-xs-8">
                        <div className="checkbox icheck">
                            <label>
                                <input type="checkbox"/> Remember Me
                            </label>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <button className="btn btn-primary btn-block btn-flat">Sign In</button>
                    </div>
                </div>
            </form>

            <a href="#">I forgot my password</a><br/>
            <a href="/register" className="text-center">Register a new membership</a>
        </div>;
    }
}
