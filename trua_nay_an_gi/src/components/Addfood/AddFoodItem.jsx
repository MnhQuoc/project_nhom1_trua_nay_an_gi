import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AddFoodItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    image: '',
    prepareTime: '',
    note: '',
    price: '',
    discountPrice: '',
    serviceFee: '',
    tag: ''
  });

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      prepareTime: parseInt(formData.prepareTime) || 0,
      price: parseFloat(formData.price),
      discountPrice: parseFloat(formData.discountPrice),
      serviceFee: parseFloat(formData.serviceFee) || 0,
      tag: formData.tag.split(',').map(tag => tag.trim())
    };

    try {
      await axios.post('http://localhost:3001/foods', data);
      setMessage('✅ Đã thêm món ăn thành công!');
      setIsSuccess(true);
      setFormData({
        name: '',
        address: '',
        image: '',
        prepareTime: '',
        note: '',
        price: '',
        discountPrice: '',
        serviceFee: '',
        tag: ''
      });
      setTimeout(() => setMessage(''), 4000); // Thông báo tự ẩn sau 4 giây
    } catch (error) {
      console.error('❌ Lỗi khi thêm món ăn:', error);
      setMessage('❌ Thêm món ăn thất bại!');
      setIsSuccess(false);
      setTimeout(() => setMessage(''), 4000); // Thông báo tự ẩn sau 4 giây
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Thêm Món Ăn Mới</h2>

      {/* Thông báo */}
      {message && (
        <div
          className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'} mt-3`}
          role="alert"
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="text-start">
        <div className="mb-3">
          <label htmlFor="name" className="form-label" style={{ textAlign: 'left', display: 'block' }}>Tên món ăn (*)</label>
          <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label" style={{ textAlign: 'left', display: 'block' }}>Địa chỉ (*)</label>
          <input type="text" className="form-control" id="address" value={formData.address} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label" style={{ textAlign: 'left', display: 'block' }}>Ảnh món ăn (*)</label>
          <div className="d-flex align-items-center gap-3">
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData({ ...formData, image: reader.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => document.getElementById('imageUpload').click()}
            >
              📷 Chọn ảnh
            </button>
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
              />
            )}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="prepareTime" className="form-label" style={{ textAlign: 'left', display: 'block' }}>Thời gian chuẩn bị (phút)</label>
          <input type="number" className="form-control" id="prepareTime" value={formData.prepareTime} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="note" className="form-label" style={{ textAlign: 'left', display: 'block' }}>Ghi chú</label>
          <textarea className="form-control" id="note" rows="3" value={formData.note} onChange={handleChange}></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label" style={{ textAlign: 'left', display: 'block' }}>Giá tiền (*)</label>
          <input type="number" className="form-control" id="price" value={formData.price} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="discountPrice" className="form-label" style={{ textAlign: 'left', display: 'block' }}>Giá KM (*)</label>
          <input type="number" className="form-control" id="discountPrice" value={formData.discountPrice} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="serviceFee" className="form-label" style={{ textAlign: 'left', display: 'block' }}>Phí dịch vụ</label>
          <input type="number" className="form-control" id="serviceFee" value={formData.serviceFee} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label" style={{ textAlign: 'left', display: 'block' }}>Tag (*) (ngăn cách bằng dấu phẩy)</label>
          <input type="text" className="form-control" id="tag" value={formData.tag} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-success w-100">Thêm món ăn</button>
      </form>
    </div>
  );
};

export default AddFoodItem;