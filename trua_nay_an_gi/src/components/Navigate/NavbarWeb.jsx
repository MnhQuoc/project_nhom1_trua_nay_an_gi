import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaRegBell, FaSignInAlt, FaUserCircle, FaSignOutAlt, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import {Link} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useCart } from '../../contexts/CartContext';

const NavbarWeb = () => {
  const [role, setRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cartCount } = useCart();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsLoggedIn(true);
      setUsername(parsedUser.username);
      setRole(parsedUser.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search functionality
    navigate(`/menu?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div>
      {/* Thanh navigation chính */}
      <Navbar
        className="custom-navbar navbar-expand-sm navbar-dark"
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        sticky="top"
      >
        <Container>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link className="navbar-brand" to="/home" style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src="navbar-brand.svg" 
                alt="Logo" 
                style={{ width: '30px', height: 'auto', marginRight: '8px' }}
              />
              <span>Trưa nay ăn gì</span>
            </Link>
            <a className="nav-link text-primary ms-3" href="#home">
              CALL US: <span className="text-muted">(123) 456 7890</span>
            </a>
          </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="/home">Trang chủ</Nav.Link>
              <Nav.Link href="/menu">Thực đơn</Nav.Link>
            </Nav>

            <div className="d-flex align-items-center">
              {role === 'admin' && (
                <Link to='/listmerchant' className="text-light mx-2">
                  Danh sách người bán
                </Link>
              )}
              {role === 'merchant' && (
                <Link to='/changeinfo' className="text-light mx-2">
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
                {role === 'user' && (<NavDropdown.Item href="/profile" className="text-dark">Tài khoản</NavDropdown.Item>)}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-dark">
                  <FaSignOutAlt /> Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            )}

            <NavDropdown
              title={
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                      src="/images/Flag_of_Vietnam.png" 
                      alt="VN" 
                      style={{ width: '20px', height: 'auto', marginRight: '5px' }}
                    />
                    <span>Tiếng Việt</span>
                  </div>
                </div>
              }
              id="language-dropdown"
              className="ms-3"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#vietnam" className="text-dark">
                <img 
                  src="/images/Flag_of_Vietnam.png" 
                  alt="VN" 
                  style={{ width: '20px', height: 'auto', marginRight: '5px' }}
                />
                Tiếng Việt
              </NavDropdown.Item>
              <NavDropdown.Item href="#english" className="text-dark">
                <img 
                  src="/images/Flag_of_the_United_States.png" 
                  alt="EN" 
                  style={{ width: '20px', height: 'auto', marginRight: '5px' }}
                />
                English
              </NavDropdown.Item>
              <NavDropdown.Item href="#chinese" className="text-dark">
                <img 
                  src="/images/Flag_of_China.png" 
                  alt="CN" 
                  style={{ width: '20px', height: 'auto', marginRight: '5px' }}
                />
                中文
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Thanh tìm kiếm và giỏ hàng */}
      <Navbar bg="dark" className="border-bottom">
        <Container>
          <Form className="d-flex flex-grow-1 mx-4" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Tìm kiếm món ăn..."
              className="me-3"
              aria-label="Search"
              style={{borderRadius: '5px'}}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-primary" type="submit" style={{borderRadius: '5px'}}>
              <FaSearch />
            </Button>
          </Form>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Xem giỏ hàng</Tooltip>}
          >
            <Link to="/cart" className="ms-3 position-relative text-light">
              <FaShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </Link>
          </OverlayTrigger>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarWeb;
