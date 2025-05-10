import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ListFood = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();
  const [currentMerchantId, setCurrentMerchantId] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role === 'merchant') {
        setCurrentMerchantId(parsedUser.id);
      }
    }
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await axios.get('http://localhost:3001/foods');
      setFoods(res.data);
    } catch (err) {
      console.error('Lỗi khi tải dữ liệu:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa món ăn này?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3001/foods/${id}`);
      const updatedFoods = foods.filter(food => food.id !== id);
      setFoods(updatedFoods);
    } catch (err) {
      console.error('Lỗi khi xóa:', err);
    }
  };

  const merchantFoods = foods.filter(food => food.merchantId === currentMerchantId);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Danh sách món ăn của cửa hàng</h2>

      <div className="d-flex justify-content-start mb-4">
        <button
          className="btn btn-success"
          onClick={() => navigate('/addfood')}
        >
          Thêm món ăn
        </button>
      </div>

      <div className="row">
        {merchantFoods.map((food) => (
          <div className="col-md-4 mb-4" key={food.id}>
            <div className="card h-100">
              <img
                src={food.image || 'https://via.placeholder.com/150'}
                className="card-img-top"
                alt={food.name}
              />
              <div className="card-body">
                <h5 className="card-title">{food.name}</h5>
                <p className="card-text">{food.note}</p>
                <p className="card-text">
                  <strong>Địa chỉ:</strong> {food.address} <br />
                  <strong>Giá:</strong> {food.price}đ <br />
                  <strong>Giá KM:</strong> {food.discountPrice}đ <br />
                  <strong>Phí DV:</strong> {food.serviceFee}đ
                </p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => navigate(`/editfood/${food.id}`)}
                  >
                    <FaEdit /> Sửa
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(food.id)}
                  >
                    <FaTrash /> Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {merchantFoods.length === 0 && (
          <div className="text-center mt-4 text-muted">Cửa hàng bạn chưa có món ăn nào.</div>
        )}
      </div>
    </div>
  );
};

export default ListFood;
