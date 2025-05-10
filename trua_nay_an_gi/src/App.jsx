import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router';
import LayoutWithNavbar from "./components/LayoutWithNavbar/LayoutWithNavbar";
import Header from './pages/Home/Header';
import About from './pages/RecommendFood/About';
import Team from './pages/Team/Team';
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
import AddFoodItem from './components/Addfood/AddFoodItem.jsx';
import ListFood from './components/Listfood/ListFood.jsx';
import FoodEdit from './components/Editfood/EditFood.jsx';
import MainContent from './pages/Content/MainContent.jsx';
import Menu from './components/Navigate/Menu.jsx';
import FoodDetail from './pages/FoodDetail/FoodDetail.jsx'; 
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
        {/* Trang intro riêng, không có navbar/footer */}
        <Route path="/" element={<Intro />} />

        {/* Layout có Navbar/Footer */}
        <Route path="/" element={<LayoutWithNavbar />}>
          <Route path="home" element={
            <div className="home-banner-wrapper">
              <div className="side-banner left">
                <img src="/images/rice.gif" alt="Banner trái" />
              </div>
              <div className="side-banner right">
                <img src="/images/rice.gif" alt="Banner phải" />
              </div>
              <div className="home-content">
                <Header />
                <ExploreSection />
                <About />
              </div>
            </div>
          } />
          <Route path="profile" element={<Profile />} />
          <Route path="users" element={<Users />} />
          <Route path="menu" element={<Menu />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="signup" element={<Signup />} />
          <Route path="listmerchant" element={<MerchantList />} />
          <Route path="changeinfo" element={<ChangeInfo />} />
          <Route path="orderlist" element={<OrderList />} />
          <Route path="orderdetail/:orderId" element={<OrderDetail />} />
          <Route path="verify/:userId" element={<Verify />} />
          <Route path="addfood" element={<AddFoodItem />} />
          <Route path="listfood" element={<ListFood />} />
          <Route path="editfood/:id" element={<FoodEdit />} />
          <Route path="main-content" element={<MainContent />} />
          <Route path="/foods/:id" element={<FoodDetail />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
