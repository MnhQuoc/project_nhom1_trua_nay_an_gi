import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';

const FoodEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/food/${id}`);
        setFood({
          ...res.data,
          tag: res.data.tag?.join(', '),
          image: res.data.image
        });
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu:', err);
      }
    };

    fetchFood();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFood((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSave = async () => {
    const updatedFood = {
      ...food,
      prepareTime: parseInt(food.prepareTime) || 0,
      price: parseFloat(food.price),
      discountPrice: parseFloat(food.discountPrice),
      serviceFee: parseFloat(food.serviceFee),
      tag: food.tag.split(',').map(t => t.trim())
    };

    const formData = new FormData();
    formData.append('food', JSON.stringify(updatedFood));
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put(`http://localhost:3001/food/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      alert('✔️ Cập nhật thành công!');
      navigate('/listfood');
    } catch (err) {
      console.error('Lỗi khi cập nhật:', err);
    }
  };

  if (!food) return <div className="text-center mt-5">Đang tải dữ liệu...</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center">📝 Chỉnh sửa món ăn</h2>

      {/* Tên món ăn */}
      <div className="mb-3">
        <label className="form-label" style={{ textAlign: 'left', display: 'block', width: '100%' }}>Tên món ăn</label>
        <input id="name" value={food.name} onChange={handleChange} className="form-control" />
      </div>

      {/* Địa chỉ */}
      <div className="mb-3">
        <label className="form-label" style={{ textAlign: 'left', display: 'block', width: '100%' }}>Địa chỉ</label>
        <input id="address" value={food.address} onChange={handleChange} className="form-control" />
      </div>

      {/* Ảnh món ăn */}
      <div className="mb-3">
        <label className="form-label" style={{ textAlign: 'left', display: 'block', width: '100%' }}>Ảnh món ăn</label>
        <div>
          {food.image && !image && (
            <div>
              {/* Hiển thị ảnh từ base64 nếu có */}
              <img
                src={food.image} 
                alt="Food" 
                style={{ maxWidth: '200px', maxHeight: '200px' }}
                onError={(e) => e.target.src = 'https://via.placeholder.com/200'} // Đặt ảnh mặc định khi không có ảnh
              />
              <button type="button" className="btn btn-danger mt-2" onClick={handleRemoveImage}>Xóa ảnh</button>
            </div>
          )}
          {image && (
            <div>
              <img
                src={URL.createObjectURL(image)} 
                alt="Food Preview" 
                style={{ maxWidth: '200px', maxHeight: '200px' }}
              />
              <button type="button" className="btn btn-danger mt-2" onClick={handleRemoveImage}>Xóa ảnh</button>
            </div>
          )}
          <input type="file" onChange={handleImageChange} className="form-control mt-2" />
        </div>
      </div>

      {/* Thời gian chuẩn bị */}
      <div className="mb-3">
        <label className="form-label" style={{ textAlign: 'left', display: 'block', width: '100%' }}>Thời gian chuẩn bị (phút)</label>
        <input id="prepareTime" value={food.prepareTime} onChange={handleChange} type="number" className="form-control" />
      </div>

      {/* Giá gốc */}
      <div className="mb-3">
        <label className="form-label" style={{ textAlign: 'left', display: 'block', width: '100%' }}>Giá gốc</label>
        <input id="price" value={food.price} onChange={handleChange} type="number" className="form-control" />
      </div>

      {/* Giá khuyến mãi */}
      <div className="mb-3">
        <label className="form-label" style={{ textAlign: 'left', display: 'block', width: '100%' }}>Giá khuyến mãi</label>
        <input id="discountPrice" value={food.discountPrice} onChange={handleChange} type="number" className="form-control" />
      </div>

      {/* Phí dịch vụ */}
      <div className="mb-3">
        <label className="form-label" style={{ textAlign: 'left', display: 'block', width: '100%' }}>Phí dịch vụ</label>
        <input id="serviceFee" value={food.serviceFee} onChange={handleChange} type="number" className="form-control" />
      </div>

      {/* Ghi chú */}
      <div className="mb-3">
        <label className="form-label" style={{ textAlign: 'left', display: 'block', width: '100%' }}>Ghi chú</label>
        <textarea id="note" value={food.note} onChange={handleChange} className="form-control" />
      </div>

      {/* Tags */}
      <div className="mb-3">
        <label className="form-label" style={{ textAlign: 'left', display: 'block', width: '100%' }}>Tags (ngăn cách bởi dấu phẩy)</label>
        <input id="tag" value={food.tag} onChange={handleChange} className="form-control" />
      </div>

      {/* Nút lưu và quay lại */}
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={handleSave}>💾 Lưu</button>
        <button className="btn btn-secondary" onClick={() => navigate('/listfood')}>⬅️ Quay lại</button>
      </div>
    </div>
  );
};

export default FoodEdit;
