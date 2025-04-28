import React, { useState } from 'react';
import axios from 'axios';

const AddFoodItem = () => {
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
      alert('✅ Đã thêm món ăn thành công!');
      
      setFormData({ // Reset form
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
    } catch (error) {
      console.error('❌ Lỗi khi thêm món ăn:', error);
      alert('❌ Thêm món ăn thất bại!');
    }
  };
  
  

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Thêm Món Ăn Mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Tên món ăn (*)</label>
          <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Địa chỉ (*)</label>
          <input type="text" className="form-control" id="address" value={formData.address} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Ảnh (URL) (*)</label>
          <input
  type="file"
  className="form-control"
  id="image"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result }); // Lưu base64
      };
      reader.readAsDataURL(file); // chuyển ảnh thành chuỗi base64
    }
  }}
  required
/>
        </div>

        <div className="mb-3">
          <label htmlFor="prepareTime" className="form-label">Thời gian chuẩn bị (phút)</label>
          <input type="number" className="form-control" id="prepareTime" value={formData.prepareTime} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="note" className="form-label">Ghi chú</label>
          <textarea className="form-control" id="note" rows="3" value={formData.note} onChange={handleChange}></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Giá tiền (*)</label>
          <input type="number" className="form-control" id="price" value={formData.price} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="discountPrice" className="form-label">Giá KM (*)</label>
          <input type="number" className="form-control" id="discountPrice" value={formData.discountPrice} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="serviceFee" className="form-label">Phí dịch vụ</label>
          <input type="number" className="form-control" id="serviceFee" value={formData.serviceFee} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag (*) (ngăn cách bằng dấu phẩy)</label>
          <input type="text" className="form-control" id="tag" value={formData.tag} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-success w-100">Thêm món ăn</button>
      </form>
    </div>
  );
};

export default AddFoodItem;
