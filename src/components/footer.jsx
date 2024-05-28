import React from 'react';
import { useEffect, useState } from 'react';

import { AiFillInstagram, AiFillLinkedin, AiFillFacebook } from 'react-icons/ai'; 
import "../css/Footer.css";


function useWindowScroll() {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.pageYOffset);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollPosition;
}

function Footer() {
    const scrollPosition = useWindowScroll();
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const isAtBottom = scrollPosition + windowHeight >= documentHeight;

    return (
        <footer className={`footer ${isAtBottom ? 'sticky-bottom' : ''}`}>
            <p>CGU - Mentions légales - Contact</p>
            <div className="icones"> 
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <AiFillInstagram />
                </a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                    <AiFillLinkedin />
                </a>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <AiFillFacebook />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
