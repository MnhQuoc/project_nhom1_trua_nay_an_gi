import './App.css'
import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Ensure you are importing from 'react-router-dom'
import NavbarWeb from './components/Navigate/NavbarWeb';
import Header from './pages/Home/Header';
import About from './pages/About/About';
import Team from './pages/Team/Team';
import Footer from './components/Footer/Footer';
import Profile from './pages/Profile/Profile';
import Users from './pages/Users/Users';
import SignIn from './pages/Login/index';
import Register from './pages/Register/index'
import Verify from "./pages/Verify/Verify";

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
          <Route path="/" element={<Header />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/team" element={<Team />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<SignIn/>} />
          <Route path="/verify/:id" element={<Verify />} />
        </Routes>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;