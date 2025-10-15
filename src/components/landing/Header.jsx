import React from 'react';
import { headerStyles } from '../../styles/landing/header.styles';

const Header = ({ openModal, handleNavClick }) => {
  return (
    <header style={headerStyles.header}>
      <nav style={headerStyles.nav}>
        <div style={headerStyles.logo}>Launch Prep</div>
        <ul style={headerStyles.navLinks}>
          <li>
            <a
              href="#features"
              className="nav-link"
              style={headerStyles.navLink}
              onClick={(e) => handleNavClick(e, '#features')}
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#demo"
              className="nav-link"
              style={headerStyles.navLink}
              onClick={(e) => handleNavClick(e, '#demo')}
            >
              Demo
            </a>
          </li>
          <li>
            <a
              href="#stats"
              className="nav-link"
              style={headerStyles.navLink}
              onClick={(e) => handleNavClick(e, '#stats')}
            >
              Results
            </a>
          </li>
          <li>
            <a
              href="#universities"
              className="nav-link"
              style={headerStyles.navLink}
              onClick={(e) => handleNavClick(e, '#universities')}
            >
              Team
            </a>
          </li>
        </ul>
        <button style={headerStyles.ctaNav} onClick={openModal}>
          Join Waitlist
        </button>
      </nav>
    </header>
  );
};

export default Header;