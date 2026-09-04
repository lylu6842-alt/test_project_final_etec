import { Link } from 'react-router-dom'
import products from '../data/products.json'
import ProductCard from '../components/ProductCard.jsx'

function HomePage() {
  const featured = products.slice(0, 3)

  return (
    <div>
     <Slide>
  <h1>Welcome to Sample Shop</h1>
  <p>A fully working demo store — browse, search, and add items to your cart.</p>
  <Link to="/products" className="btn btn-primary">Shop Now</Link>
</Slide>

      <section className="section">
        <h2>Featured Products</h2>
        <div className="product-grid ">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
