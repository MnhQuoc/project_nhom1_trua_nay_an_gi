import React from 'react';
import './Footer.css';
import { FaFacebook } from 'react-icons/fa';
import {
  FaSquareGooglePlus,
  FaSquareInstagram,
  FaSquareXTwitter,
} from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Prefooter Section */}
      <div className="prefooter py-4">
        <div className="container">
          <div className="row justify-content-between align-items-center text-center">
            <div className="col-md-3 text-md-left mb-3 mb-md-0">
              <img
                src="/navbar-brand.svg"
                width="100"
                alt="Logo"
                className="mb-0"
              />
            </div>
            <div className="col-md-9 text-md-right">
              <a href="../#team" className="px-3">
                <small className="font-weight-bold">Về chúng tôi</small>
              </a>
              <a href="../#" className="px-3">
                <small className="font-weight-bold">Địa điểm</small>
              </a>
              <a href="../#" className="px-3">
                <small className="font-weight-bold">Trung tâm hỗ trợ</small>
              </a>
              <a href="../#" className="pl-3">
                <small className="font-weight-bold">Điều khoản</small>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Page Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="row align-items-center text-center text-md-left">
            <div className="col">
              <p className="mb-0 small">
                &copy; {currentYear}, Trưa nay ăn gì - All rights reserved
              </p>
            </div>
            <div className="social-links d-none d-md-block">
              <h6 className="small mb-0">
                <a href="https://www.facebook.com/" className="px-2">
                  <FaFacebook />
                </a>
                <a href="https://t.co/" className="px-2">
                  <FaSquareXTwitter />
                </a>
                <a href="https://www.instagram.com/" className="px-2">
                  <FaSquareInstagram />
                </a>
                <a href="https://mail.google.com/" className="px-2">
                  <FaSquareGooglePlus />
                </a>
              </h6>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
