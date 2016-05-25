import React from 'react';
import SideBarUserPanel from './SideBarUserPanel.jsx';
import SideBarSearchForm from './SideBarSearchForm.jsx';
import SideBarMenu from './SideBarMenu.jsx';

export default class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.restClient = props.restClient;
    }

    render() {
        return <aside className="main-sidebar">

            <section className="sidebar">
                <SideBarUserPanel restClient={this.restClient}/>
                <SideBarSearchForm />
                <SideBarMenu />
            </section>
        </aside>;
    }

}
