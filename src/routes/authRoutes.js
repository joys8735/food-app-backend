const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../models');
const { v4: uuidv4 } = require('uuid');

router.get('/test', (req, res) => {
  console.log('Accessed /api/auth/test');
  res.json({ message: 'Auth routes are working!' });
});

function verifyTelegramData(data) {
  console.log('Verifying Telegram data:', data);
  return true; // Временно отключаем проверку подписи
  /*
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
  console.log('Data check string:', dataCheckString);
  const computedHash = crypto.createHmac('sha256', secret)
    .update(dataCheckString)
    .digest('hex');
  console.log('Computed hash:', computedHash, 'Received hash:', data.hash);
  return computedHash === data.hash;
  */
}

router.post('/telegram', async (req, res) => {
  try {
    console.log('Received Telegram auth request:', req.body);
    const { id, first_name, username, photo_url, auth_date, hash } = req.body;

    if (!id || !auth_date || !hash) {
      console.log('Missing required fields:', { id, auth_date, hash });
      return res.status(400).json({ error: 'Missing required Telegram data' });
    }

    if (!verifyTelegramData(req.body)) {
      console.log('Invalid Telegram signature');
      return res.status(401).json({ error: 'Invalid Telegram data' });
    }

    let user = await User.findOne({ where: { telegramId: id.toString() } });

    if (!user) {
      const userName = first_name || username || 'Telegram User';
      user = await User.create({
        id: uuidv4(),
        telegramId: id.toString(),
        name: userName,
        email: null,
        balance: 25.0,
        rewards: 150,
        language: 'en'
      });
      console.log('Created new user:', user.id);
    } else {
      console.log('Found existing user:', user.id);
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