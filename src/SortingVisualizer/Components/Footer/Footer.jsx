import React from 'react';
import linkedin from "../../../assets/linkedin.png"
import github from "../../../assets/github.png"
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="copyright">
          <p>&copy; 2024 All rights reserved NIKUNJ AGARWAL</p>
        </div>
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/nikunjagarwal95" target="_blank" rel="noopener noreferrer">
            <img src={linkedin} alt="LinkedIn" />
          </a>
          <a href="https://github.com/nikunj95agarwal" target="_blank" rel="noopener noreferrer">
            <img src={github} alt="GitHub" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
