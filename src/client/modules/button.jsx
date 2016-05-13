import React from 'react'

export default React.createClass({
    render() {
        return <button type="button" className="btn btn-default">{this.props.text}</button>
    }
});