import React, { useState, useRef } from 'react';
import './navbar.css';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../images/logo.png';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

const Navbar = () => {
    const history = useHistory()
    const navRef = useRef()
    const searchRef = useRef()
    const [searchTerm, setSearchTerm] = useState('')

    const toggleSearch = () => {
        navRef.current.classList.toggle('navbar-search')
    }

    const onSearchIconClick = () => {
        toggleSearch()
        searchRef.current.focus()
    }

    const onSubmitSearch = (e) => {
        e.preventDefault()
        if (searchTerm.length === 0)
            return
        history.push(`/search?q=${searchTerm}`)
    }


    return (
        <nav className="navbar" ref={navRef}>
            <Link className="navbar__logo" to={"/"}>
                <img src={logo} />
                <h1>Moovies!</h1>
            </Link>
            <div className="navbar__search">
                <form onSubmit={onSubmitSearch}>
                    <input ref={searchRef} onChange={e => setSearchTerm(e.target.value)} value={searchTerm} placeholder='Search...' />
                </form>
                <SearchIcon className="navbar__searchIcon" onClick={onSearchIconClick} />
                <CloseIcon className="navbar__closeIcon" onClick={toggleSearch} />
            </div>
            <div className="navbar__login">
                <p>Login</p>
            </div>
        </nav>
    )
}

export default Navbar