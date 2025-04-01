const bedrockService = require('../services/bedrockService');
const logger = require('../utils/logger');

/**
 * Chat controller for handling conversation interactions
 */
const chatController = {
  /**
   * Process a chat message and generate a response
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async processMessage(req, res) {
    try {
      const { message, options } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }
      
      logger.info(`Processing message: ${message.substring(0, 50)}...`);
      
      const response = await bedrockService.generateResponse(message, options);
      
      return res.status(200).json({
        response,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error(`Error in processMessage: ${error.message}`);
      return res.status(500).json({ error: 'Failed to process message' });
    }
  },
  
  /**
   * Get health status of the chat service
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getHealth(req, res) {
    return res.status(200).json({
      status: 'healthy',
      service: 'promptwave-chat',
      timestamp: new Date().toISOString()
    });
  }
};

module.exports = chatController;