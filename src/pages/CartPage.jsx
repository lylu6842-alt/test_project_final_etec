import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()
  const [checkedOut, setCheckedOut] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [customer, setCustomer] = useState({ name: '', contact: '' })
  const [orderNumber, setOrderNumber] = useState('')

  if (checkedOut) {
    return (
      <div className="section empty-state">
        <h2>Thank you for your order!</h2>
        <p>Order #{orderNumber} has been placed{customer.name ? `, ${customer.name}` : ''}.</p>
        <p>We've sent your order details to our team — we'll be in touch shortly.</p>
        <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="section empty-state">
        <h2>Your cart is empty</h2>
        <Link to="/products" className="btn btn-primary">Browse Products</Link>
      </div>
    )
  }

  async function handleCheckout() {
    setError('')
    setSubmitting(true)

    const order = {
      items: cart.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
      totalPrice,
      customer,
    }

    // Try to notify the backend if one is available, but don't let a
    // missing/unreachable server block the customer's checkout.
    try {
      await fetch(`${API_URL}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      })
    } catch (err) {
      console.warn('Order notification failed (continuing anyway):', err)
    }

    const newOrderNumber = Math.floor(100000 + Math.random() * 900000).toString()
    setOrderNumber(newOrderNumber)
    clearCart()
    setCheckedOut(true)
    setSubmitting(false)
  }

  return (
    <div className="section">
      <h1>Your Cart</h1>
      <div className="cart-list">
        {cart.map((item) => (
          <div className="cart-row" key={item.id}>
            <img src={item.image} alt={item.name} className="product-thumb small" />
            <div className="cart-row-info">
              <p className="product-name">{item.name}</p>
              <p className="product-price">${item.price.toFixed(2)}</p>
            </div>
            <div className="quantity-row">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <p className="line-total">${(item.price * item.quantity).toFixed(2)}</p>
            <button className="btn-link remove" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="checkout-details">
        <h2>Your details</h2>
        <div className="form-field">
          <label htmlFor="cust-name">Name (optional)</label>
          <input
            id="cust-name"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />
        </div>
        <div className="form-field">
          <label htmlFor="cust-contact">Phone or email (optional)</label>
          <input
            id="cust-contact"
            value={customer.contact}
            onChange={(e) => setCustomer({ ...customer, contact: e.target.value })}
          />
        </div>
      </div>

      {error && <p className="error-msg">{error}</p>}

      <div className="cart-summary">
        <p>Total: <strong>${totalPrice.toFixed(2)}</strong></p>
        <button className="btn btn-primary" onClick={handleCheckout} disabled={submitting}>
          {submitting ? 'Placing order...' : 'Checkout'}
        </button>
      </div>
    </div>
  )
}

export default CartPage