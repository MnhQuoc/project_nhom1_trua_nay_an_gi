import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';

const AddFoodItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    image: '',
    prepareTime: '',
    note: '',
    price: '',
    discountPrice: '',
    serviceFee: '',
    categories: ''
  });

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const [imagefood, setImagefood] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const uploadToCloudinary = async (file) => {
    const CLOUD_NAME = 'dr1ihrvvg';
    const UPLOAD_PRESET = 'TruaNayAnGi';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (!response.ok || !data.secure_url) throw new Error(data.error?.message || "Upload failed");
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image;
      if (imagefood) imageUrl = await uploadToCloudinary(imagefood);

      const data = {
        ...formData,
        prepareTime: parseInt(formData.prepareTime) || 0,
        price: parseFloat(formData.price),
        discountPrice: parseFloat(formData.discountPrice),
        serviceFee: parseFloat(formData.serviceFee) || 0,
        categories: formData.categories.split(',').map(c => c.trim()),
        image: imageUrl,
        views: 0,
        orders: 0,
        recommend: 0
      };

      await axios.post('http://localhost:3001/foods', data);
      setMessage('✅ Đã thêm món ăn thành công!');
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setMessage('❌ Thêm món ăn thất bại!');
      setIsSuccess(false);
    }
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <div className="container mt-5">
      <Card className="shadow-lg border-0">
        <Card.Header className="bg-primary text-white text-center">
          <h4>Thêm Món Ăn Mới</h4>
        </Card.Header>
        <Card.Body>
          {message && (
            <Alert variant={isSuccess ? 'success' : 'danger'}>{message}</Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>Ảnh món ăn *</Form.Label>
              <div className="d-flex align-items-center gap-3">
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setImagefood(file);
                      const previewUrl = URL.createObjectURL(file);
                      setFormData(prev => ({ ...prev, image: previewUrl }));
                    }
                  }}
                />
                <Button variant="outline-primary" onClick={() => document.getElementById('imageUpload').click()}>
                  <FaCamera className="me-2" /> Chọn ảnh
                </Button>
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="border rounded img-fluid object-fit-cover"
                    width="100"
                    height="100"
                  />
                )}
              </div>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Tên món ăn *</Form.Label>
                  <Form.Control type="text" value={formData.name} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Địa chỉ *</Form.Label>
                  <Form.Control type="text" value={formData.address} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="prepareTime">
                  <Form.Label>Thời gian chuẩn bị (phút)</Form.Label>
                  <Form.Control type="number" value={formData.prepareTime} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={8}>
                <Form.Group className="mb-3" controlId="note">
                  <Form.Label>Ghi chú</Form.Label>
                  <Form.Control as="textarea" rows={2} value={formData.note} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Giá tiền *</Form.Label>
                  <Form.Control type="number" value={formData.price} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="discountPrice">
                  <Form.Label>Giá khuyến mãi *</Form.Label>
                  <Form.Control type="number" value={formData.discountPrice} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="serviceFee">
                  <Form.Label>Phí dịch vụ (mặc định 0)</Form.Label>
                  <Form.Control type="number" value={formData.serviceFee} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4" controlId="categories">
              <Form.Label>Danh mục (ngăn cách bằng dấu phẩy) *</Form.Label>
              <Form.Control type="text" value={formData.categories} onChange={handleChange} required />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button type="submit" variant="success" className="px-4">Thêm món</Button>
              <Button variant="secondary" className="px-4" onClick={() => navigate('/listfood')}>Quay lại</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddFoodItem;
