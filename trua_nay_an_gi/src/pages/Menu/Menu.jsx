import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useCart } from '../../contexts/CartContext';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [selectedMerchant, setSelectedMerchant] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    // Fetch all merchants
    fetch('http://localhost:3001/users?role=merchant&verified=true')
      .then(res => res.json())
      .then(data => {
        setMerchants(data);
        if (data.length > 0) {
          setSelectedMerchant(data[0].id); // Select first merchant by default
        }
      })
      .catch(error => console.error('Error fetching merchants:', error));
  }, []);

  useEffect(() => {
    // Fetch products for selected merchant
    if (selectedMerchant) {
      fetch(`http://localhost:3001/products?merchantId=${selectedMerchant}`)
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching products:', error));
    }
  }, [selectedMerchant]);

  const handleMerchantChange = (e) => {
    setSelectedMerchant(e.target.value);
  };

  return (
    <Container className="py-5">
      <Form.Group className="mb-4">
        <Form.Label>Chọn nhà hàng:</Form.Label>
        <Form.Select value={selectedMerchant} onChange={handleMerchantChange}>
          {merchants.map(merchant => (
            <option key={merchant.id} value={merchant.id}>
              {merchant.restname || `Nhà hàng ${merchant.id}`}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Row xs={1} md={2} lg={3} className="g-4">
        {products.map(product => (
          <Col key={product.id}>
            <Card>
              {product.image && (
                <Card.Img variant="top" src={product.image} alt={product.name} />
              )}
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  {product.description}
                  <br />
                  <strong>Giá: {product.price.toLocaleString('vi-VN')}đ</strong>
                </Card.Text>
                <Button variant="primary" onClick={() => addToCart(product)}>
                  Thêm vào giỏ hàng
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Menu;