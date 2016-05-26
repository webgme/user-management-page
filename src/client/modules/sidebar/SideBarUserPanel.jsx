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

        let welcomeStyle = {
            "font-size": "16px",
            "color": "#BAB8B8",
            "line-height": "40px",
            "padding-left": "35px"
        };

        let nameStyle = {
            "color": "#ECF0F1",
            "font-weight": "light",
            "padding-left": "40px",
            "font-size": "20px"
        };

        let panelStyle = {
            padding: "15px"
        };

        let imageStyle = {
            "maxWidth": "70px"
        };

        return <div className="user-panel" style={panelStyle}>
            <div className="pull-left image">
                <img src="https://webgme.org/images/webgme-header-logo.png" className="img-circle"
                     alt="User Image" style={imageStyle}/>
            </div>
            <div className="pull-left info">
                <p>{this.state.userData._id}</p>
                <a href="#"><i className="fa fa-circle text-success"/> Online</a>
            </div>
        </div>;
    }

}
