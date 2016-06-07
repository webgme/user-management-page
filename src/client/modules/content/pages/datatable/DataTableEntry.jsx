// Libraries
import React from '../../../../../../node_modules/react/lib/React';

export default class DataTableEntry extends React.Component {

    render() {
        return <tr role="row" className="odd">
            {this.props.children}
            </tr>;
    }
}
