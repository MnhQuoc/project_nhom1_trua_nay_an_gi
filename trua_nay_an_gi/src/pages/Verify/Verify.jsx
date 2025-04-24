import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";

const Verify = () => {
  let { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      if (!userId) {
        message.error("Liên kết không hợp lệ.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ verified: true }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API response:", data);

        message.success("Tài khoản đã được xác minh thành công!");
        setTimeout(() => navigate("/login"), 1000); // Thêm độ trễ để người dùng thấy thông báo
      } catch (error) {
        console.error("Lỗi xác minh:", error);
        message.error(`Xác minh tài khoản thất bại: ${error.message}`);
      }
    };

    verifyUser();
  }, [userId, navigate]);

  return null;
};

export default Verify;