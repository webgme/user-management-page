/**
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Link from 'react-router/lib/Link';
import React from 'react/lib/React';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="login-box-body">
            <p className="login-box-msg">Sign in to start your session</p>

            <form>

                {/* Username */}
                <div className="form-group has-feedback">
                    <div className="row">
                        <div className="col-sm-12">
                            <input type="text" className="form-control" placeholder="User ID"/>
                        </div>

                        <i className="glyphicon glyphicon-user form-control-feedback"/>

                    </div>

                </div>

                {/* Password */}
                <div className="form-group has-feedback">
                    <input type="password" className="form-control" placeholder="Password"/>
                    <i className="glyphicon glyphicon-lock form-control-feedback"/>
                </div>

                {/* Remember Check / Sign in attempt */}
                <div className="row">

                    <Checkbox className="col-sm-8">Remember Me</Checkbox>

                    <div className="col-sm-4">
                        <button className="btn btn-primary btn-block btn-flat">Sign In</button>
                    </div>

                </div>

            </form>

            {/* TODO: implement system for forgot password */}
            <Link to={`${this.props.basePath}#`}>
                I forgot my password
            </Link>
            <br/>
            <Link to={`${this.props.basePath}register`}>
                Register a new membership!
            </Link>

        </div>;
    }
}
