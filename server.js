const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/config/database');

dotenv.config();

const app = express();

app.use(cors({ 
  origin: [
    'http://localhost:8080',
    'http://localhost:5002',
    'http://localhost:4173',
    'https://project-burger-two.vercel.app',
    'https://food-app-backend-production-c1bf.up.railway.app'
  ] 
}));
app.use(express.json());

app.get('/', (req, res) => res.send('Server is running'));

const categoryRoutes = require('./src/routes/categoryRoutes');
const bannerRoutes = require('./src/routes/bannerRoutes');
const productRoutes = require('./src/routes/productRoutes');

app.use('/api/categories', categoryRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/products', productRoutes);

sequelize
  .authenticate()
  .then(() => console.log('PostgreSQL connected'))
  .catch(err => console.error('PostgreSQL connection error:', err));

const PORT = process.env.PORT || 5002;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));