import '../styles/components/Navbar.css'
import { useEffect, useState } from 'react'
import { IoClose, IoMenu } from "react-icons/io5";
import { Link, NavLink, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuthState';

const NavBar = () => {
    const [isVisible, setIsVisible] = useState(false)
    const location = useLocation();
    const [stickyNavbar, setStickyNavbar] = useState(false);

    const { auth } = useAuth();

    const menuClickHandler = () => {
        setIsVisible(!isVisible);
    }
    
    useEffect(() => {
        if (['/sign-up', '/console', '/login', '/reset-password', '/terms-of-service', '/privacy-policy', '/refund-policy'].includes(location.pathname)) setStickyNavbar(true)
        else setStickyNavbar(false);
    }, [location.pathname])

    return (
        <div className={`navbar-container ${stickyNavbar ? 'navbar-container-sticky' : 'navbar-container-fixed' }`}>
            <nav className={`navbar ${stickyNavbar ? 'navbar-sticky' : 'navbar-fixed' }`}>
                <div className="title-menu">
                    <Link style={{ textDecoration: 'none' }} to={"/"} className="title-container">
                        <div className='title'>
                            API <span className='pool'>POOL</span>
                        </div>
                    </Link>

                    <div onClick={menuClickHandler} className='navbar-menu'>
                        {isVisible ? <IoClose size={"30"} /> : <IoMenu size={"30"} />}
                    </div>
                </div>

                <div className={`navbar-list ${isVisible ? 'visible' : ''}`}>
                    <NavLink onClick={() => { setIsVisible(!isVisible); }} to="apis" className='nav-link'>APIs</NavLink>
                    <NavLink onClick={() => { setIsVisible(!isVisible); }} to="pricing" className='nav-link'>Pricing</NavLink>
                    {!auth.isLoggedIn ?
                        <>
                            <div className="navbar-divider"></div>
                            <NavLink onClick={() => { setIsVisible(!isVisible); }} to={"login"} className='nav-link'>Login</NavLink>
                            <NavLink onClick={() => { setIsVisible(!isVisible); }} to={"sign-up"} className='nav-button'>Sign Up</NavLink>
                        </>
                        :
                        <NavLink onClick={() => { setIsVisible(!isVisible); }} to={"console?tab=0"} className='nav-button' >Console</NavLink>

                    }
                </div>
            </nav>
        </div>
    );
}

export default NavBar;