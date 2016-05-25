/* globals*/
import React from 'react';

export default class SideBarUserPanel extends React.Component {

    constructor(props) {
        super(props);
        this.restClient = props.restClient;
        this.state = {userData: {_id: 'loading'}};
    }

    componentDidMount() {
        var self = this;
        this.restClient.user.getCurrentUser()
            .then(function(data) {
                self.setState({userData: data});
            });
    }

    render() {
        return <div className="user-panel">
            <div className="pull-left image">
                <img src="./user2-160x160.jpg" className="img-circle" alt="User Image"/>
            </div>
            <div className="pull-left info">
                <p>{this.state.userData._id}</p>
                <a href="#"><i className="fa fa-circle text-success"/> Online</a>
            </div>
        </div>;
    }

}
