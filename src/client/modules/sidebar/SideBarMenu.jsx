// Libraries
import Link from '../../../../node_modules/react-router/lib/Link';
import React from '../../../../node_modules/react/lib/React';

const STYLING = {
    sidebarCategoryStyle: {
        lineHeight: "30px",
        fontFamily: `"Helvetica Neue", Roboto, Arial, "Droid Sans", sans-serif`,
        color: "#E7E7E7"
    }
};

export default class SideBarMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

        <ul className="sidebar-menu" style={STYLING.sidebarCategoryStyle}>

            <li className="header">Site Navigation</li>

            <li className={/profile/.test(this.props.location.pathname) ? 'active' : ''}>
                <Link to={`${this.props.basePath}profile`}>
                    <i className="fa fa-user"/> <span>My Profile</span>
                </Link>
            </li>

            <li className={/projects/.test(this.props.location.pathname) ? 'active' : ''}>
                <Link to={`${this.props.basePath}projects`}>
                    <i className="fa fa-cubes"/> <span>My Projects</span>
                </Link>
            </li>

            <li className={/organizations/.test(this.props.location.pathname) ? 'active' : ''}>
                <Link to={`${this.props.basePath}organizations`}>
                    <i className="fa fa-university"/> <span>My Organizations</span>
                </Link>
            </li>

            <li className="treeview">
                <a href="#">
                    <i className="fa fa-link"/> <span>Multilevel</span> <i className="fa fa-angle-left pull-right"/>
                </a>
                <ul className="treeview-menu">
                    <li><a href="#"><i className="fa fa-circle-o"/>Sublevel 1</a></li>
                    <li><a href="#"><i className="fa fa-circle-o"/>Sublevel 2</a></li>
                </ul>
            </li>

        </ul>
        );
    }

}
