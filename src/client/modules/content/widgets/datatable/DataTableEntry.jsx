/**
 * Base formatting for any data table's entries
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';

export default class DataTableEntry extends React.Component {

    render() {
        return <tr role="row" className="odd">
            {this.props.children}
            </tr>;
    }
}
