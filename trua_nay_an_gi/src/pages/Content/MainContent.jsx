import React, {useState} from "react";
import "./MainContent.css";

const products1 = [
    {
        id: 1,
        name: "Socola Nims giòn tan chảy hàng nhập khẩu",
        price: "105.000",
        location: "TP. Hồ Chí Minh",
        image: "https://tse3.mm.bing.net/th?id=OIP.0AaGpmGFJyhgnrIBYgz9YAHaEk&pid=Api&P=0&h=220",
        rating: 4.9,

    },
    {
        id: 2,
        name: "Bò Miếng Hàng Đại Gói 40 Miếng Cay",
        price: "14.300",
        location: "Hà Nội",
        image: "https://tse3.mm.bing.net/th?id=OIP.0AaGpmGFJyhgnrIBYgz9YAHaEk&pid=Api&P=0&h=220",
        rating: 4.9,

    },
    {
        id: 3,
        name: "Kitkat Socola Nội Địa Nhật",
        price: "75.000",

        location: "Hà Nội",
        image: "https://tse3.mm.bing.net/th?id=OIP.0AaGpmGFJyhgnrIBYgz9YAHaEk&pid=Api&P=0&h=220",
        rating: 4.9,

    },
    {
        id: 4,
        name: "Canh Riêu Tôm Ăn Liền I-Soup 42g",
        price: "68.000",

        location: "Đồng Nai",
        image: "https://tse3.mm.bing.net/th?id=OIP.0AaGpmGFJyhgnrIBYgz9YAHaEk&pid=Api&P=0&h=220",
        rating: 4.9,

    },
    {
        id: 5,
        name: "Combo Bánh Tráng Muối Tép Hành Phi",
        price: "63.000",
        location: "Ninh Thuận",
        image: "https://tse3.mm.bing.net/th?id=OIP.0AaGpmGFJyhgnrIBYgz9YAHaEk&pid=Api&P=0&h=220",
        rating: 4.7,
    },
    {
        id: 5,
        name: "Combo Bánh Tráng Muối Tép Hành Phi",
        price: "63.000",
        location: "Ninh Thuận",
        image: "https://tse3.mm.bing.net/th?id=OIP.0AaGpmGFJyhgnrIBYgz9YAHaEk&pid=Api&P=0&h=220",
        rating: 4.7,
    },
    {
        id: 5,
        name: "Combo Bánh Tráng Muối Tép Hành Phi",
        price: "63.000",
        location: "Ninh Thuận",
        image: "https://tse3.mm.bing.net/th?id=OIP.0AaGpmGFJyhgnrIBYgz9YAHaEk&pid=Api&P=0&h=220",
        rating: 4.7,
    },
    {
        id: 5,
        name: "Combo Bánh Tráng Muối Tép Hành Phi",
        price: "63.000",
        location: "Ninh Thuận",
        image: "https://tse3.mm.bing.net/th?id=OIP.0AaGpmGFJyhgnrIBYgz9YAHaEk&pid=Api&P=0&h=220",
        rating: 4.7,
    },
    {
        id: 5,
        name: "Combo Bánh Tráng Muối Tép Hành Phi",
        price: "63.000",
        location: "Ninh Thuận",
        image: "https://tse3.mm.bing.net/th?id=OIP.0AaGpmGFJyhgnrIBYgz9YAHaEk&pid=Api&P=0&h=220",
        rating: 4.7,
    },
    {
        id: 1,
        name: 'Bánh Tráng Cuốn Thịt Heo Hoàng Bèo',
        price: '30.000đ - 100.000đ',
        image: 'https://tse3.mm.bing.net/th?id=OIP.0AaGpmGFJyhgnrIBYgz9YAHaEk&pid=Api&P=0&h=220',
        address: '40 Duy Tân, Quận Cầu Giấy, Hà Nội',
        phone: '+91 01234-56789, +91 01234-56789',
        openTime: 'Today 11am - 5pm, 6pm - 11pm',
        status: 'OPEN NOW',
        description: 'Ba mẹ cho bạc cho vàng 🌟, KHÔNG BẰNG NHẬN ĐƯỢC KHÍ ĐÁNH 5⭐️...'
    }
];

const MainContent = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(products1.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = products1.slice(startIndex, startIndex + itemsPerPage);

    const handleImageClick = (products1) => {
        setSelectedProduct(products1);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <>
            <h2 style={{ color: 'black', textAlign: 'center' }}>Deal hot trong ngày</h2>
            <div className="flash-sale-section">
                <div className="flash-sale-header">
                    <select className="dropdown-filter">
                        <option>Danh mục</option>
                        <option>Cơm</option>
                        <option>Bánh mỳ</option>
                        <option>Phở</option>
                    </select>
                </div>

                {/* Grid sản phẩm */}
                <div className="product-grid">
                    {currentProducts.map((item) => (
                        <div className="product-card-grid" key={item.id + Math.random()}>
                            <div className="image-wrap">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    onClick={() => handleImageClick(item)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                            <div className="product-name">{item.name}</div>
                            <div className="product-price">₫{item.price}</div>
                            <div className="rating">⭐ {item.rating}</div>
                            <div className="location">{item.location}</div>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
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
                            <p><strong>Địa chỉ:</strong> {selectedProduct.address}</p>
                            <p><strong>Điện thoại:</strong> {selectedProduct.phone}</p>
                            <p><strong>Giá:</strong> {selectedProduct.price}</p>
                            <p><strong>Giờ mở cửa:</strong> {selectedProduct.openTime} <span className="open-status">{selectedProduct.status}</span></p>
                            <p>{selectedProduct.description}</p>
                            <button onClick={closeModal} className="close-button">Đóng</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default MainContent;
