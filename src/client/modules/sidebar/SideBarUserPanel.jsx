// Libraries
import React from '../../../../node_modules/react/lib/React';

const STYLING = {
    welcomeStyle: {
        fontSize: "13px",
        color: "#BAB8B8",
        lineHeight: "15px",
        paddingLeft: "30px"
    },
    nameStyle: {
        color: "#ECF0F1",
        fontWeight: "light",
        paddingLeft: "35px",
        fontSize: "16px",
        paddingTop: "15px"
    },
    panelStyle: {
        padding: "15px"
    },
    imageStyle: {
        maxWidth: "70px",
        borderRadius: 0
    }
};

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
        return <div className="user-panel" style={STYLING.panelStyle}>
            <div className="pull-left image">
                <img src={'/rest/external/usermanagement/' + require('webgme/src/client/img/gme-logo.png')} className="img-circle"
                     alt="User Image" style={STYLING.imageStyle}/>
            </div>
            <div className="pull-left info">
                <p style={STYLING.nameStyle}>{this.state.userData._id}</p>
                <a href="#" style={STYLING.welcomeStyle}><i className="fa fa-circle text-success"/> Online</a>
            </div>
        </div>;
    }

}
