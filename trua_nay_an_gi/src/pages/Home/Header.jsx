import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="overlay">
        <img
          src="logo.svg"
          alt="Download free bootstrap 4 landing page, free boootstrap 4 templates, Download free bootstrap 4.1 landing page, free boootstrap 4.1.1 templates, Pigga Landing page"
          className="logo"
        />
        <h2 className="subtitle">Welcome to YumMarket</h2>
        <h2 className="title">Really Fresh & Tasty</h2>
        <a className="btn btn-primary mt-3" href="#book-table">
          Book A Table
        </a>
      </div>
    </header>
  );
};

export default Header;
