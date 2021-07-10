import React from 'react'
import ReactDOM from 'react-dom';
import './main.scss'
import App from './app';
import 'bulma/bulma.sass';

const Entry = () => {
    return (
        <App/>
    )
}

ReactDOM.render(<Entry/>,document.getElementById("root"));