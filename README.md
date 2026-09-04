# Sample Shop

A complete React sample website with core e-commerce functions working end to end, including a Telegram checkout notification.

## Features
- **Routing** — Home, Products, Product Detail, Cart, About, Contact (React Router)
- **Product listing** — grid of products pulled from `src/data/products.json`
- **Search & category filter** — live filtering on the Products page
- **Product detail page** — quantity selector, add to cart
- **Shopping cart** — add / remove / update quantity, persisted to `localStorage`
- **Checkout → Telegram** — placing an order sends the order details to a Telegram group via a small backend
- **Contact form** — client-side validation and submit confirmation
- **Responsive navbar** — cart item count badge, mobile hamburger menu

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Create a Telegram bot
1. Open Telegram, message **@BotFather**, send `/newbot`, and follow the prompts.
2. BotFather gives you a **bot token** — copy it.
3. Add your new bot to the Telegram group you want order notifications sent to.
4. In that group, send any message, then visit this URL in your browser
   (replace `<TOKEN>` with your bot token):
   `https://api.telegram.org/bot<TOKEN>/getUpdates`
5. Look for `"chat":{"id": ...}` in the response — negative numbers are normal for groups.
   That number is your **chat ID**.

### 3. Configure environment variables
Copy `.env.example` to `.env` and fill in the values:
```bash
cp .env.example .env
```
```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_group_chat_id_here
PORT=3001
```

### 4. Run it
Run both the frontend and the backend together:
```bash
npm run dev:all
```
Or separately in two terminals:
```bash
npm run server   # backend on http://localhost:3001
npm run dev      # frontend on http://localhost:5173
```

Open the frontend URL, add items to your cart, and check out — you should see the order appear in your Telegram group.

## Project structure
```
server/
  index.js      Express backend — POST /api/checkout forwards order to Telegram
src/
  components/   Navbar, Footer, ProductCard
  context/      CartContext (global cart state)
  data/         products.json (sample product data)
  pages/        HomePage, ProductsPage, ProductDetailPage, CartPage, AboutPage, ContactPage
  App.jsx       Route definitions
  main.jsx      Entry point, wraps app in Router + CartProvider
  index.css     All styling
.env.example    Copy to .env and fill in your Telegram bot token + chat ID
```

## Notes
- The bot token lives only on the backend (`server/index.js` reads it from `.env`) — it's never sent to the browser. Never put a Telegram bot token directly in frontend code.
- `VITE_API_URL` can be set in a `.env` file (frontend-readable, must be prefixed `VITE_`) if your backend runs somewhere other than `http://localhost:3001`.

## Extending it
- Add more products in `src/data/products.json`
- Swap the color-block thumbnails for real images by adding an `image` field and using `<img>` instead of the colored `div`
- Add real payment processing before the Telegram notification step in `server/index.js`
