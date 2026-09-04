import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-thumb-link">
        <img
          src={product.image}
          alt={product.name}
          className="product-thumb"
          loading="lazy"
        />
      </Link>
      <div className="product-info">
        <Link to={`/products/${product.id}`} className="product-name">
          {product.name}
        </Link>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button className="btn btn-primary" onClick={() => addToCart(product, 1)}>
          Add to Cart
        </button>
      </div>
    </div>

    
  )
}

export default ProductCard
