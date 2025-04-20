const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../models');
const { v4: uuidv4 } = require('uuid');

// Проверка подписи Telegram
function verifyTelegramData(data) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    throw new Error('TELEGRAM_BOT_TOKEN is not set');
  }
  const secret = crypto.createHash('sha256').update(botToken).digest();
  const dataCheckString = Object.keys(data)
    .filter(key => key !== 'hash')
    .sort()
    .map(key => `${key}=${data[key]}`)
    .join('\n');
  const computedHash = crypto.createHmac('sha256', secret)
    .update(dataCheckString)
    .digest('hex');
  return computedHash === data.hash;
}

// Telegram Auth
router.post('/telegram', async (req, res) => {
  try {
    const { id, first_name, username, photo_url, auth_date, hash } = req.body;

    // Проверяем подпись Telegram
    if (!verifyTelegramData(req.body)) {
      return res.status(401).json({ error: 'Invalid Telegram data' });
    }

    let user = await User.findOne({ where: { telegramId: id.toString() } });

    if (!user) {
      user = await User.create({
        id: uuidv4(),
        telegramId: id.toString(),
        name: first_name || username || 'Telegram User',
        email: null,
        balance: 25.0,
        rewards: 150,
        language: 'en'
      });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        balance: user.balance,
        rewards: user.rewards,
        language: user.language
      }
    });
  } catch (error) {
    console.error('Error in Telegram auth:', error.message, error.stack);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Get current user
router.get('/user', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      balance: user.balance,
      rewards: user.rewards,
      language: user.language
    });
  } catch (error) {
    console.error('Error fetching user:', error.message, error.stack);
    res.status(401).json({ error: 'Invalid token', details: error.message });
  }
});

module.exports = router;