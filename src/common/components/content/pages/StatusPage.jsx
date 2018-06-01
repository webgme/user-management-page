/**
 * Home page container
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';

// Self-defined
import {fetchUserIfNeeded} from '../../../actions/user';
import {fetchUsersIfNeeded} from '../../../actions/users';

const REFRESH_INTERVAL = 2000;

export default class StatusPage extends Component {

    constructor(props) {
        super(props);
        this.intervalId = null;
    }

    state = {
        status: null,
        auto: false
    };

    componentDidMount() {
        const {dispatch} = this.props;

        dispatch(fetchUserIfNeeded());
        dispatch(fetchUsersIfNeeded());

        this.updateStatus();
    }

    componentWillReceiveProps(newProps) {
        if (this.props.user.siteAdmin !== newProps.user.siteAdmin) {
            this.updateStatus(newProps.user.siteAdmin);
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    updateStatus = (force) => {
        const {user, restClient} = this.props;
        if (!user.siteAdmin && !force) {
            return;
        }

        restClient.getStatus()
            .then((status) => this.setState({status}))
            .catch((err) => {
                console.error(err);
            });
    };

    toggleAuto = () => {
        const {auto} = this.state;
        if (auto) {
            clearInterval(this.intervalId);
        } else {
            setInterval(() => {
                this.updateStatus();
            }, REFRESH_INTERVAL);
        }

        this.setState({auto: !auto});
    };

    render() {
        const {status, auto} = this.state;

        if (!status) {
            return <section className="content"/>;
        }

        const listed = [];
        Object.keys(status).forEach((key) => {
            if (!status[key]) {
                return;
            }

            listed.push((
                <div key={key}>
                    <h3> {key} </h3>
                    <pre>
                        {JSON.stringify(status[key], null, 2)}
                    </pre>
                </div>
            ));
        });

        return (
            <section className="content">
                <span>
                    <Button
                        className="pull-right"
                        onClick={this.updateStatus}
                        disabled={auto}
                    >
                        Refresh
                    </Button>

                    <Button
                        className="pull-right"
                        onClick={this.toggleAuto}
                    >
                        {`${auto ? 'Dis' : 'En'}able auto refresh`}
                    </Button>
                </span>
                {listed}
            </section>
        );
    }

}

StatusPage.propTypes = {
    basePath: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    restClient: PropTypes.object.isRequired
};
