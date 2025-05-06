import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const ListFood = () => {
  const [foods, setFoods] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredFoods, setFilteredFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await axios.get('http://localhost:3001/food');
      setFoods(res.data);
      setFilteredFoods(res.data); // hiển thị toàn bộ ban đầu
    } catch (err) {
      console.error('Lỗi khi tải dữ liệu:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa món ăn này?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3001/food/${id}`);
      const updatedFoods = foods.filter(food => food.id !== id);
      setFoods(updatedFoods);
      setFilteredFoods(updatedFoods.filter(food =>
        food.name.toLowerCase().includes(query.toLowerCase())
      ));
    } catch (err) {
      console.error('Lỗi khi xóa:', err);
    }
  };

  const handleSearchClick = () => {
    const results = foods.filter(food =>
      food.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFoods(results);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Danh sách món ăn</h2>

      <div className="mb-4 d-flex">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Tìm kiếm món ăn..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn btn-outline-secondary"
          style={{ marginLeft: '5px' }}
          onClick={handleSearchClick}
        >
          Tìm kiếm
        </button>
      </div>

      <div className="row">
        {filteredFoods.map((food) => (
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
                  <strong>Giá:</strong> {food.price}đ <br />
                  <strong>Giá KM:</strong> {food.discountPrice}đ <br />
                  <strong>Phí DV:</strong> {food.serviceFee}đ
                </p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => navigate(`/editfood/${food.id}`)}
                  >
                    ✏️ Sửa
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(food.id)}
                  >
                    🗑️ Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredFoods.length === 0 && (
          <div className="text-center mt-4 text-muted">Không tìm thấy món ăn nào.</div>
        )}
      </div>
    </div>
  );
};

export default ListFood;
