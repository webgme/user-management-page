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
        color: "#BAB8B8",
        fontSize: "13px",
        lineHeight: "15px",
        paddingLeft: "27px"
    },
    nameStyle: {
        color: "#ECF0F1",
        fontSize: "14px",
        fontWeight: "light",
        paddingLeft: "25px",
        paddingTop: "5px"
    },
    panelStyle: {
        cursor: "pointer",
        padding: "15px"
    },
    imageStyle: {
        borderRadius: 0,
        maxWidth: "50px",
        paddingLeft: "10px",
        paddingTop: "8px"
    }
};

class SideBarUserPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        this.props.restClient.user.getCurrentUser()
            .then(user => {
                this.setState({
                    user: user
                });
            });
    }

    render() {

        return <div className="user-panel" style={STYLING.panelStyle}>
            <a href="/">
                <div className="pull-left image">
                    <img src="/img/gme-logo.png" className="img-circle" alt="User Image" style={STYLING.imageStyle}/>
                </div>
            </a>
            <div className="pull-left info">
                <p style={STYLING.nameStyle}>&nbsp;{this.state.user._id}&nbsp;</p>
                <a href="#" style={STYLING.welcomeStyle}><i className="fa fa-circle text-success"/> Online</a>
            </div>
        </div>;
    }

}

export default withRouter(SideBarUserPanel);
