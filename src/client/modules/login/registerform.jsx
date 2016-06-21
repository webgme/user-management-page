/**
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Link from 'react-router/lib/Link';
import React from 'react/lib/React';

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="register-box-body">
            <p className="login-box-msg">Register a new membership</p>

            <form>

                <div className="input-group">
                    <span className="input-group-addon">
                        <i className="glyphicon glyphicon-user"/>
                    </span>
                    <input type="text" className="form-control"
                           placeholder="User ID"/>
                </div>

                <br/>

                <div className="input-group">
                    <span className="input-group-addon">
                        <i className="glyphicon glyphicon-envelope"/>
                    </span>
                    <input type="text" className="form-control"
                           placeholder="Email"/>
                </div>

                <br/>

                <div className="input-group">
                    <span className="input-group-addon">
                        <i className="glyphicon glyphicon-lock"/>
                    </span>
                    <input type="text" className="form-control"
                           placeholder="Password"/>
                </div>

                <br/>

                <div className="input-group">
                    <span className="input-group-addon">
                        <i className="glyphicon glyphicon-log-in"/>
                    </span>
                    <input type="text" className="form-control"
                           placeholder="Confirm password"/>
                </div>

                <br/>

                {/* Remember Check / Sign in attempt */}
                <div className="row">

                    <Checkbox className="col-sm-6">I agree to the terms</Checkbox>

                    <div className="col-sm-6">
                        <Button bsStyle="warning" style={{float: "right"}}>
                            Register
                        </Button>
                    </div>

                </div>

            </form>

            <Link to={`${this.props.basePath}login`}>
                I already have a membership
            </Link>
        </div>;
    }
}
