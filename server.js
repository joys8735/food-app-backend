const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/config/database');

dotenv.config();

const app = express();

app.use(cors({ 
  origin: [
    'http://localhost:8080',    // Dev-режим фронта
    'http://localhost:5002',    // Локальный бэкенд
    'http://localhost:4173',    // Продакшен-режим фронта (npm run preview)
    'https://project-burger-two.vercel.app' // Vercel-домен
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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));