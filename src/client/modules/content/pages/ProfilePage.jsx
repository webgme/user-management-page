/**
 * Individual user profile page
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import React from 'react/lib/React';

const STYLING = {
    profileBox: {
        paddingLeft: "35%",
        paddingRight: "35%"
    },
    profileBoxBorder: {
        padding: "10px 10px"
    }
};

export default class ProfilePage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <section className="content" style={STYLING.profileBox}>
            <div className="box box-primary" style={STYLING.profileBoxBorder}>
                <h4>Profile Page...</h4>
            </div>
        </section>;
    }

}
