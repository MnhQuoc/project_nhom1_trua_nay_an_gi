import React, { useState } from 'react';

const Profile = () => {
  const [name, setName] = useState('Nguyễn Văn A');
  const [email, setEmail] = useState('nguyenvana@example.com');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Cập nhật thông tin:', { name, email });
    alert('Thông tin đã được cập nhật!');
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      padding: '20px' 
    }}>
      <div style={{ 
        maxWidth: '500px', 
        width: '100%', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' 
      }}>
        <h2>Thông tin cá nhân</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Họ tên:</label><br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ padding: '8px', width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Email:</label><br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: '8px', width: '100%' }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
