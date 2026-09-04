import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import products from '../data/products.json'
import { useCart } from '../context/CartContext.jsx'

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const product = products.find((p) => String(p.id) === id)

  if (!product) {
    return (
      <div className="section">
        <h2>Product not found</h2>
        <Link to="/products" className="btn btn-primary ">Back to Products</Link>
      </div>
    )
  }

  function handleAdd() {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="section product-detail w-full h-full">
<Link to="/products" className="back-link">← Back</Link>
      <div className="product-detail-grid">
        <img
          src={product.image}
          alt={product.name}
          className="product-thumb large"
        />
        <div>
          <h1>{product.name}</h1>
          <p className="product-category">{product.category}</p>
          <p className="product-price large">${product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          <p className="stock">{product.stock} in stock</p>

          <div className="quantity-row">
            <label htmlFor="qty">Quantity</label>
            <input
              id="qty"
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            />
          </div>

          <button className="btn btn-primary" onClick={handleAdd}>
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
