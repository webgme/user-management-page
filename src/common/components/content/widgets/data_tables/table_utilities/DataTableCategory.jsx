/**
 * Formatting for data table widget's headers
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';
// Style
import {Unselectable} from '../../../../../../client/style';

export default class DataTableCategory extends Component {

    render() {

        return (
            <th className={this.props.className || ''}
                style={Object.assign({}, Unselectable, this.props.style)}>
                <div onClick={this.props.sortable ? this.props.orderEntries : () => {}}
                    style={this.props.sortable ? {cursor: 'pointer', float: 'left'} : {float: 'left'}}>
                    {this.props.name}
                    { (() => {
                        if (this.props.isSorted) {
                            let className = this.props.sortedForward ? 'fa fa-sort-alpha-asc' : 'fa fa-sort-alpha-desc';

                            return <i className={className} style={{marginLeft: '5px'}}/>;
                        }
                        return null;

                    })()}
                </div>
            </th>
        );
    }
}

DataTableCategory.propTypes = {
    name: PropTypes.string.isRequired,
    isSorted: PropTypes.bool,
    sortedForward: PropTypes.bool,
    sortable: PropTypes.bool,
    orderEntries: PropTypes.func,
    className: PropTypes.string
};
