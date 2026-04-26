const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://your-vercel-url.vercel.app'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' })); // 10mb for image uploads

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Routes
app.use('/api/auth',    require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart',    require('./routes/cart'));
app.use('/api/orders',  require('./routes/orders'));
app.use('/api/ai',      require('./routes/ai'));

// Health check
app.get('/', (req, res) => res.json({ status: '🚀 Pearl API running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));