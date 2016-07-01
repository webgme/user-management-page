/* global window */

/**
 * Sidebar user section
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import browserHistory from 'react-router/lib/browserHistory';
import React from 'react/lib/React';
import withRouter from 'react-router/lib/withRouter';

const STYLING = {
    status: {
        color: "#BAB8B8",
        fontSize: "13px",
        lineHeight: "15px",
        paddingLeft: "23px"
    },
    name: {
        color: "#ECF0F1",
        fontSize: "14px",
        fontWeight: "light",
        paddingLeft: "20px",
        paddingTop: "5px"
    },
    panel: {
        padding: "15px"
    },
    imageIcon: {
        borderRadius: 0,
        maxWidth: "50px",
        paddingTop: "8px"
    }
};

class SideBarUserPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
        this.goToEditor = this.goToEditor.bind(this);
    }

    componentDidMount() {
        this.props.restClient.user.getCurrentUser()
            .then(user => {
                this.setState({
                    user: user
                });
            });
    }

    goToEditor() {
        browserHistory.push('/');
        window.location.reload();
    }

    render() {

        return <div className="user-panel" style={STYLING.panel}>
            <div className="pull-left image" style={{cursor: "pointer"}}>
                <img alt="User Image"
                     className="img-circle"
                     onClick={this.goToEditor}
                     src="/img/gme-logo.png"
                     style={STYLING.imageIcon}/>
            </div>
            <div className="pull-left info">
                <p style={STYLING.name}>&nbsp;{this.state.user._id}&nbsp;</p>
                <span style={STYLING.status}><i className="fa fa-circle text-success"/> Online</span>
            </div>
        </div>;
    }

}

export default withRouter(SideBarUserPanel);
