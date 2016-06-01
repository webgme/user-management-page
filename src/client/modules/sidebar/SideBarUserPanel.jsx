/* globals*/
import React from 'react';

export default class SideBarUserPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {userData: {_id: 'loading'}};
    }

    componentDidMount() {
        var self = this;
        this.props.restClient.user.getCurrentUser()
            .then(function(data) {
                self.setState({userData: data});
            });
    }

    render() {

        let welcomeStyle = {
            "fontSize": "13px",
            "color": "#BAB8B8",
            "lineHeight": "30px",
            "paddingLeft": "35px"
        };

        let nameStyle = {
            "color": "#ECF0F1",
            "fontWeight": "light",
            "paddingLeft": "40px",
            "fontSize": "16px"
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
                <p style={nameStyle}>{this.state.userData._id}</p>
                <a href="#" style={welcomeStyle}><i className="fa fa-circle text-success"/> Online</a>
            </div>
        </div>;
    }

}
