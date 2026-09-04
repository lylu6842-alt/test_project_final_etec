import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())

const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, PORT = 3001 } = process.env

app.post('/api/checkout', async (req, res) => {
  const { items, totalPrice, customer } = req.body || {}

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'No items in order' })
  }

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in .env')
    return res.status(500).json({ error: 'Server is not configured for Telegram notifications' })
  }

  const lines = items.map(
    (i) => `• ${i.name} x${i.quantity} — $${(i.price * i.quantity).toFixed(2)}`
  )

  const text = [
    '🛒 *New Order*',
    customer?.name ? `Customer: ${customer.name}` : null,
    customer?.contact ? `Contact: ${customer.contact}` : null,
    '',
    ...lines,
    '',
    `*Total: $${Number(totalPrice).toFixed(2)}*`,
  ]
    .filter(Boolean)
    .join('\n')

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'Markdown',
        }),
      }
    )

    const data = await tgRes.json()

    if (!data.ok) {
      console.error('Telegram API error:', data)
      return res.status(502).json({ error: 'Telegram API rejected the message', details: data })
    }

    res.json({ success: true })
  } catch (err) {
    console.error('Failed to reach Telegram API:', err)
    res.status(502).json({ error: 'Failed to reach Telegram API' })
  }
})

app.listen(PORT, () => {
  console.log(`Checkout server running on http://localhost:${PORT}`)
})
