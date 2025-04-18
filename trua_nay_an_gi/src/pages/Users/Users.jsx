import React, { useState } from 'react';
import './Users.css';

const Users = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editAddress, setEditAddress] = useState('');

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (newAddress.trim()) {
      setAddresses([...addresses, newAddress.trim()]);
      setNewAddress('');
    }
  };

  const handleEditAddress = (index) => {
    setEditIndex(index);
    setEditAddress(addresses[index]);
  };

  const handleUpdateAddress = (e) => {
    e.preventDefault();
    if (editAddress.trim()) {
      const updatedAddresses = [...addresses];
      updatedAddresses[editIndex] = editAddress.trim();
      setAddresses(updatedAddresses);
      setEditIndex(-1);
      setEditAddress('');
    }
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  return (
    <div className="users-container">
      <div className="users-content">
        <h2>Địa chỉ giao hàng</h2>
        
        {/* Form thêm địa chỉ mới */}
        <form onSubmit={handleAddAddress} className="address-form">
          <input
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="Nhập địa chỉ mới"
            className="address-input"
          />
          <button type="submit" className="btn btn-primary">Thêm địa chỉ</button>
        </form>

        {/* Danh sách địa chỉ */}
        <div className="addresses-list">
          {addresses.map((address, index) => (
            <div key={index} className="address-item">
              {editIndex === index ? (
                <form onSubmit={handleUpdateAddress} className="edit-form">
                  <input
                    type="text"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    className="address-input"
                  />
                  <button type="submit" className="btn btn-success">Lưu</button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setEditIndex(-1)}
                  >
                    Hủy
                  </button>
                </form>
              ) : (
                <>
                  <span>{address}</span>
                  <div className="address-actions">
                    <button 
                      onClick={() => handleEditAddress(index)}
                      className="btn btn-warning"
                    >
                      Sửa
                    </button>
                    <button 
                      onClick={() => handleDeleteAddress(index)}
                      className="btn btn-danger"
                    >
                      Xóa
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;