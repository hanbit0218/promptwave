// Simple Free Chatbot using Hugging Face Inference API
// Required dependencies:
// npm install express cors dotenv axios

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001; // Changed to 3001 to avoid conflict with React's dev server

// Middleware
app.use(cors());
app.use(express.json());

// Available free models
const AVAILABLE_MODELS = {
  "gemma-2b": "google/gemma-2-2b-it", // Small instruction-tuned model
  "zephyr": "HuggingFaceH4/zephyr-7b-beta", // Good open source model
  "mistral": "mistralai/Mistral-7B-Instruct-v0.2" // Another good open source model
};

// Default model
const DEFAULT_MODEL = "google/gemma-2-2b-it";

// Routes
app.post('/chat', async (req, res) => {
  try {
    const { message, conversation_history = [], model_choice = "gemma-2b" } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Get model ID based on selection (or use default)
    const modelId = AVAILABLE_MODELS[model_choice] || DEFAULT_MODEL;
    
    // Create a prompt from conversation history
    let prompt = "";
    
    // Format conversation history into a prompt the model can understand
    if (conversation_history.length > 0) {
      for (const msg of conversation_history) {
        if (msg.role === 'user') {
          prompt += `User: ${msg.content}\n`;
        } else if (msg.role === 'assistant') {
          prompt += `Assistant: ${msg.content}\n`;
        }
      }
    }
    
    // Add the current message
    prompt += `User: ${message}\nAssistant:`;
    
    // Call Hugging Face Inference API
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${modelId}`,
      {
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true,
          return_full_text: false
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY || ""}`
        }
      }
    );
    
    // Extract model's response
    let assistantResponse = "";
    if (response.data && response.data[0]) {
      assistantResponse = response.data[0].generated_text.trim();
    } else {
      assistantResponse = "I'm sorry, I couldn't generate a response. Please try again.";
    }
    
    // Update conversation history with new messages
    const updatedHistory = [
      ...conversation_history,
      { role: 'user', content: message },
      { role: 'assistant', content: assistantResponse }
    ];
    
    // Send response to client
    res.json({
      message: assistantResponse,
      conversation_history: updatedHistory
    });
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    const errorMessage = error.response?.data?.error || error.message;
    
    // Handle rate limiting or model loading
    if (errorMessage.includes("loading") || errorMessage.includes("rate limit")) {
      return res.status(429).json({ 
        error: "The model is still loading or we hit a rate limit. Please try again in a few seconds.",
        details: errorMessage
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to get response from Hugging Face',
      details: errorMessage
    });
  }
});

// List available models
app.get('/models', (req, res) => {
  res.json({ models: Object.keys(AVAILABLE_MODELS) });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Available models: ${Object.keys(AVAILABLE_MODELS).join(', ')}`);
});