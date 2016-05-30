import React from 'react';
import {Link} from 'react-router';

export default class CommitTableEntry extends React.Component {

    render() {

        let rights = this.props.read ? 'Read  ' : '';
            rights += this.props.write? 'Write  ' : '';
            rights += this.props.delete? 'Delete' : '';

        return <tr role="row" className="odd">
            <td>{this.props.name}</td>
            <td>{rights}</td>
        </tr>;
    }
}
