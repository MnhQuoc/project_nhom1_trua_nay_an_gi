import React from 'react';
import './Navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaRegBell, FaSignInAlt } from 'react-icons/fa';

const NavbarWeb = () => {
  return (
    <div>
      {/* First Navigation */}
      <nav className="navbar nav-first navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src="navbar-brand.svg" alt="Logo" />
          </a>
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
            href="#home"
            className="navbar-brand font-weight-bold text-light"
          >
            Trưa nay ăn gì
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="#home">Trang chủ</Nav.Link>
              <Nav.Link href="#link">Thực đơn</Nav.Link>
              <NavDropdown
                title="Tiếng Việt"
                id="basic-nav-dropdown"
                menuVariant="dark"
              >
                <NavDropdown.Item
                  href="#action/3.1"
                  className="bg-dark text-light"
                >
                  Tiếng Việt
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#action/3.1"
                  className="bg-dark text-light"
                >
                  EngLish
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#action/3.1"
                  className="bg-dark text-light"
                >
                  中文
                </NavDropdown.Item>

              </NavDropdown>
            </Nav>
            <div className="d-flex align-items-center">
              <a href="#" className="text-light mx-2">
                <FaRegBell />
              </a>
              <a href="#" className="text-light mx-2">
                Hỗ trợ
              </a>
            </div>
            <a href="#" className="btn btn-outline-primary mx-2">
              Đăng ký
            </a>
            <a href="#" className="btn btn-primary">
              <FaSignInAlt /> Đăng nhập
            </a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div >
  );
};

export default NavbarWeb;
