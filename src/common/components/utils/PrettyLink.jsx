/* globals*/
/**
 * @author pmeijer / https://github.com/pmeijer
 */
// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class PrettyLink extends Component {

    render() {
        let text = (this.props.children || ''),
            searchText = (this.props.searchText || ''),
            matchIndex = text.toLowerCase().indexOf(searchText),
            start = text,
            middle = '',
            end = '';

        if (searchText.length > 0 && matchIndex > -1) {
            start = text.substring(0, matchIndex);
            middle = text.substring(matchIndex, matchIndex + searchText.length);
            end = text.substring(matchIndex + searchText.length, text.length);
        }

        return (
            <Link to={this.props.to}>
                <span>{start}</span>
                <span style={{backgroundColor: 'lightgrey'}}>{middle}</span>
                <span>{end}</span>
            </Link>
        );
    }
}

PrettyLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    searchText: PropTypes.string
};
