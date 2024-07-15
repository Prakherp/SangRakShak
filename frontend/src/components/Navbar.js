import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import './Navbar.css';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const renderLink = (to, name) => {
        if (location.pathname === '/') {
            return (
                <ScrollLink to={to} smooth={true} duration={500} onClick={() => setShowMenu(false)}>
                    {name}
                </ScrollLink>
            );
        } else {
            return (
                <RouterLink to={`/#${to}`} onClick={() => setShowMenu(false)}>
                    {name}
                </RouterLink>
            );
        }
    };

    return (
        <nav className={`${scrolled ? 'navbar scrolled' : 'navbar'}`}>
            <ul className='desk-nav'>
                <li className='link'>{renderLink("home", "Home")}</li>
                <li className='link'>{renderLink("about", "About Us")}</li>
                <li className='link'>{renderLink("team", "Team")}</li>
            </ul>
            <div className="hamburger" onClick={toggleMenu}>
                <FaBars
                    color='white'
                    size={40}
                    className='ham'
                />
            </div>
            <div className={`dropdown ${showMenu ? 'show' : ''}`}>
                <ul className='mobile-nav'>
                    <li className='link'>{renderLink("home", "Home")}</li>
                    <li className='link'>{renderLink("about", "About Us")}</li>
                    <li className='link'>{renderLink("team", "Team")}</li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
