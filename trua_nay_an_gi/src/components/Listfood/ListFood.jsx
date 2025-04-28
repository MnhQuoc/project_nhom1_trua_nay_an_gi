import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditFood = () => {
  const { id } = useParams(); // lấy id từ URL
  const navigate = useNavigate();

  const [food, setFood] = useState({
    name: '',
    address: '',
    price: '',
    discountPrice: '',
    prepareTime: '',
    note: '',
    tag: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFood();
  }, []);

  const fetchFood = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/food/${id}`);
      const fetchedFood = response.data;

      setFood({
        ...fetchedFood,
        tag: fetchedFood.tag ? fetchedFood.tag.join(', ') : '' // tags thành chuỗi để dễ nhập
      });
    } catch (error) {
      console.error('❌ Lỗi khi tải món ăn:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFood = {
      ...food,
      tag: food.tag.split(',').map(tag => tag.trim()) // chuyển chuỗi tag thành mảng
    };

    try {
      await axios.put(`http://localhost:3001/food/${id}`, updatedFood);
      alert('✅ Cập nhật món ăn thành công!');
      navigate('/'); // sau khi sửa sẽ quay lại trang ListFood
    } catch (error) {
      console.error('❌ Lỗi khi cập nhật món ăn:', error);
      alert('❌ Cập nhật thất bại!');
    }
  };

  if (loading) {
    return <p className="text-center mt-5">Đang tải dữ liệu món ăn...</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Cập Nhật Món Ăn</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên món ăn</label>
          <input type="text" className="form-control" name="name" value={food.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Địa chỉ</label>
          <input type="text" className="form-control" name="address" value={food.address} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Giá</label>
          <input type="number" className="form-control" name="price" value={food.price} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Giá Khuyến Mãi</label>
          <input type="number" className="form-control" name="discountPrice" value={food.discountPrice} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Thời gian chuẩn bị (phút)</label>
          <input type="number" className="form-control" name="prepareTime" value={food.prepareTime} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Ghi chú</label>
          <textarea className="form-control" name="note" value={food.note} onChange={handleChange}></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Tags (cách nhau bằng dấu phẩy)</label>
          <input type="text" className="form-control" name="tag" value={food.tag} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Link Hình Ảnh</label>
          <input type="text" className="form-control" name="image" value={food.image} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-success">✅ Cập Nhật</button>
      </form>
    </div>
  );
};

export default EditFood;
