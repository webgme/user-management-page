/**
 * Sidebar user section
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';

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
        this.props.restClient.user.getCurrentUser()
            .then(data => {
                this.setState({userData: data});
            });
    }

    render() {

        return <div className="user-panel" style={STYLING.panelStyle}>
            <div className="pull-left image">
                <img src="/img/gme-logo.png" className="img-circle" alt="User Image" style={STYLING.imageStyle}/>
            </div>
            <div className="pull-left info">
                <p style={STYLING.nameStyle}>{this.state.userData._id}</p>
                <a href="#" style={STYLING.welcomeStyle}><i className="fa fa-circle text-success"/> Online</a>
            </div>
        </div>;
    }

}
