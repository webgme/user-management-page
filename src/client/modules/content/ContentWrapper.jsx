import React from 'react'
import ProjectsPage from './pages/ProjectsPage.jsx'

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

            <ProjectsPage />

        </div>
    }
}