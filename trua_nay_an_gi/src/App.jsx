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
          <Route path="/login" element={<h1>Login pages</h1>} />
          <Route path="/register" element={<h1>Register pages</h1>} />

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
