/**
 * Sidebar user section
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

/* global window */

// Libraries
import React from 'react/lib/React';
import withRouter from 'react-router/lib/withRouter';

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
        fontSize: "14px",
        paddingTop: "5px"
    },
    panelStyle: {
        padding: "15px",
        cursor: "pointer"
    },
    imageStyle: {
        maxWidth: "50px",
        borderRadius: 0
    }
};

class SideBarUserPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {userData: {_id: 'loading'}};
        this.sendToEditor = this.sendToEditor.bind(this);
    }

    componentDidMount() {
        this.props.restClient.user.getCurrentUser()
            .then(data => {
                this.setState({userData: data});
            });
    }

    sendToEditor() {
        let urlRegex = new RegExp(`^(\\S+)${this.props.basePath.substring(0, this.props.basePath.length - 1)}`);
        let match = urlRegex.exec(window.location.href);
        this.props.router.replace(match[1]);
        window.location.reload();
    }

    render() {

        return <div className="user-panel" style={STYLING.panelStyle}>
            <div className="pull-left image" onClick={this.sendToEditor}>
                <img src="/img/gme-logo.png" className="img-circle" alt="User Image" style={STYLING.imageStyle}/>
            </div>
            <div className="pull-left info">
                <p style={STYLING.nameStyle}>{this.state.userData._id}</p>
                <a href="#" style={STYLING.welcomeStyle}><i className="fa fa-circle text-success"/> Online</a>
            </div>
        </div>;
    }

}

export default withRouter(SideBarUserPanel);
