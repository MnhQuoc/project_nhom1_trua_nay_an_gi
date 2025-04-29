import React from 'react';
import './Header.css';
import HoverButton from "../../components/LayoutAdd/HoverButton.jsx";
import {FaSearch} from "react-icons/fa";
import MainContent from "../Content/MainContent.jsx";


const Header = () => {
    return (
        <>
            <header className="header">
                <div className='d-flex flex-column justify-content-end align-items-center h-100 ' style={{color:'white'}}>
                    <p>Trưa nay ăn gì </p>
                    <p>Ứng dụng đặt đồ ăn hàng đầu </p>
                </div>
            </header>


        </>


    );
};

export default Header;
