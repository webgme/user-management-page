/**
 * Template login field
 * @author patrickkerypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
// Style
import { LoginField as STYLE } from '../../../../client/style';

export default class LoginField extends Component {

    constructor(props) {
        super(props);
        this.checkEnter = this.checkEnter.bind(this);
    }

    checkEnter(event) {
        if (event.which === 13) {
            this.props.onEnter();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.value !== this.props.value ||
               nextProps.valid !== this.props.valid ||
               nextProps.disabled !== this.props.disabled;
    }

    render() {
        return (
            <div>

                <div className={`input-group ${this.props.valid ? '' : 'has-error'}`}
                     style={this.props.indentStyle || {}}>
                    <span className="input-group-addon">
                        <i className={this.props.iconClass}/>
                    </span>
                    <input autoFocus={this.props.autoFocus}
                           className="form-control"
                           disabled={this.props.disabled ? true : undefined}
                           name={this.props.name}
                           onBlur={this.props.value !== '' ? this.props.onBlur : null}
                           onChange={this.props.onInputChange}
                           onKeyUp={this.checkEnter}
                           placeholder={this.props.hint}
                           readOnly={this.props.readOnly}
                           required="required"
                           type={this.props.textType || "text"}
                           value={this.props.value}/>
                    <br/>
                </div>

                {this.props.valid ? null :
                    <div className="row">
                        <div className="col-sm-12" style={STYLE.invalidMessage.column}>
                            <span style={STYLE.invalidMessage.text}>{this.props.invalidMessage}</span>
                        </div>
                    </div>}

                <br/>
            </div>
        );
    }
}

LoginField.propTypes = {
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    hint: PropTypes.string,
    iconClass: PropTypes.string.isRequired,
    indentStyle: PropTypes.object,
    invalidMessage: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onEnter: PropTypes.func,
    onInputChange: PropTypes.func,
    readOnly: PropTypes.bool,
    valid: PropTypes.bool,
    value: PropTypes.string
};
