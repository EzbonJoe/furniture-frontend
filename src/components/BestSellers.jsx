import { useNavigate } from 'react-router-dom';


const products = [
  {
    id: 1,
    name: 'Modern Fabric Sofa',
    price: '$499',
    image: '/images/sofa1.jpg',
  },
  {
    id: 2,
    name: 'Oak Dining Table',
    price: '$899',
    image: '/images/officeChair.jpg'
  },
  {
    id: 3,
    name: 'Ergonomic Office Chair',
    price: '$199',
    image: '/images/oakTable.jpg',
  },
  {
    id: 4,
    name: 'Queen Bed Frame',
    price: '$699',
    image: '/images/queenBed.jpg'
  },
];


function BestSellers() {  
  const navigate = useNavigate();

  return (
    <section className="best-section">
      <div className="best-container">
        <h2 className="best-title">Best Sellers</h2>
        <div className="best-seller-product-grid">
          {products.map((product) => (
            <div key={product.id} className="best-seller-product-card">
              <img
                src={product.image}
                alt={product.name}
                className="best-seller-product-image"
              />
              <h3 className="best-seller-product-name">{product.name}</h3>
              <p className="best-seller-product-price">{product.price}</p>
              <button onClick={() => navigate(`/productDetail/${product.id}`)} className="best-seller-product-button">View Product</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BestSellers;