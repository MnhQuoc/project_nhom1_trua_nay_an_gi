import React from 'react';
import './Footer.css';
import { FaFacebook } from 'react-icons/fa';
import {
  FaSquareGooglePlus,
  FaSquareInstagram,
  FaSquareXTwitter,
} from 'react-icons/fa6';

const Footer = () => {

  const founders = [
    {
      name: 'Phúc',
      img: '/images/avtphuc.jpg',
    },
    {
      name: 'Quốc',
      img: '/images/avtquoc.jpg',
    },
    {
      name: 'Tuấn',
      img: '/images/avttuan.jpg',
    },
    {
      name: 'Thịnh',
      img: '/images/avtthinh.jpg',
    },
  ];
  return (
    <>
      <footer className="footer-section bg-dark text-light py-5">
        <div className="container">
          <div className="row text-left">
            {/* Column 1 */}
            <div className="col-md-3 mb-4">
              <h6 className="footer-title">Khám phá</h6>
              <ul className="list-unstyled">
                <li><a href="#">Ứng dụng Mobile</a></li>
                <li><a href="#">Tạo bộ sưu tập</a></li>
                <li><a href="#">Bảo mật thông tin</a></li>
                <li><a href="#">Quy định</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="col-md-3 mb-4">
              <h6 className="footer-title">Công ty</h6>
              <ul className="list-unstyled">
                <li><a href="#">Giới thiệu</a></li>
                <li><a href="#">Trợ giúp</a></li>
                <li><a href="#">Việc làm</a></li>
                <li><a href="#">Quy chế</a></li>
                <li><a href="#">Thỏa thuận sử dụng dịch vụ</a></li>
                <li><a href="#">Liên hệ</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="col-md-3 mb-4">
              <h6 className="footer-title">Tham gia trên</h6>
              <ul className="list-unstyled">
                <li><a href="#"><FaFacebook className="me-2" />Facebook</a></li>
                <li><a href="#"><FaSquareInstagram className="me-2" />Instagram</a></li>
                <li><a href="#"><FaSquareGooglePlus className="me-2" />Google</a></li>
                <li><a href="#"><FaSquareXTwitter className="me-2" />Twitter</a></li>
              </ul>
            </div>

            {/* Column 4 - Founders */}
            <div className="col-md-3 mb-4">
              <h6 className="footer-title">Nhà sáng lập</h6>
              <div className="row">
                {founders.map((person, index) => (
                    <div key={index} className="col-6 mb-3 text-center">
                      <img
                          src={person.img}
                          alt={person.name}
                          className="rounded-circle shadow"
                          width="60"
                          height="60"
                          style={{ objectFit: 'cover' }}
                      />
                      <div className="mt-2">
                        <strong>{person.name}</strong>
                        <p className="mb-0 small text-muted">{person.role}</p>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>

          <hr />
          <div className="d-flex justify-content-between align-items-center small">
            <span>© 2025 Trưa nay ăn gì - All rights reserved</span>
            <span>Made by nhóm bạn siêu đầu bếp 👨‍🍳</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
