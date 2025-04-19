import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    gender: "",
    address: "",
    avatar: "",
  });

  // Fetch user info
  useEffect(() => {
    axios
      .get("http://localhost:3000/users/1")
      .then((res) => {
        setUser(res.data);
        setFormData(res.data);
      })
      .catch((err) => console.error("Lỗi khi gọi API:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    axios
      .put("http://localhost:3000/users/1", formData)
      .then((res) => {
        setUser(res.data);
        setIsEditing(false);
      })
      .catch((err) => console.error("Lỗi khi cập nhật:", err));
  };

  if (!user) return <div className="text-center p-6">Đang tải dữ liệu...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 border border-black">
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={formData.avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full border border-black"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {formData.name}
            </h2>
            <p className="text-gray-500">{formData.email}</p>
          </div>
        </div>

        {/* Form Thông tin */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Họ tên", name: "name" },
            { label: "Email", name: "email" },
            { label: "Số điện thoại", name: "phone" },
            { label: "Ngày sinh", name: "birthday" },
            { label: "Giới tính", name: "gender" },
            { label: "Địa chỉ", name: "address" },
          ].map((field) => (
            <div key={field.name} className="border border-black rounded-md p-3">
              <label className="text-sm text-gray-600">{field.label}</label>
              {isEditing ? (
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md text-sm"
                />
              ) : (
                <p className="mt-1 font-medium text-gray-800">
                  {formData[field.name]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Nút hành động */}
        <div className="mt-6 text-right">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg mr-3 hover:bg-green-700"
              >
                Lưu thay đổi
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData(user); // reset lại
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                Huỷ
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Chỉnh sửa thông tin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
