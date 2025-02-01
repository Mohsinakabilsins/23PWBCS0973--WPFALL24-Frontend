import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import headerStyle from './Header.module.css';

function Header({ className }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`${headerStyle.header} ${scrolled ? headerStyle.scrolled : ''} ${className}`}>
            <div className={`${headerStyle.navbarContainer} ${className}`}>
                <Navbar className={className} />
            </div>
        </header>
    );
}

export default Header;
