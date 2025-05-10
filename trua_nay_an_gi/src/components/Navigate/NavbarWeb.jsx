import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaRegBell, FaSignInAlt, FaUserCircle, FaSignOutAlt, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useNavigate, NavLink } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const NavbarWeb = () => {
  const [role, setRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/menu?search=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  const suggestions = ['Bánh mì', 'Phở', 'Cơm'];

  return (
    <div>
      <Navbar className="custom-navbar navbar-expand-sm navbar-dark" expand="lg" bg="dark" sticky="top">
        <Container>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <NavLink className="navbar-brand" to="/home" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="navbar-brand.svg" alt="Logo" style={{ width: '30px', height: 'auto', marginRight: '8px' }} />
              <span>Trưa nay ăn gì</span>
            </NavLink>
            <span className="nav-link text-primary ms-3">
              CALL US: <span className="text-muted">(123) 456 7890)</span>
            </span>
          </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <NavLink className="nav-link" to="/home">Trang chủ</NavLink>
              {role === 'merchant' && (
                <NavLink className="nav-link" to="/listfood">Thực đơn</NavLink>
              )}
            </Nav>

            <div className="d-flex align-items-center">
              {role === 'admin' && (
                <NavLink to="/listmerchant" className="text-light mx-2">Danh sách người bán</NavLink>
              )}
              {role === 'merchant' && (
                <NavLink to="/changeinfo" className="text-light mx-2">Thông tin cửa hàng</NavLink>
              )}
            </div>

            <div className="d-flex align-items-center">
              <span className="text-light mx-2"><FaRegBell /></span>
              <NavLink to="/#about" className="text-light mx-2">Hỗ trợ</NavLink>
            </div>

            {!isLoggedIn ? (
              <>
                <NavLink to="/register" className="btn btn-outline-primary mx-2">Đăng ký</NavLink>
                <NavLink to="/login" className="btn btn-primary"><FaSignInAlt /> Đăng nhập</NavLink>
              </>
            ) : (
              <NavDropdown
                title={<span><FaUserCircle /> {username}</span>}
                id="user-dropdown"
                className="text-light"
                menuVariant="dark"
              >
                {(role === 'user' || role === 'merchant') && (
                  <NavDropdown.Item as={NavLink} to="/profile" className="text-dark">Tài khoản</NavDropdown.Item>
                )}
                {role === 'merchant' && (
                  <NavDropdown.Item as={NavLink} to="/orderlist" className="text-dark">Quản lý đơn hàng</NavDropdown.Item>
                )}
                {role === 'admin' && (
                  <NavDropdown.Item as={NavLink} to="/users" className="text-dark">Quản lý tài khoản</NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-dark">
                  <FaSignOutAlt /> Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            )}

            <NavDropdown
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src="/images/Flag_of_Vietnam.png" alt="VN" style={{ width: '20px', marginRight: '5px' }} />
                  <span>Tiếng Việt</span>
                </div>
              }
              id="language-dropdown"
              className="ms-3"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#vietnam" className="text-dark">
                <img src="/images/Flag_of_Vietnam.png" alt="VN" style={{ width: '20px', marginRight: '5px' }} />
                Tiếng Việt
              </NavDropdown.Item>
              <NavDropdown.Item href="#english" className="text-dark">
                <img src="/images/Flag_of_the_United_States.png" alt="EN" style={{ width: '20px', marginRight: '5px' }} />
                English
              </NavDropdown.Item>
              <NavDropdown.Item href="#chinese" className="text-dark">
                <img src="/images/Flag_of_China.png" alt="CN" style={{ width: '20px', marginRight: '5px' }} />
                中文
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Thanh tìm kiếm + gợi ý + giỏ hàng */}
      <Navbar bg="dark" className="border-bottom">
        <Container>
          <div style={{ position: 'relative' }} className="flex-grow-1 mx-4">
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Tìm kiếm món ăn..."
                className="me-3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                style={{ borderRadius: '5px' }}
              />
              <Button variant="outline-primary" type="submit" style={{ borderRadius: '5px' }}>
                <FaSearch />
              </Button>
            </Form>

            {showSuggestions && searchQuery.trim() !== '' && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'white',
                border: '1px solid #ddd',
                borderTop: 'none',
                zIndex: 9999
              }}>
                {suggestions
                  .filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((item, index) => (
                    <div
                      key={index}
                      onMouseDown={() => {
                        navigate(`/menu?search=${encodeURIComponent(item)}`);
                        setShowSuggestions(false);
                      }}
                      style={{
                        padding: '8px 12px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #eee'
                      }}
                    >
                      {item}
                    </div>
                  ))
                }
                {suggestions.filter(item =>
                  item.toLowerCase().includes(searchQuery.toLowerCase())
                ).length === 0 && (
                  <div style={{ padding: '8px 12px', color: '#888' }}>
                    Không có gợi ý phù hợp.
                  </div>
                )}
              </div>
            )}
          </div>

          <OverlayTrigger placement="bottom" overlay={<Tooltip>Xem giỏ hàng</Tooltip>}>
            <NavLink to="/cart" className="ms-3 position-relative text-light">
              <FaShoppingCart size={24} />
            </NavLink>
          </OverlayTrigger>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarWeb;
