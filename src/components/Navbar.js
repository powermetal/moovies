import React from 'react';
import './navbar.css';
import logo from '../images/logo.png';
import SearchIcon from '@material-ui/icons/Search';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <img src={logo} />
                <h1>Moovies!</h1>
            </div>
            <div className="navbar__search">
                <input />
                <SearchIcon />
            </div>
            <div className="navbar__login">
                <p>Login</p>
            </div>
        </nav>
    )
}

export default Navbar
