import React from 'react';
import { AiFillInstagram, AiFillLinkedin, AiFillFacebook } from 'react-icons/ai'; 
import "../css/Footer.css";

function Footer() {
    return (
        <footer className="footer">
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
