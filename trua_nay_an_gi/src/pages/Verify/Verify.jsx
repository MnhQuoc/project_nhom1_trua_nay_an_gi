// src/pages/Verify/Verify.jsx
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { message } from "antd";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      if (!userId) {
        message.error("Liên kết không hợp lệ.");
        return;
      }

      try {
        await fetch(`http://localhost:3000/users/${userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ verified: true }),
        });

        message.success("Tài khoản đã được xác minh thành công!");
        navigate("/login");
      } catch (error) {
        console.error(error);
        message.error("Xác minh tài khoản thất bại.");
      }
    };

    verifyUser();
  }, [userId, navigate]);

  return null;
};

export default Verify;
