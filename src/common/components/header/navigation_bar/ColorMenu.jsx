/**
 * Color selection dropdown of the header component
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
// Self-defined
import { capitalizeFirstLetter } from '../../../../client/utils/utils';
import { THEME_COLORS } from '../../../../client/utils/constants';

const STYLE = {
    colorMenu: {
        paddingLeft: "10%"
    },
    dropdownMenu: {
        width: "150px"
    },
    menuHeader: {
        paddingTop: "-6px",
        paddingRight: "13px",
        paddingBottom: "-6px",
        paddingLeft: "20px"
    }
};

export default class ColorMenu extends Component {

    render() {

        const { onChangeThemeColor } = this.props;

        let colorOptions = ['blue', 'green', 'purple', 'red', 'yellow'];
        let formattedColors = [];
        colorOptions.forEach((color, index) => {
            let colorBoxStyle = {
                width: 10,
                height: 10,
                display: "inline-block",
                backgroundColor: THEME_COLORS[color]
            };
            formattedColors.push(
                <li id={color} key={index} onClick={onChangeThemeColor}>
                    <a href="#" style={{padding: "6px 10px"}}>
                        <div className="pull-left">
                            <div className="color-box" style={colorBoxStyle}></div>
                        </div>
                        <h4>
                            {capitalizeFirstLetter(color)}
                        </h4>
                    </a>
                </li>
            );
        });

        return (
            <li className="dropdown messages-menu">

                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <i className="fa fa-paint-brush" style={{fontSize: "20px"}}/>
                </a>

                <ul className="dropdown-menu" style={STYLE.dropdownMenu}>

                    {/* Dropdown title */}
                    <li className="header" style={STYLE.menuHeader}>
                        <span style={{fontWeight: 700}}>Color Theme</span>
                    </li>

                    {/* Dropdown items */}
                    <li>
                        <ul className="menu" style={STYLE.colorMenu}>
                            {formattedColors}
                        </ul>
                    </li>

                </ul>

            </li>
        );
    }
}
