// src/pages/Verify/Verify.jsx
import { useEffect } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { message } from "antd";

const Verify = () => {
 
  let { userId } = useParams();
  console.log(userId)
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