import React from 'react'
import Button from './button.jsx'
export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>Hello, UserManagement!<Button text="UMLabel"/></div>
    }
}