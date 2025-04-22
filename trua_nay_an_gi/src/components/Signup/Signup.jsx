import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function Signup() {
  const [form, setForm] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
    gender: '',
    nationality: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
    gender: '',
    nationality: '',
  });

  const [message, setMessage] = useState('');

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

    if (name === 'fullName' && value.trim() === '') {
      errorMessage = 'Họ và tên không được để trống';
    }
    if (name === 'address' && value.trim() === '') {
      errorMessage = 'Địa chỉ không được để trống';
    }
    if (name === 'phone') {
      const phonePattern = /^[0-9]{10,11}$/;
      if (!phonePattern.test(value)) {
        errorMessage = 'Số điện thoại phải là 10 hoặc 11 chữ số';
      }
    }
    if (name === 'email') {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(value)) {
        errorMessage = 'Email không hợp lệ';
      }
    }
    if (name === 'gender' && value === '') {
      errorMessage = 'Giới tính không được để trống';
    }
    if (name === 'nationality' && value.trim() === '') {
      errorMessage = 'Quốc tịch không được để trống';
    }

    setErrors({
      ...errors,
      [name]: errorMessage,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Object.keys(form).forEach((field) => validateField(field, form[field]));

    if (Object.values(errors).some((error) => error !== '')) {
      setMessage('Vui lòng sửa lỗi trước khi gửi');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setMessage('Đăng ký thành công!');
        setForm({
          fullName: '',
          address: '',
          phone: '',
          email: '',
          gender: '',
          nationality: '',
        });
        setErrors({});
      } else {
        setMessage('Có lỗi xảy ra. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2 className="mb-4 text-center">Đăng ký thành viên</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" style={{ textAlign: 'left', display: 'block' }}>Họ và tên</label>
          <input
            type="text"
            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label" style={{ textAlign: 'left', display: 'block' }}>Địa chỉ</label>
          <input
            type="text"
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            name="address"
            value={form.address}
            onChange={handleChange}
          />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label" style={{ textAlign: 'left', display: 'block' }}>Số điện thoại</label>
          <input
            type="text"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label" style={{ textAlign: 'left', display: 'block' }}>Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label" style={{ textAlign: 'left', display: 'block' }}>Giới tính</label>
          <select
            className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Chọn giới tính</option>
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
            <option value="Other">Khác</option>
          </select>
          {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label" style={{ textAlign: 'left', display: 'block' }}>Quốc tịch</label>
          <input
            type="text"
            className={`form-control ${errors.nationality ? 'is-invalid' : ''}`}
            name="nationality"
            value={form.nationality}
            onChange={handleChange}
          />
          {errors.nationality && <div className="invalid-feedback">{errors.nationality}</div>}
        </div>

        <button type="submit" className="btn btn-primary btn-block">Đăng ký</button>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default Signup;
