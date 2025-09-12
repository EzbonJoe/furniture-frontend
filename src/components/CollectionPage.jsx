import {useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartContext.jsx';
import { formatCurrency } from '../utils/money.js';
import {useState, useEffect} from 'react';
import collectionApi from '../api/collectionApi.js';
import LoadingSpinner from './LoadingSpinner.jsx';


export default function CollectionPage(){
  const { key } = useParams();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await collectionApi.getCollectionByKey(key);
        setCollection(response.data);        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching collection:", error);
        setLoading(false);
      }
    }
    fetchCollection();
  }, [key]);

  const navigate = useNavigate();
  const { addToCart, addedMessages } = useCart();

  if (loading) return <LoadingSpinner />;
  if (!collection) return <h2>Collection not found</h2>;

  return(
    <div className="collection-page">
      <div className="collection-hero"
       style={{ background: `url(https://furniture-backend-msfk.onrender.com${collection.backgroundImage}) no-repeat center center/cover`}}
      >
        <h1>{collection.name}</h1>
        <p>{collection.description}</p>
      </div>

      <div className="collection-product-grid">
        {collection.products.map((product) => (
          <div key={product._id} className="collection-product-card"> 
            <img src={`https://furniture-backend-msfk.onrender.com${product.images[0]}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{formatCurrency(product.priceCents)}</p>
            <button className='view-more' onClick={() => navigate(`/productDetail/${product._id}`)}>View more details</button>
            {addedMessages[product._id] && (
                <div className={`added-to-cart ${addedMessages[product._id] ? 'show-message' : ''}`}>
                  <img src="/images/icons/checkmark.png" alt="Check" />
                  Added
                </div>
            )} 
            <button className='collection-addToCart' onClick={() => addToCart(product)}>Add to Cart</button> 
          </div>
        ))}
      </div>
    </div>
  )
}