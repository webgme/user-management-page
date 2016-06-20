/**
 * Custom data table header for project page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import React from 'react';

export default class DataTableHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="box-header">

                <h3 className="box-title">
                    <i className={this.props.iconClass}/> {` ${this.props.tableName}`}
                </h3>

                <ButtonGroup style={{float: "right"}}>
                    <Button bsStyle={this.props.display === 1 ? "primary" : null}
                            onClick={this.props.handleTableSwitch}
                            id="or">Users</Button>
                    <Button bsStyle={this.props.display === 2 ? "primary" : null}
                            onClick={this.props.handleTableSwitch}
                            id="ow">Organizations</Button>
                </ButtonGroup>
            </div>
        );
    }
}