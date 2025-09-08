import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/cartContext.jsx";
import { formatCurrency } from "../utils/money";
import LoadingSpinner from './LoadingSpinner';
import WishlistButton from './WishlistButton';

const ProductListingPage = () => {
  const navigate = useNavigate(); 
  const { addToCart, addedMessages, products, loading } = useCart(); 

  if (loading) return <LoadingSpinner />;  

  return (
    <div className="product-listing">
      <h1>Furniture Collection</h1>
      <div className="product-listing-product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-listing-product-card">
            <img src={`http://localhost:5000${product.images[0]}`} alt={product.name} /> 
            <h2>{product.name}</h2>
            <p>{formatCurrency(product.priceCents)}</p>
            <button onClick={() => navigate(`/productDetail/${product._id}`)} className="view-more">View more about product</button>
            {addedMessages[product._id] && (
                <div className={`added-to-cart ${addedMessages[product._id] ? 'show-message' : ''}`}>
                  <img src="/images/icons/checkmark.png" alt="Check" />
                  Added
                </div>
            )} 
            <button className="product-listing-addToCart " onClick={() => addToCart(product)}>Add to Cart</button>
            <WishlistButton productId={product._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;
