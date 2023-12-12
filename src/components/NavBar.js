import '../styles/components/Navbar.css'
import { useEffect, useState } from 'react'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons//ai";
import { Link, NavLink } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../database/firebaseConfig';

const NavBar = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [isLogedIn, setIsLogedIn] = useState(false)

    const menuClickHandler = () => {
        setIsVisible(!isVisible);
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLogedIn(true)
            } else {
                setIsLogedIn(false)
            }
          });
    }, [])
    

    return (
        <nav className="navbar">
            <div className="title-menu">
                <Link style={{ textDecoration: 'none' }} to={"/"} className="title-container">
                    {/* <img className='site-icon' src={require("../images/icon-rw.png")}/> */}
                    <h1 className='title'>
                        API <span className='pool'>POOL</span>
                    </h1>
                </Link>

                <div onClick={menuClickHandler} className='navbar-menu'>
                    {isVisible ? <AiOutlineMenuUnfold size={30} /> : <AiOutlineMenuFold size={30} />}
                </div>

            </div>

            <div className={`navbar-list ${isVisible ? 'visible' : ''}`}>
                <NavLink onClick={() => { setIsVisible(!isVisible); }} to="models" className='nav-link' activeClassName="active-nav-link">Models</NavLink>
                {/* <div className="navbar-divider"></div> */}
                <NavLink onClick={() => { setIsVisible(!isVisible); }} to="pricing" className='nav-link' activeClassName="active-nav-link">Pricing</NavLink>
                {/* <div className="navbar-divider"></div> */}
                <NavLink onClick={() => { setIsVisible(!isVisible); }} to={"blogs"} className='nav-link' activeClassName="active-nav-link">Blogs</NavLink>
                {!isLogedIn ?

                    <>
                        <div className="navbar-divider"></div>
                        <NavLink onClick={() => { setIsVisible(!isVisible); }} to={"login"} className='nav-link' activeClassName="active-nav-link">Login</NavLink>
                        <NavLink onClick={() => { setIsVisible(!isVisible); }} to={"sign-up"} className='nav-link dashboard-button'>Sign Up</NavLink>
                    </>
                    :
                    <>
                        <NavLink onClick={() => { setIsVisible(!isVisible); }} to={"console"} className='nav-link dashboard-button' activeClassName="active-nav-link">Console</NavLink>

                    </>
                }
            </div>
        </nav>
    );
}

export default NavBar;