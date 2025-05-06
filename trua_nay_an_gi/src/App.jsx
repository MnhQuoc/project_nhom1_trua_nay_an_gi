import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router';
import NavbarWeb from './components/Navigate/NavbarWeb';
import Header from './pages/Home/Header';
import About from './pages/RecommendFood/About';
import Team from './pages/Team/Team';
import BackToTop from './components/backtotop/BackToTop.jsx';
import Footer from './components/Footer/Footer';
import Profile from './pages/Profile/Profile';
import Users from './pages/Users/Users';
import Intro from './pages/Intro/Intro';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import MerchantList from './pages/MerchantList/MerchantList.jsx';
import ChangeInfo from './pages/ChangeInfo/ChangeInfo.jsx';
import OrderList from './pages/MerchantList/OrderList.jsx';
import OrderDetail from './pages/MerchantList/OrderDetail.jsx';
import Verify from './pages/Verify/Verify.jsx';
import ExploreSection from './pages/Content/ExploreSection';

// Bắt lỗi toàn cục
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Đã xảy ra lỗi. Vui lòng thử lại sau.</h1>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Trang Intro riêng biệt */}
        <Route path="/" element={<Intro />} />

        {/* Các layout có navbar + footer */}
        <Route
          path="/*"
          element={
            <div className="App">
              <NavbarWeb />
              <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route path="/users" element={<Users />} />
                <Route path="/menu" element={<h1>Menu</h1>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/listmerchant" element={<MerchantList />} />
                <Route path="/changeinfo" element={<ChangeInfo />} />
                <Route path="/orderlist" element={<OrderList />} />
                <Route path="/orderdetail/:orderId" element={<OrderDetail />} />
                <Route path="/verify/:userId" element={<Verify />} />

                {/* Trang Home có banner động hai bên */}
                <Route
                  path="/home"
                  element={
                    <div className="home-banner-wrapper">
                      {/* Banner trái */}
                      <div className="side-banner left">
                        <img src="/images/rice.gif" alt="Banner trái" />
                      </div>

                      {/* Banner phải */}
                      <div className="side-banner right">
                        <img src="/images/rice.gif" alt="Banner phải" />
                      </div>

                      <div className="home-content">
                        <Header />
                        <ExploreSection />
                        <About />
                        
                      </div>
                    </div>
                  }
                />
              </Routes>
              <BackToTop />
              <Footer />
            </div>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
