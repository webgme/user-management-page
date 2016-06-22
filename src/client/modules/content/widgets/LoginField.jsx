/**
 * Template login field
 * @author patrickkerypei / https://github.com/patrickkerrypei
 */
// Libraries
import React from 'react';

export default class LoginField extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                <div className="input-group">
                    <span className="input-group-addon">
                        <i className={this.props.iconClass}/>
                    </span>
                    <input type={this.props.textType || "text"}
                           className="form-control"
                           placeholder={this.props.hint}
                           onChange={this.props.onInputChange}
                           value={this.props.value}/>
                    <br/>
                </div>

                {/*
                <div className="row">
                    <div className="col-sm-12" style={{textAlign: "center"}}>
                        <span style={{color: "red", textAlign: "center"}}>Invalid input</span>
                    </div>
                </div>
                */}

                <br/>
            </div>
        );
    }
}
