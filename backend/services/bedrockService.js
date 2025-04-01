const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
const logger = require('../utils/logger');

// Configure AWS client
const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION
});

/**
 * Service for interacting with AWS Bedrock AI models
 */
class BedrockService {
  /**
   * Generate a response from AWS Bedrock
   * @param {string} prompt - User's input message
   * @param {Object} options - Additional configuration options
   * @returns {Promise<string>} - AI-generated response
   */
  async generateResponse(prompt, options = {}) {
    try {
      const modelId = process.env.MODEL_ID || 'anthropic.claude-v2';
      
      // Construct the input payload based on the model
      let payload;
      
      if (modelId.includes('anthropic')) {
        // Claude model format
        payload = {
          prompt: `\n\nHuman: ${prompt}\n\nAssistant:`,
          max_tokens_to_sample: options.maxTokens || 500,
          temperature: options.temperature || 0.7,
          top_p: options.topP || 0.95,
        };
      } else {
        // Default format (works with most foundation models)
        payload = {
          inputText: prompt,
          textGenerationConfig: {
            maxTokenCount: options.maxTokens || 500,
            temperature: options.temperature || 0.7,
            topP: options.topP || 0.95,
          }
        };
      }
      
      // Create the command to invoke the model
      const command = new InvokeModelCommand({
        modelId: modelId,
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify(payload)
      });
      
      // Execute the command
      const response = await bedrockClient.send(command);
      
      // Parse the response
      const responseBody = JSON.parse(new TextDecoder().decode(response.body));
      
      // Extract the completion based on the model type
      let completion;
      if (modelId.includes('anthropic')) {
        completion = responseBody.completion;
      } else {
        completion = responseBody.results?.[0]?.outputText || responseBody.generated_text;
      }
      
      return completion.trim();
    } catch (error) {
      logger.error(`Error generating response: ${error.message}`);
      throw new Error('Failed to generate AI response');
    }
  }
}

module.exports = new BedrockService();