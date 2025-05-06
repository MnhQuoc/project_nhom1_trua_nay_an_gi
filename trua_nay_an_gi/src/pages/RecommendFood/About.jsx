import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import axios from 'axios';
import MainContent from '../Content/MainContent';

const About = () => {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:3001/foods')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Lỗi khi fetch foods:', err));
  }, []);

  const scrollLeft = () => scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });

  return (
    <>
      <div className="flash-sale-section">
        <div className="flash-sale-header">
          <h2>Top món ăn được yêu thích</h2>
          <a href="#" className="view-all">Xem tất cả &gt;</a>
        </div>

        <div className="scroll-container">
          <button className="scroll-btn left" onClick={scrollLeft}>❮</button>
          <div className="product-list" ref={scrollRef}>
            {products.map(product => (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt={product.name} />
                <p className="product-name">{product.name}</p>
                <p className="price"> {product.price.toLocaleString()}₫</p>
              </div>
            ))}
          </div>
          <button className="scroll-btn right" onClick={scrollRight}>❯</button>
        </div>
      </div>

      <MainContent />
    </>
  );
};

export default About;
