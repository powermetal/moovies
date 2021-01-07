import React, { useState, useRef, useEffect } from 'react';
import './navbar.css';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../images/logo.png';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import { login, logout, isSignIn, selectUser } from '../../redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Navbar = (props) => {
    const history = useHistory()
    const navRef = useRef()
    const searchRef = useRef()
    const [searchTerm, setSearchTerm] = useState('')
    const dispatch = useDispatch()
    const signedIn = useSelector(isSignIn)
    const user = useSelector(selectUser)
    const googleOAuth = {
        clientId: "917855566915-81om0ij7mscqbhm4a64jb1e6s7rhi0ir.apps.googleusercontent.com",
        cookiePolicy: "single_host_origin"
    }

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

    const onSuccess = (response) => {
        dispatch(login({
            name: response.profileObj.givenName,
            googleId: response.profileObj.googleId,
            avatar: response.profileObj.imageUrl
        }))
    }

    const onFailure = (response) => {
        console.log(response)
    }

    const onLogoutSuccess = () => {
        dispatch(logout())
    }

    const { signIn, signInloaded } = useGoogleLogin({
        onSuccess,
        ...googleOAuth,
        isSignedIn: true,
        onFailure
    })

    const { signOut, signOutloaded } = useGoogleLogout({
        onFailure,
        ...googleOAuth,
        onLogoutSuccess
    })

    const renderButton = () => {
        if (signedIn)
            return <div className="navbar__user"><span>{user.name}</span><img className="navbar__avatar" src={user.avatar} /></div>
        else
            return <button onClick={() => signIn()}>Login</button>
    }

    const isInHome = () => {
        if (props.location.pathname === '/')
            return '__home'
        else
            return ''
    }

    const renderTagline = () => {
        if (props.location.pathname === '/')
            return <p>Search for your favorites <span>Moovies!</span> and create your own watchlists!</p>
    }

    return (
        <nav className={`navbar${isInHome()}`} ref={navRef}>
            <Link className={`navbar__logo${isInHome()}`} to={"/"}>
                <img src={logo} />
                <h1>Moovies!</h1>
                {renderTagline()}
            </Link>
            <div className={`navbar__search${isInHome()}`}>
                <form onSubmit={onSubmitSearch}>
                    <input ref={searchRef} onChange={e => setSearchTerm(e.target.value)} value={searchTerm} placeholder='Search...' />
                </form>
                <SearchIcon className="navbar__searchIcon" onClick={onSearchIconClick} />
                <CloseIcon className="navbar__closeIcon" onClick={toggleSearch} />
            </div>
            <div className={`navbar__login${isInHome()}`}>
                {renderButton()}
            </div>
        </nav>
    )
}

export default withRouter(Navbar)