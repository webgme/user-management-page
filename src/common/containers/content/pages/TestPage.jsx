/**
 * Testing async redux
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchUserIfNeeded } from '../../../actions/user';

class TestPage extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchUserIfNeeded());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.props.user) {
            const { dispatch } = nextProps;
            dispatch(fetchUserIfNeeded());
        }
    }

    render() {
        const { user } = this.props;

        return (
            <section>

                {JSON.stringify(user)}

            </section>
        );
    }

}

TestPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(TestPage)