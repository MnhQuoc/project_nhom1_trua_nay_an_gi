import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Register() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    phone: '',
    email: ''
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    phone: '',
    email: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: ''
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMessage = '';

    if (name === 'username' && value.length < 8) {
      errorMessage = 'Tên đăng nhập phải từ 8 ký tự trở lên';
    }

    if (name === 'password' && !/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(value)) {
      errorMessage = 'Mật khẩu phải từ 8 ký tự trở lên và bao gồm cả chữ và số';
    }

    if (name === 'phone' && !/^\d{11}$/.test(value)) {
      errorMessage = 'Số điện thoại phải có 11 số';
    }

    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errorMessage = 'Email không hợp lệ';
    }

    setErrors({
      ...errors,
      [name]: errorMessage
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage('Vui lòng sửa lỗi trong các trường.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/users', form);

      if (response.status === 201) {
        setMessage('Đăng ký thành công!');
        setForm({ username: '', password: '', phone: '', email: '' });
      } else {
        throw new Error('Đăng ký thất bại!');
      }
    } catch (error) {
      console.error(error);
      setMessage('Đăng ký thất bại!');
    }
  };

  const validateForm = () => {
    let valid = true;
    let errorMessages = {};
    if (form.username.length < 8) {
      errorMessages.username = 'Tên đăng nhập phải từ 8 ký tự trở lên';
      valid = false;
    }
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(form.password)) {
      errorMessages.password = 'Mật khẩu phải từ 8 ký tự trở lên và bao gồm cả chữ và số';
      valid = false;
    }

    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(form.phone)) {
      errorMessages.phone = 'Số điện thoại phải có 11 số';
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      errorMessages.email = 'Email không hợp lệ';
      valid = false;
    }

    setErrors(errorMessages);
    return valid;
  };

  return (
    <div className="container d-flex justify-content-center">
      <div style={{ maxWidth: '400px', width: '100%', padding: '20px', textAlign: 'left' }}>
        <h2 className="mb-4 text-center">Đăng Ký</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Tên đăng nhập:</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={form.username}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.username && <p className="text-danger">{errors.username}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mật khẩu:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Số điện thoại:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="form-control"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.phone && <p className="text-danger">{errors.phone}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>

          {/* Thêm kiểu dáng cho nút Đăng ký */}
          <button type="submit" className="btn btn-primary w-100" style={{ padding: '15px' }}>
            Đăng ký
          </button>
        </form>

        {message && <p className="mt-3">{message}</p>}

        <div className="mt-4 d-flex justify-content-between align-items-center">
          <span>Bạn đã có tài khoản?</span>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => navigate('/login')}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
