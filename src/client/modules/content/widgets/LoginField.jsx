/**
 * Template login field
 * @author patrickkerypei / https://github.com/patrickkerrypei
 */

// Libraries
import React from 'react/lib/React';

export default class LoginField extends React.Component {

    constructor(props) {
        super(props);
        this.checkEnter = this.checkEnter.bind(this);
    }

    checkEnter(event) {
        if (event.which === 13) {
            this.props.onEnter();
        }
    }

    render() {
        return (
            <div>

                <div className={`input-group ${this.props.warning ? 'has-error' : ''}`}
                     style={this.props.indentStyle || {}}>
                    <span className="input-group-addon">
                        <i className={this.props.iconClass}/>
                    </span>
                    <input type={this.props.textType || "text"}
                           className="form-control"
                           placeholder={this.props.hint}
                           onBlur={this.props.value !== '' ? this.props.onBlur : null}
                           onChange={this.props.onInputChange}
                           onKeyUp={this.checkEnter}
                           value={this.props.value}/>
                    <br/>
                </div>

                {!this.props.valid ? <div className="row">
                        <div className="col-sm-12" style={{textAlign: "center"}}>
                            <span style={{color: "red", textAlign: "center"}}>{this.props.invalidMessage}</span>
                        </div>
                    </div> : null}

                <br/>
            </div>
        );
    }
}

LoginField.propTypes = {
    hint: React.PropTypes.string.isRequired,
    iconClass: React.PropTypes.string.isRequired,
    indentStyle: React.PropTypes.object,
    invalidMessage: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onEnter: React.PropTypes.func,
    onInputChange: React.PropTypes.func.isRequired,
    valid: React.PropTypes.bool,
    value: React.PropTypes.string.isRequired,
    warning: React.PropTypes.bool
};
