import React from "react";
import { Typography, Button, Row, Col, Space } from "antd";
import { useNavigate } from "react-router"; // Thêm dòng này
import LoadingCat from "./Loading"
import  { useState } from "react";
const { Title, Paragraph } = Typography;

const styles = {
  wrapper: {
    backgroundImage: "url('https://t4.ftcdn.net/jpg/02/92/20/37/360_F_292203735_CSsyqyS6A4Z9Czd4Msf7qZEhoxjpzZl1.jpg')", // Cập nhật ảnh mới
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
  title: {
    color: "#D2B48C",
    fontSize: "3.5rem",
    marginBottom: "1rem",
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
  const navigate = useNavigate(); // Khởi tạo navigate
  const [loading, setLoading] = useState(false);
  const handleExploreClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/home"); 
    }, 1500); 
  };
  return (
    <div style={styles.wrapper}>
      <div style={styles.overlay}></div>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col>
          <div style={styles.content}>
            <Space direction="vertical" size="large">
              <Title level={1} style={styles.title}>Trưa nay ăn gì?</Title>
             
              <Paragraph style={styles.extraInfo}>
                Cuộc sống vội, công việc bận rộn, người không biết nấu ăn ngày càng tăng,
                kèm với đó nhu cầu mua sắm online ngày càng nhiều. Cùng với đó, các nhà hàng,
                quán ăn có diện tích nhỏ, sức chứa không nhiều hay muốn tăng các kênh bán hàng.
                Sản phẩm sinh ra giải quyết việc tìm các cửa hàng có món ăn ngon giá rẻ và đặt đồ ăn,
                nước uống chế biến sẵn giao đến tận tay khách hàng không cần đi lại nhiều.
              </Paragraph>
              <Paragraph style={styles.description}>
                Hãy để chúng tôi gợi ý cho bạn món ngon mỗi ngày
              </Paragraph>
              <Button
                type="primary"
                size="large"
                style={styles.button}
                onClick={handleExploreClick} // Gọi hàm khi click
                onMouseOver={(e) => (e.target.style.backgroundColor = "#c19a6b")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#D2B48C")}
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
