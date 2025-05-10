import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from 'react-icons/fa';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Rate } from 'antd';

const FoodDetail = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/foods/${id}`);
        setFood(res.data);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu:', err);
      }
    };

    fetchData();
  }, [id]);

  if (!food) {
    return (
      <Container className="text-center mt-5">
        <h5>Đang tải dữ liệu...</h5>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow rounded">
            <Card.Img
              variant="top"
              src={food.image || 'https://via.placeholder.com/500x500'}
              alt={food.name}
              className="img-fluid"
            />
            <Card.Body>
              {/* ✅ Tên nhà hàng nổi bật */}
              <p className="fw-bold text-warning fs-5 mb-2">
                {food.restname ? `🏠 ${food.restname}` : ''}
              </p>

              <Card.Title className="fs-2 fw-bold">{food.name}</Card.Title>

              {/* ⭐️ Đánh giá */}
              <div className="mb-3">
                <Rate disabled allowHalf defaultValue={food.rating || 0} />
                <span className="text-muted ms-2">
                  {food.rating ? `${food.rating}/5` : 'Chưa có đánh giá'}
                </span>
              </div>

              <p>
                <FaMapMarkerAlt className="text-danger me-2" />
                {food.location}, {food.address}
              </p>
              <p>
                <FaPhoneAlt className="text-success me-2" />
                {food.phone}
              </p>
              <p className="fs-4 text-danger fw-bold">
                {food.price}đ{' '}
                {food.discountPrice > 0 && (
                  <span className="text-muted text-decoration-line-through ms-2 fs-6">
                    {food.discountPrice}đ
                  </span>
                )}
              </p>
              <p>
                <FaClock className="text-primary me-2" />
                {food.openTime}
                {food.status?.toLowerCase() === 'open' && (
                  <Badge bg="success" className="ms-3">
                    Đang mở
                  </Badge>
                )}
              </p>

              <hr />
              <p className="mt-3">{food.description}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FoodDetail;
