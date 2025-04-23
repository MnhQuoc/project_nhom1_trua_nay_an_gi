import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaRegBell, FaSignInAlt, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import {Link} from "react-router-dom";

const NavbarWeb = () => {
  const [role, setRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsLoggedIn(true);
      setUsername(parsedUser.username);
      setRole(parsedUser.role);
    }
  }, []);

  useEffect(() => {
    // Kiểm tra nếu có thông tin người dùng trong localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
      setUsername(JSON.parse(user).username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  return (
    <div>
      {/* First Navigation */}
      <nav className="navbar nav-first navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/home">
            <img src="navbar-brand.svg" alt="Logo" />
          </Link>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link text-primary" href="#home">
                CALL US :{' '}
                <span className="pl-2 text-muted">(123) 456 7890</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Second Navigation */}
      <Navbar
        className="custom-navbar navbar-expand-sm navbar-dark"
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        sticky="top"
      >
        <Container>
          <Navbar.Brand
            href="/"
            className="navbar-brand font-weight-bold text-light"
          >
            Trưa nay ăn gì
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="/home">Trang chủ</Nav.Link>
              <Nav.Link href="/menu">Thực đơn</Nav.Link>
              <NavDropdown
                title="Tiếng Việt"
                id="basic-nav-dropdown"
                menuVariant="dark"
              >
                <NavDropdown.Item href="/vietnam" className=" text-dark">
                  Tiếng Việt
                </NavDropdown.Item>
                <NavDropdown.Item href="#english" className=" text-dark">
                  English
                </NavDropdown.Item>
                <NavDropdown.Item href="#中文" className="text-dark">
                  中文
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <div className="d-flex align-items-center">
              {role === 'admin' && (
                  <Link to='/listmerchant' className="text-light mx-2">
                    Danh sách người bán
                  </Link>
              )}
              {role === 'merchant' && (
                  <Link to='/changeinfo'  className="text-light mx-2">
                    Thông tin cửa hàng
                  </Link>
              )}

            </div>

            <div className="d-flex align-items-center">
              <a href="#" className="text-light mx-2">
                <FaRegBell />
              </a>
              <a href="../#about" className="text-light mx-2">
                Hỗ trợ
              </a>
            </div>
            {!isLoggedIn ? (
              <>
                <a href="/register" className="btn btn-outline-primary mx-2">
                  Đăng ký
                </a>
                <a href="/login" className="btn btn-primary">
                  <FaSignInAlt /> Đăng nhập
                </a>
              </>
            ) : (
              <NavDropdown
                title={
                  <span>
                    <FaUserCircle /> {username}
                  </span>
                }
                id="user-dropdown"
                className="text-light"
                menuVariant="dark"
              >
                {role === 'user' && (<NavDropdown.Item href="/profile" className=" text-dark">Tài khoản</NavDropdown.Item>)}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className=" text-dark">
                  <FaSignOutAlt /> Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarWeb;
