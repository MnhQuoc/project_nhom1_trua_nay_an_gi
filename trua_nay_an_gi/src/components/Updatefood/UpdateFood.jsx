import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';

const UpdateFoodItem = () => {
  const { id } = useParams(); // lấy id món ăn từ URL
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

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/food/${id}`);
        const food = res.data;
        setFormData({
          ...food,
          tag: food.tag ? food.tag.join(', ') : ''
        });
      } catch (error) {
        console.error('❌ Không lấy được dữ liệu món ăn:', error);
      }
    };
    fetchFood();
  }, [id]);

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
      await axios.put(`http://localhost:3001/food/${id}`, data);
      alert('✅ Đã cập nhật món ăn thành công!');
      navigate('/foods'); // Quay lại danh sách món ăn
    } catch (error) {
      console.error('❌ Lỗi khi cập nhật món ăn:', error);
      alert('❌ Cập nhật món ăn thất bại!');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Cập nhật món ăn</h2>
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
          <label htmlFor="image" className="form-label">Ảnh (URL hoặc base64) (*)</label>
          <input type="text" className="form-control" id="image" value={formData.image} onChange={handleChange} required />
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
          <label htmlFor="discountPrice" className="form-label">Giá khuyến mãi (*)</label>
          <input type="number" className="form-control" id="discountPrice" value={formData.discountPrice} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="serviceFee" className="form-label">Phí dịch vụ</label>
          <input type="number" className="form-control" id="serviceFee" value={formData.serviceFee} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag (*) (cách nhau dấu phẩy)</label>
          <input type="text" className="form-control" id="tag" value={formData.tag} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary w-100">Cập nhật món ăn</button>
      </form>
    </div>
  );
};

export default UpdateFoodItem;
