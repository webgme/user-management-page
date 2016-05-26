import React from 'react';

export default class ProjectPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return <section className="content">
            <h2>Singular project page Content</h2>
            <h3>Owner: {this.props.params.ownerId}</h3>
            <h4>Project Name: {this.props.params.projectName}</h4>
        </section>;
    }

}
