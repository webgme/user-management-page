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
// Style
import { SideBarUserPanel as STYLE } from '../../../client/style';

class SideBarUserPanel extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchUserIfNeeded());
    }

    goToEditor() {
        browserHistory.push('/');
        window.location.reload();
    }

    render() {
        const { user } = this.props;

        return <div className="user-panel" style={STYLE.panel}>
            <div className="pull-left image" style={{cursor: "pointer"}}>
                <img alt="User Image"
                     className="img-circle"
                     onClick={this.goToEditor}
                     src="/img/gme-logo.png"
                     style={STYLE.imageIcon}/>
            </div>
            <div className="pull-left info">
                <p style={STYLE.name}>&nbsp;{user._id}&nbsp;</p>
                <span style={STYLE.status}><i className="fa fa-circle text-success"/> Online</span>
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
