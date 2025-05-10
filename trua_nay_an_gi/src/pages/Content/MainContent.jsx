import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MainContent.css";
import axios from "axios";

const MainContent = () => {
  const location = useLocation();
  const title = location.state?.title || "Deal hot trong ngày";

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedLocation, setSelectedLocation] = useState("Tất cả");

  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get("http://localhost:3001/foods")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Lỗi khi tải dữ liệu món ăn:", error));
  }, []);

  const handleImageClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === "Tất cả" ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchLocation =
      selectedLocation === "Tất cả" ||
      p.location?.toLowerCase() === selectedLocation.toLowerCase();
    return matchCategory && matchLocation;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <h2 className="deal-title">{title}</h2>
      <div className="flash-sale-section">
        <div className="flash-sale-header">
          <div className="filter-bar d-flex gap-3">
            <select className="dropdown-filter" onChange={handleCategoryChange}>
              <option value="Tất cả">Tất cả món</option>
              <option value="cơm">Cơm</option>
              <option value="bánh mì">Bánh mì</option>
              <option value="phở">Phở</option>
            </select>

            <select className="dropdown-filter" onChange={handleLocationChange}>
              <option value="Tất cả">Tất cả địa điểm</option>
              <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Cần Thơ">Cần Thơ</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Huế">Huế</option>
              <option value="Vĩnh Long">Vĩnh Long</option>
              <option value="Vũng Tàu">Vũng Tàu</option>
              <option value="Quảng Nam">Quảng Nam</option>
              <option value="Long An">Long An</option>
            </select>
          </div>
        </div>

        <div className="product-grid">
          {currentProducts.map((item) => (
            <div
              className="product-card-grid"
              key={item.id}
              onClick={() => handleImageClick(item)}
            >
              <div className="image-wrap">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="product-name">{item.name}</div>
              <div className="product-price">₫{item.price.toLocaleString()}</div>
              <div className="rating">⭐ {item.rating || "4.9"}</div>
              <div className="location">{item.location || "Đang cập nhật"}</div>
            </div>
          ))}
        </div>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {selectedProduct && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>{selectedProduct.name}</h2>
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              <p>
                <strong>Nhà hàng:</strong> {selectedProduct.restname || "Chưa cập nhật"}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {selectedProduct.address || "Chưa có"}
              </p>
              <p>
                <strong>Điện thoại:</strong> {selectedProduct.phone || "Chưa có"}
              </p>
              <p>
                <strong>Giá:</strong> {selectedProduct.price.toLocaleString()}₫
              </p>
              <p>
                <strong>Giờ mở cửa:</strong> {selectedProduct.openTime || "Chưa rõ"}{" "}
                <span className="open-status">{selectedProduct.status || "OPEN"}</span>
              </p>
              <p>{selectedProduct.description || "Không có mô tả."}</p>
              <button onClick={closeModal} className="close-button">
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MainContent;
