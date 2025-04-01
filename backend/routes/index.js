const express = require('express');
const chatController = require('../controllers/chatController');

const router = express.Router();

// Chat routes
router.post('/chat', chatController.processMessage);
router.get('/health', chatController.getHealth);

module.exports = router;