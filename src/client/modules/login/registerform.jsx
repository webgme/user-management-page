/**
 * @author pmeijer / https://github.com/pmeijer
 */
import React from 'react/lib/React';

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="register-box-body">
            <p className="login-box-msg">Register a new membership</p>

            <form>
                <div className="form-group has-feedback">
                    <input type="text" className="form-control" placeholder="User ID"/>
                        <span className="glyphicon glyphicon-user form-control-feedback"/>
                </div>
                <div className="form-group has-feedback">
                    <input type="email" className="form-control" placeholder="Email"/>
                        <span className="glyphicon glyphicon-envelope form-control-feedback"/>
                </div>
                <div className="form-group has-feedback">
                    <input type="password" className="form-control" placeholder="Password"/>
                        <span className="glyphicon glyphicon-lock form-control-feedback"/>
                </div>
                <div className="form-group has-feedback">
                    <input type="password" className="form-control" placeholder="Retype password"/>
                        <span className="glyphicon glyphicon-log-in form-control-feedback"/>
                </div>
                <div className="row">
                    <div className="col-xs-8">
                        <div className="checkbox icheck">
                            <label>
                                <input type="checkbox"/> I agree to the <a href="#">terms</a>
                            </label>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <button className="btn btn-primary btn-block btn-flat">Register</button>
                    </div>
                </div>
            </form>
            <a href="/login" className="text-center">I already have a membership</a>
        </div>;
    }
}
