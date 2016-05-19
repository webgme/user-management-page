import React from 'react'

export default class ContentWrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="content-wrapper">
            <section className="content-header">
                <h1>
                    Page Header
                    <small>Optional description</small>
                </h1>
                <ol className="breadcrumb">
                    <li><a href="#"><i className="fa fa-dashboard"/> Level</a></li>
                    <li className="active">Here</li>
                </ol>
            </section>

            <section className="content">
                This is where the good stuff should go ...
            </section>
        </div>
    }
}