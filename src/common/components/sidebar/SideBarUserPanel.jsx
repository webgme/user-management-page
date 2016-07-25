/* global window */

/**
 * Sidebar user panel container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
// Self-defined
import { fetchUserIfNeeded } from '../../actions/user';
import { getUserIconSource } from '../../../client/utils/utils';
// Style
import { SideBarUserPanel as STYLE } from '../../../client/style';

export default class SideBarUserPanel extends Component {

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

        return (
            <div className="user-panel" style={STYLE.panel}>
                <div className="pull-left image" style={{cursor: "pointer"}}>
                    <img alt="User Image"
                         className="img-circle"
                         onClick={this.goToEditor}
                         src={getUserIconSource(user._id)}
                         style={STYLE.imageIcon}/>
                </div>
                <div className="pull-left info">
                    <p style={STYLE.name}>{user.siteAdmin ? <i className="fa fa-graduation-cap"/> : null}
                    {` ${user._id}`}</p>
                    <span style={STYLE.status}><i className="fa fa-circle text-success"/> Online</span>
                </div>
            </div>
        );
    }

}

SideBarUserPanel.propTypes = {
    user: PropTypes.object.isRequired
};
