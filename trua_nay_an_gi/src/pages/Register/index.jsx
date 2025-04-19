// src/pages/Register/Register.jsx
import { Card, Input, Button, Typography, message } from "antd";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser"; // Thêm dòng này

const { Link } = Typography;

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    const confirmationLink = `http://localhost:5173/verify?userId=${newId}`;
    const { username, email, phone, password, confirmPassword } = formData;

    if (!username || !email || !phone || !password || !confirmPassword) {
      message.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (password !== confirmPassword) {
      message.error("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/users");
      const users = await res.json();

      const isUsernameTaken = users.some((user) => user.username === username);
      if (isUsernameTaken) {
        message.error("Tên đăng nhập đã tồn tại.");
        return;
      }

      const newId = (Math.max(...users.map((user) => Number(user.id)), 0) + 1).toString();

      // Thêm user mới với trạng thái chưa xác minh
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: newId,
          username,
          email,
          phone,
          password,
          role: "user",
          blocked: false,
          verified: false, // chưa xác minh
        }),
      });

      // Gửi email xác nhận
      await emailjs.send(
        "service_2o1ywkk", // ID dịch vụ EmailJS của bạn
        "template_m0x0lah",     // ID template EmailJS
        {
          username: username,
          email: email,
          userId: newId,
          confirmationLink: confirmationLink,
        },
        "ZcmKYaJ0MqbWwcw2h"       // public key từ EmailJS
      );

      message.success("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      message.error("Lỗi đăng ký. Vui lòng thử lại.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card title="Đăng ký" style={{ width: 350, textAlign: "center" }}>
        <Input
          size="large"
          placeholder="Tên đăng nhập"
          prefix={<UserOutlined />}
          name="username"
          value={formData.username}
          onChange={handleChange}
          style={{ marginBottom: 16 }}
        />
        <Input
          size="large"
          placeholder="Email"
          prefix={<MailOutlined />}
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ marginBottom: 16 }}
        />
        <Input
          size="large"
          placeholder="Số điện thoại"
          prefix={<PhoneOutlined />}
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          style={{ marginBottom: 16 }}
        />
        <Input.Password
          size="large"
          placeholder="Mật khẩu"
          prefix={<LockOutlined />}
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={{ marginBottom: 16 }}
        />
        <Input.Password
          size="large"
          placeholder="Xác nhận mật khẩu"
          prefix={<LockOutlined />}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          style={{ marginBottom: 16 }}
        />
        <Button type="primary" block size="large" onClick={handleRegister} style={{ marginBottom: 16 }}>
          Đăng ký
        </Button>
        <div style={{ textAlign: "center" }}>
          <Link href="/login">Đã có tài khoản? Đăng nhập</Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
