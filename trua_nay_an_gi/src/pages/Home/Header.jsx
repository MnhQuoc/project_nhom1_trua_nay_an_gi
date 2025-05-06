import React from 'react';

const Header = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&display=swap');

        .custom-header {
          height: 500px;
          background-image: url('/images/header-bg.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: white;
        }

        .custom-header::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
        }

        .custom-header-text {
          position: relative;
          z-index: 2;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .logo-and-title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }

        .logo-and-title img {
          height: 60px;
          width: auto;
        }

        .header-title {
          background: linear-gradient(to bottom, #f2d7a0 10%, #bf8b4b 50%, #9c6a30 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: #fff;
          font-family: 'Playfair Display', serif;
          position: relative;
          text-transform: uppercase;
          font-size: 4vw;
          margin: 0;
          font-weight: 600;
        }

        .header-title::after {
          content: "Trưa nay ăn gì ?";
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
          background: none;
          text-shadow: 
            -1px 0 1px #bf8b4b,
            0 1px 1px #bf8b4b,
            5px 5px 10px rgba(0, 0, 0, 0.4),
            -5px -5px 10px rgba(0, 0, 0, 0.4);
        }

        .header-subtitle {
          font-size: 1.5rem;
          font-weight: 400;
          margin-top: 8px;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        @media (max-width: 768px) {
          .header-title {
            font-size: 2.2rem;
          }

          .header-subtitle {
            font-size: 1.2rem;
          }

          .logo-and-title img {
            height: 50px;
          }
        }
      `}</style>

      <header className="custom-header">
        <div className="custom-header-text">
          <div className="logo-and-title">
            <img
              src="/images/logo.svg"
              alt="logo đầu bếp"
            />
            <h1 className="header-title">Trưa nay ăn gì ?</h1>
          </div>
          <h4 className="header-subtitle">Ứng dụng đặt đồ ăn hàng đầu</h4>
        </div>
      </header>
    </>
  );
};

export default Header;
