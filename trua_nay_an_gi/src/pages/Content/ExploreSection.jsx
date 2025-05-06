import React from "react";

const ExploreSection = () => {
  const exploreItems = [
    { src: "/images/hinhoffer.png", alt: "Món ăn giảm giá" },
    { src: "/images/hinhoffer2.png", alt: "Nhà hàng mới" },
    { src: "/images/hinhoffer3.png", alt: "Đề xuất hôm nay" },
    { src: "/images/hinhoffer4.png", alt: "Top được yêu thích" },
  ];

  return (
    <div className="explore-section">
      <h3>Khám phá thêm</h3>
      <div className="explore-wrapper">
      {exploreItems.map((item, idx) => (
        <div key={idx} className="explore-item">
        <img src={item.src} alt={item.alt} />
        <div className="explore-overlay">{item.alt}</div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default ExploreSection;
