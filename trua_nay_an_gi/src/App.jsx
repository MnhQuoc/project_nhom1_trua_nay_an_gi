import './App.css';
import React from 'react';
import { Route, Routes, Navigate } from 'react-router';
import NavbarWeb from './components/Navigate/NavbarWeb';
import Header from './pages/Home/Header';
import About from './pages/About/About';
import Team from './pages/Team/Team';
import Footer from './components/Footer/Footer';
import Profile from './pages/Profile/Profile';
import Users from './pages/Users/Users';
import Intro from './pages/Intro/Intro';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup'
import MerchantList from "./pages/MerchantList/MerchantList.jsx";
import ChangeInfo from "./pages/ChangeInfo/ChangeInfo.jsx";
import Verify from "./pages/Verify/Verify.jsx";

// Define an ErrorBoundary class to handle any potential errors in the app
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error:', error);
    console.log('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
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
          {/* Page Intro will be shown first */}
          <Route path="/" element={<Intro />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/menu" element={<h1>Menu</h1>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path='/listmerchant' element={<MerchantList/>} />
          <Route path='/changeinfo' element={<ChangeInfo/>} />
          <Route path="/verify/:userId" element={<Verify />} />

          {/* Main page */}
          <Route
            path="/home"
            element={
              <>
                <Header />
                <About />
                <Team />
              </>
            }
          />
        </Routes>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
