import React from 'react';
import './About.css';
import MainContent from "../Content/MainContent.jsx";
import '../Content/MainContent.css'
const products = [
  {
    id: 1,
    name: 'Demo',
    price: '164.000',
    image: 'https://tse3.mm.bing.net/th?id=OIP.0AaGpmGFJyhgnrIBYgz9YAHaEk&pid=Api&P=0&h=220',

  },
  {
    id: 2,
    name: 'Demo',
    price: '949.000',
    image: 'https://tse3.mm.bing.net/th?id=OIP.0AaGpmGFJyhgnrIBYgz9YAHaEk&pid=Api&P=0&h=220',

  },
  {
    id: 3,
    name: 'Demo',
    price: '11.490.000',
    image: 'https://tse3.mm.bing.net/th?id=OIP.0AaGpmGFJyhgnrIBYgz9YAHaEk&pid=Api&P=0&h=220',

  },
  {
    id: 3,
    name: 'Demo',
    price: '11.490.000',
    image: 'https://tse3.mm.bing.net/th?id=OIP.0AaGpmGFJyhgnrIBYgz9YAHaEk&pid=Api&P=0&h=220',

  },
  {
    id: 3,
    name: 'Demo',
    price: '11.490.000',
    image: 'https://tse3.mm.bing.net/th?id=OIP.0AaGpmGFJyhgnrIBYgz9YAHaEk&pid=Api&P=0&h=220',

  },{
    id: 3,
    name: 'Demo',
    price: '11.490.000',
    image: 'https://tse3.mm.bing.net/th?id=OIP.0AaGpmGFJyhgnrIBYgz9YAHaEk&pid=Api&P=0&h=220',

  },
  {
    id: 3,
    name: 'Demo',
    price: '11.490.000',
    image: 'https://tse3.mm.bing.net/th?id=OIP.0AaGpmGFJyhgnrIBYgz9YAHaEk&pid=Api&P=0&h=220',

  },
  {
    id: 3,
    name: 'Demo',
    price: '11.490.000',
    image: 'https://tse3.mm.bing.net/th?id=OIP.0AaGpmGFJyhgnrIBYgz9YAHaEk&pid=Api&P=0&h=220',

  },
  {
    id: 3,
    name: 'Demo',
    price: '11.490.000',
    image: 'https://tse3.mm.bing.net/th?id=OIP.0AaGpmGFJyhgnrIBYgz9YAHaEk&pid=Api&P=0&h=220',

  },
  {
    id: 3,
    name: 'Demo',
    price: '11.490.000',
    image: 'https://tse3.mm.bing.net/th?id=OIP.0AaGpmGFJyhgnrIBYgz9YAHaEk&pid=Api&P=0&h=220',

  }

];

const About = () => {

  return (
   <>
     <div className="flash-sale-section">
       <div className="flash-sale-header">
         <h2 style={{color:"white"}}>Top món ăn được yêu thích</h2>
         <a style={{color:"white"}} href="#" className="view-all">Xem tất cả &gt;</a>
       </div>
       <div className="product-list">
         {products.map(product => (
             <div className="product-card" key={product.id}>
               <img src={product.image} alt={product.name} />
               <p>{product.name}</p>
               <p className="price">₫ {product.price}</p>
             </div>
         ))}
       </div>
     </div>
     <div>
       <MainContent/>
     </div>


   </>
  );
};

export default About;
