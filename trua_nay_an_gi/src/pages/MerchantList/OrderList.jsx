import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, Button, Table, Form } from "react-bootstrap";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const API_URL = "http://localhost:3001/orders";

  const fetchOrders = async () => {
    try {
      const response = await axios.get(API_URL);
      setOrders(response.data);
    } catch (error) {
      console.error("Lỗi khi tải đơn hàng:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChangeStatus = (orderId, newStatus) => {
    setSelectedOrderId(orderId);
    setSelectedStatus(newStatus);
    setShowModal(true);
  };

  const handleConfirmChange = async () => {
    try {
      await axios.patch(`${API_URL}/${selectedOrderId}`, { status: selectedStatus });
      fetchOrders();
    } catch (error) {
      console.error("Lỗi khi cập nhật đơn hàng:", error);
    } finally {
      setShowModal(false);
    }
  };

  const isStatusDisabled = (currentStatus, targetStatus) => {
    if (currentStatus === "Hủy" || currentStatus === "Đã hoàn thành") {
      return true;
    }
    if (currentStatus === "Đã nhận món" && targetStatus === "Hủy") {
      return true;
    }
    if (currentStatus === "Hủy" && targetStatus !== "Hủy") {
      return true;
    }
    return false;
  };

  return (
    <div className="container p-4">
      <h1
        className="text-center mb-4 p-2"
        style={{ backgroundColor: "#c58d4e", color: "white", borderRadius: "8px" }}
      >
        Danh sách đơn hàng
      </h1>
      <Table bordered striped>
        <thead style={{ backgroundColor: "#f5e6d0" }}>
          <tr>
            <th>Mã đơn</th>
            <th>Thời gian đặt</th>
            <th>Người đặt</th>
            <th>Tổng món</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.createdAt).toLocaleString("vi-VN")}</td>
              <td>{order.username || order.userId}</td>
              <td>{order.items.length}</td>
              <td>{order.totalAmount.toLocaleString("vi-VN")} VND</td>
              <td>
                <Form.Select
                  value={order.status}
                  onChange={(e) => handleChangeStatus(order.id, e.target.value)}
                >
                  {["Chờ nhận hàng", "Đang chế biến", "Đã nhận món", "Đang giao", "Đã hoàn thành", "Hủy"].map(
                    (status) => (
                      <option key={status} value={status} disabled={isStatusDisabled(order.status, status)}>
                        {status}
                      </option>
                    )
                  )}
                </Form.Select>
              </td>
              <td>
                <Link
                  to={`/orderdetail/${order.id}`}
                  className="btn btn-info rounded-pill w-100 text-center"
                >
                  Xem chi tiết
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận thay đổi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn chuyển trạng thái đơn hàng <strong>#{selectedOrderId}</strong> sang
          <strong style={{ color: "#c58d4e" }}> {selectedStatus}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="warning" onClick={handleConfirmChange}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderList;
