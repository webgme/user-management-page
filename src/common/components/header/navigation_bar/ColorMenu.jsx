/**
 * Color selection dropdown of the header component
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component } from 'react';
// Self-defined
import { capitalizeFirstLetter } from '../../../../client/utils/utils';
import { THEME_COLORS } from '../../../../client/utils/constants';
import { ColorMenu as STYLE } from '../../../../client/style';

export default class ColorMenu extends Component {

    render() {

        const { changeThemeColor } = this.props;

        let formattedColors = [];
        Object.keys(THEME_COLORS).forEach((color, index) => {
            let colorBoxStyle = {
                width: 10,
                height: 10,
                display: "inline-block",
                backgroundColor: THEME_COLORS[color]
            };
            formattedColors.push(
                <li data-color={color} key={index} onClick={changeThemeColor}>
                    <a href="#" style={{padding: "6px 10px"}} data-color={color}>
                        <div className="pull-left">
                            <div className="color-box" style={colorBoxStyle} data-color={color}></div>
                        </div>
                        <h4 data-color={color}>
                            {capitalizeFirstLetter(color)}
                        </h4>
                    </a>
                </li>
            );
        });

        return (
            <li className="dropdown messages-menu hidden-xs">

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
