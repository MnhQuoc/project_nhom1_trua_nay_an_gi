import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Spinner, Alert, Button } from "react-bootstrap";

const Verify = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (!userId) {
        setStatus({ type: "danger", message: "Liên kết không hợp lệ." });
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/verify/${userId}`);
        if (!response.ok) throw new Error("Xác minh thất bại");

        const message = await response.text();
        setStatus({ type: "success", message });
      } catch (error) {
        console.error("Lỗi xác minh:", error);
        setStatus({ type: "danger", message: "Đã xảy ra lỗi khi xác minh tài khoản." });
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [userId]);

  return (
    <Container className="mt-5 text-center">
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Đang xác minh...</span>
        </Spinner>
      ) : (
        <>
          <Alert variant={status.type}>{status.message}</Alert>
          <Button onClick={() => navigate("/login")} variant="primary">
            Về trang đăng nhập
          </Button>
        </>
      )}
    </Container>
  );
};

export default Verify;
