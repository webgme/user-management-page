/**
 * @author pmeijer / https://github.com/pmeijer
 */
import React from 'react/lib/React';
import LoginForm from './loginform';
import RegisterForm from './registerform';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="login-box">
            <div className="login-logo">
                <a href="../../index2.html"><b>Admin</b>LTE</a>
            </div>
            <LoginForm/>
        </div>;
    }
}
