/**
 * Color selection dropdown of the header component
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import React from 'react/lib/React';

const STYLING = {
    dropdownMenu: {
        width: "150px"
    },
    menuHeader: {
        paddingTop: "-6px",
        paddingRight: "13px",
        paddingBottom: "-6px",
        paddingLeft: "25px"
    }
};

export default class ColorMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let colorOptions = ['blue', 'green', 'purple', 'red', 'yellow'];
        let formattedColors = [];
        colorOptions.forEach((color, index) => {
            let colorBoxStyle = {
                width: 10,
                height: 10,
                display: "inline-block",
                backgroundColor: color
            };
            formattedColors.push(
                <li key={index}>
                    <a href="#" style={{padding: "6px 10px"}} onClick={this.props.handleColorSwitch}>
                        <div className="pull-left">
                            <div className="color-box" style={colorBoxStyle}></div>
                        </div>
                        <h4>
                            {color.slice(0, 1).toUpperCase() + color.substring(1)}
                        </h4>
                        {/* <p>Customize your GMEProfile!</p>*/}
                    </a>
                </li>
            );
        });

        return (
            <li className="dropdown messages-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <i className="fa fa-paint-brush"/>
                    <span className="label label-success">!</span>
                </a>
                <ul className="dropdown-menu" style={STYLING.dropdownMenu}>
                    <li className="header" style={STYLING.menuHeader}>
                        <span style={{fontWeight: 700}}>GMEProfile Color</span>
                    </li>
                    <li>
                        <ul className="menu">
                            {formattedColors}
                        </ul>
                    </li>
                </ul>
            </li>
        );
    }
}
