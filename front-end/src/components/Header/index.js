import React from 'react';
import logo from '../../assets/intelbrasv1.png';
import './index.css';

function Header({title}){
    return (
        <header className="main-header">
            <img src={logo} className="App-logo" alt="logo" />
            {/* <h1>{title}</h1> */}
        </header>
    )
}

export default Header;