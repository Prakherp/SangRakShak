import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setShowMenu(prev => !prev);
    };

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 50);
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
        <div className={`navbar bg-base-100 fixed top-0 w-full z-10 shadow-md ${scrolled ? 'text-white bg-gray-800' : ''}`}>
            <div className="navbar-start flex items-center justify-between w-full">
                <button className="btn btn-ghost text-xl text-white lg:hidden" onClick={toggleMenu}>
                    <FaBars size={24} />
                </button>
                <div className={`lg:flex flex-grow ${showMenu ? 'block' : 'hidden'} lg:justify-start`}>
                    <ul className="menu menu-horizontal px-1 text-white">
                        <li>{renderLink("home", "Home")}</li>
                        <li>{renderLink("about", "About Us")}</li>
                        <li>{renderLink("team", "Team")}</li>
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl text-white ml-auto" href="/">
                    SANGRAKSHAK
                </a>
            </div>
            {showMenu
            }
        </div>
    );
};

export default Navbar;
