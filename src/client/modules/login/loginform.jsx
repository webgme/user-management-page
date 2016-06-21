/**
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Link from 'react-router/lib/Link';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
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
                <div className="input-group">
                    <span className="input-group-addon">
                        <i className="glyphicon glyphicon-user"/>
                    </span>
                    <input type="text" className="form-control"
                           placeholder="User ID"/>
                </div>

                <br/>

                {/* Password */}
                <div className="input-group">
                    <span className="input-group-addon">
                        <i className="glyphicon glyphicon-lock"/>
                    </span>
                    <input type="text" className="form-control"
                           placeholder="Password"/>
                </div>

                <br/>

                {/* Remember Check / Sign in attempt */}
                <div className="row">

                    <Checkbox className="col-sm-6">Remember Me</Checkbox>

                    <div className="col-sm-6">

                        <Link to={`${this.props.basePath}register`}>
                            <Button bsStyle="warning">
                                Register
                            </Button>
                        </Link>

                        <Button bsStyle="primary">
                            Sign In
                        </Button>

                    </div>

                </div>

            </form>

            {/* TODO: implement system for forgot password */}
            <OverlayTrigger trigger="click"
                            placement="bottom"
                            overlay={<Popover title="" id="randomId">
                                <strong>Coming soon</strong>
                                </Popover>}>
                <Link to={`${this.props.basePath}`}>I forgot my password</Link>
            </OverlayTrigger>

        </div>;
    }
}
