/* global window */

/**
 * Sidebar user panel container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
// Self-defined
import { fetchUserIfNeeded } from '../../actions/user';

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

class SideBarUserPanel extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchUserIfNeeded());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.props.user) {
            const { dispatch } = nextProps;
            dispatch(fetchUserIfNeeded());
        }
    }

    goToEditor() {
        browserHistory.push('/');
        window.location.reload();
    }

    render() {
        const { user } = this.props;

        return <div className="user-panel" style={STYLING.panel}>
            <div className="pull-left image" style={{cursor: "pointer"}}>
                <img alt="User Image"
                     className="img-circle"
                     onClick={this.goToEditor}
                     src="/img/gme-logo.png"
                     style={STYLING.imageIcon}/>
            </div>
            <div className="pull-left info">
                <p style={STYLING.name}>&nbsp;{user._id}&nbsp;</p>
                <span style={STYLING.status}><i className="fa fa-circle text-success"/> Online</span>
            </div>
        </div>;
    }

}

SideBarUserPanel.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    };
};

export default connect(mapStateToProps)(SideBarUserPanel);
