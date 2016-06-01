import React from 'react';
import SideBarUserPanel from './SideBarUserPanel.jsx';
import SideBarMenu from './SideBarMenu.jsx';

export default class SideBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <aside className="main-sidebar">

            <section className="sidebar">

                <SideBarUserPanel restClient={this.props.restClient}/>

                <form action="#" method="get" className="sidebar-form">
                    <div className="input-group">
                        <input type="text" name="q" className="form-control" placeholder="Search..."/>
                    <span className="input-group-btn">
                        <button type="submit" name="search" id="search-btn" className="btn btn-flat">
                            <i className="fa fa-search"/>
                        </button>
                    </span>
                    </div>
                </form>

                <SideBarMenu location={this.props.location}/>

            </section>
        </aside>;
    }

}
