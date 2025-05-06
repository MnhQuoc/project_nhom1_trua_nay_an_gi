import React, { useState } from "react";
import { Typography, Button, Row, Col, Space } from "antd";
import { useNavigate } from "react-router";
import LoadingCat from "./Loading";

const { Title, Paragraph } = Typography;

const styles = {
  wrapper: {
    backgroundImage:
      "url('https://t4.ftcdn.net/jpg/02/92/20/37/360_F_292203735_CSsyqyS6A4Z9Czd4Msf7qZEhoxjpzZl1.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#D2B48C",
    height: "100vh",
    textAlign: "center",
    padding: "0 20px",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 2,
  },
  description: {
    color: "#D2B48C",
    fontSize: "1.5rem",
    marginBottom: "1.5rem",
  },
  extraInfo: {
    color: "#D2B48C",
    fontSize: "1.1rem",
    maxWidth: "700px",
    margin: "0 auto 2rem",
    lineHeight: 1.6,
  },
  button: {
    backgroundColor: "#D2B48C",
    color: "#000000",
    border: "none",
    fontWeight: "bold",
  },
};

const Intro = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleExploreClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/home");
    }, 1500);
  };

  return (
    <div style={styles.wrapper}>
      {/* CSS LED màu vàng */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');

        .led-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 5 rem;
          color: #fff8dc;
          text-shadow:
            0 0 5px #fff8dc,
            0 0 10px #ffd700,
            0 0 20px #ffd700,
            0 0 40px #ffcc00,
            0 0 80px #ffcc00;
          animation: flicker 1.5s infinite alternate;
        }

        @keyframes flicker {
          0%   { opacity: 1; }
          50%  { opacity: 0.85; text-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffcc00; }
          100% { opacity: 1; }
        }
      `}</style>

      <div style={styles.overlay}></div>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col>
          <div style={styles.content}>
            <Space direction="vertical" size="large">
              <img
                src="/logo.svg"
                alt="Logo"
                style={{ height: "80px", objectFit: "contain" }}
              />

              {/* Tiêu đề LED màu vàng */}
              <Title level={1} className="led-title">
                TRƯA NAY ĂN GÌ ?
              </Title>

              <Paragraph style={styles.extraInfo}>
                Cuộc sống vội, công việc bận rộn, người không biết nấu ăn ngày
                càng tăng, kèm với đó nhu cầu mua sắm online ngày càng nhiều.
                Cùng với đó, các nhà hàng, quán ăn có diện tích nhỏ, sức chứa
                không nhiều hay muốn tăng các kênh bán hàng. Sản phẩm sinh ra
                giải quyết việc tìm các cửa hàng có món ăn ngon giá rẻ và đặt đồ
                ăn, nước uống chế biến sẵn giao đến tận tay khách hàng không cần
                đi lại nhiều.
              </Paragraph>

              <Paragraph style={styles.description}>
                Hãy để chúng tôi gợi ý cho bạn món ngon mỗi ngày
              </Paragraph>

              <Button
                type="primary"
                size="large"
                style={styles.button}
                onClick={handleExploreClick}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#c19a6b")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "#D2B48C")
                }
              >
                Khám phá ngay
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
      {loading && <LoadingCat />}
    </div>
  );
};

export default Intro;
