import React from 'react';
import { Routes, Route } from 'react-router';
import NavbarWeb from './components/Navigate/NavbarWeb';
import Header from './pages/Home/Header';
import About from './pages/About/About';
import Team from './pages/Team/Team';
import Footer from './components/Footer/Footer';
import Profile from './pages/Profile/Profile';
import Register from './components/Register/Register';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lỗi:', error);
    console.error('Thông tin lỗi:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Đã xảy ra lỗi. Vui lòng tải lại trang.</h1>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <NavbarWeb />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <About />
                <Team />
              </>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
