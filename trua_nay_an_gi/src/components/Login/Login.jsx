import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function Login() {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = '';

    if (name === 'username') {
      if (value.trim() === '') {
        errorMessage = 'Tên đăng nhập không được để trống';
      } else if (value.length < 6) {
        errorMessage = 'Tên đăng nhập phải có ít nhất 6 ký tự';
      }
    }

    if (name === 'password') {
      if (value.trim() === '') {
        errorMessage = 'Mật khẩu không được để trống';
      } else if (value.length < 8) {
        errorMessage = 'Mật khẩu phải có ít nhất 8 ký tự';
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra và hiển thị lỗi nếu có
    Object.keys(form).forEach((field) => validateField(field, form[field]));
    if (Object.values(errors).some((error) => error !== '')) {
      setMessage('Vui lòng sửa lỗi trước khi gửi');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/users');
      const data = await response.json();

      const user = data.find(
        (user) => user.username === form.username && user.password === form.password
      );

      if (user) {
        setMessage('Đăng nhập thành công!');
        setForm({ username: '', password: '' });
        navigate('/home');
      } else {
        setMessage('Tên đăng nhập hoặc mật khẩu không đúng!');
      }
    } catch (error) {
      setMessage('Đã xảy ra lỗi, vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2 className="text-center">Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{ textAlign: 'left', display: 'block' }}>Tên đăng nhập:</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="form-control"
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
        </div>

        <div className="form-group">
          <label style={{ textAlign: 'left', display: 'block' }}>Mật khẩu:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>

        <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>

      {message && <p className="mt-3">{message}</p>}

      <div className="mt-4 text-center">
        <span>Bạn chưa có tài khoản?</span>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => navigate('/register')}
        >
          Đăng ký
        </button>
      </div>
    </div>
  );
}

export default Login;
