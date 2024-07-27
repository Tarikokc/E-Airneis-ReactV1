import React from 'react';
import { AiFillInstagram, AiFillLinkedin, AiFillFacebook } from 'react-icons/ai'; 
import "../css/Footer.css";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <p>
        <Link to="/cgu">CGU</Link> - <Link to="/legal">Mentions légales</Link> - <Link to="/contact">Contact</Link>
      </p>
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
