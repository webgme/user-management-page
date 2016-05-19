import React from 'react'

/**
 * TODO: This should be broken down into individual pieces.
 */
export default class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <aside className="main-sidebar">

            <section className="sidebar">

                <div className="user-panel">
                    <div className="pull-left image">
                        <img src="./user2-160x160.jpg" className="img-circle" alt="User Image"/>
                    </div>
                    <div className="pull-left info">
                        <p>Alexander Pierce</p>
                        <a href="#"><i className="fa fa-circle text-success"/> Online</a>
                    </div>
                </div>

                <form action="#" method="get" className="sidebar-form">
                    <div className="input-group">
                        <input type="text" name="q" className="form-control" placeholder="Search..."/>
              <span className="input-group-btn">
                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"/>
                </button>
              </span>
                    </div>
                </form>

                <ul className="sidebar-menu">
                    <li className="header">HEADER</li>
                    <li className="active"><a href="#"><i className="fa fa-link"/> <span>Link</span></a></li>
                    <li><a href="#"><i className="fa fa-link"/> <span>Another Link</span></a></li>
                    <li className="treeview">
                        <a href="#"><i className="fa fa-link"/> <span>Multilevel</span> <i className="fa fa-angle-left pull-right"/></a>
                        <ul className="treeview-menu">
                            <li><a href="#">Link in level 2</a></li>
                            <li><a href="#">Link in level 2</a></li>
                        </ul>
                    </li>
                </ul>
            </section>
        </aside>
    }
}