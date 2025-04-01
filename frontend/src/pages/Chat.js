import React, { useState, useEffect, useRef } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Divider, 
  Paper, 
  useTheme,
  Alert,
  Snackbar
} from '@mui/material';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';
import { getGreeting } from '../utils/helpers';
import { sendMessage } from '../services/api';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const theme = useTheme();

  // Scroll to bottom of messages whenever the messages array updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize chat with greeting when component mounts
  useEffect(() => {
    const initChat = () => {
      const greeting = getGreeting();
      setMessages([
        {
          id: Date.now(),
          content: `${greeting} I'm PromptWave, your AI assistant. How can I help you today?`,
          isUser: false,
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    initChat();
  }, []);

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      content,
      isUser: true,
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Send message to backend
      const response = await sendMessage(content);
      
      // Add AI response to chat
      const aiMessage = {
        id: Date.now() + 1,
        content: response.response,
        isUser: false,
        timestamp: response.timestamp,
      };
      
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to get a response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={2}
        sx={{
          height: 'calc(100vh - 120px)',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          overflow: 'hidden',
          bgcolor: 'background.default',
        }}
      >
        {/* Chat header */}
        <Box
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6" component="h1">
            PromptWave AI Chat
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ask me anything about AWS, AI chatbots, or general questions!
          </Typography>
        </Box>

        {/* Messages container */}
        <Box
          sx={{
            p: 2,
            flexGrow: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isUser={message.isUser}
            />
          ))}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input area */}
        <Box
          sx={{
            p: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            bgcolor: 'background.paper',
          }}
        >
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </Box>
      </Paper>
      
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" elevation={6}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Chat;