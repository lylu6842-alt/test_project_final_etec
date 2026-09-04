import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import logo from '../assets/logo.svg'

function Navbar() {
  const { totalItems } = useCart()
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) => 'nav-link' + (isActive ? ' active' : '')

  // Lock background scroll while the slide-out menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function closeMenu() {
    setOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand" onClick={closeMenu}>
          <img src={logo} alt="Sample Shop logo" className="brand-logo" />
          Sample Shop
        </NavLink>

        <button
          className="menu-toggle"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>

        {/* Desktop links */}
        <div className="nav-links">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/products" className={linkClass}>Products</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          <NavLink to="/cart" className="nav-link cart-link">
            Cart
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </NavLink>
        </div>
      </div>

      {/* Overlay behind the slide-out drawer */}
      <div
        className={'nav-overlay' + (open ? ' open' : '')}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Slide-out mobile drawer */}
      <div className={'nav-drawer' + (open ? ' open' : '')}>
        <button className="drawer-close" onClick={closeMenu} aria-label="Close menu">
          ✕
        </button>
        <div className="drawer-brand">
          <img src={logo} alt="Sample Shop logo" className="brand-logo" />
          Sample Shop
        </div>
        <NavLink to="/" className={linkClass} onClick={closeMenu}>Home</NavLink>
        <NavLink to="/products" className={linkClass} onClick={closeMenu}>Products</NavLink>
        <NavLink to="/about" className={linkClass} onClick={closeMenu}>About</NavLink>
        <NavLink to="/contact" className={linkClass} onClick={closeMenu}>Contact</NavLink>
        <NavLink to="/cart" className="nav-link cart-link" onClick={closeMenu}>
          Cart
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
