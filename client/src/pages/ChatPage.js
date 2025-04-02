import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaPaperPlane, FaRobot, FaUser, FaSyncAlt } from 'react-icons/fa';

// Components
import Message from '../components/Message';
import ModelSelector from '../components/ModelSelector';

// Styled components
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 2rem auto;
  height: calc(100vh - 140px);
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ChatHeader = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.darkPrimary};
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const HeaderTitle = styled.h2`
  margin: 0;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.form`
  display: flex;
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.darkPrimary};
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 30px;
  outline: none;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.secondary};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.darkPrimary};
    cursor: not-allowed;
  }
`;

const SendButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 45px;
  height: 45px;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #60A5FA;
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.lightText};
    cursor: not-allowed;
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

const TypingIndicator = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  align-items: center;
  margin-bottom: 1rem;
  
  span {
    height: 8px;
    width: 8px;
    margin: 0 1px;
    background-color: ${({ theme }) => theme.colors.lightText};
    border-radius: 50%;
    display: block;
    animation: typing 1s infinite;
    
    &:nth-child(1) {
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
  
  @keyframes typing {
    0% { transform: translateY(0px); opacity: 0.4; }
    50% { transform: translateY(-5px); opacity: 1; }
    100% { transform: translateY(0px); opacity: 0.4; }
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 10;
  
  svg {
    animation: spin 1s linear infinite;
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.primary};
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const StatusNote = styled.p`
  text-align: center;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.lightText};
  margin-top: 1rem;
`;

const ChatPage = ({ conversationHistory, setConversationHistory }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemma-2b');
  const [isModelLoading, setIsModelLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim() || isLoading) return;
    
    // Add user message to conversation
    const newMessage = { role: 'user', content: message };
    setConversationHistory(prev => [...prev, newMessage]);
    setMessage('');
    setIsLoading(true);
    
    try {
      // Send message to backend
      const response = await axios.post('/chat', {
        message: message.trim(),
        conversation_history: conversationHistory,
        model_choice: selectedModel
      });
      
      // Update conversation with AI response
      setConversationHistory(response.data.conversation_history);
      
    } catch (error) {
      console.error('Error:', error);
      
      // Handle error cases
      let errorMessage = 'Sorry, something went wrong. Please try again.';
      
      if (error.response?.status === 429 || error.response?.data?.error?.includes('loading')) {
        errorMessage = 'The model is still warming up or we hit a rate limit. Please try again in a few seconds.';
        setIsModelLoading(true);
      }
      
      // Add error message to conversation
      setConversationHistory(prev => [...prev, { role: 'assistant', content: errorMessage }]);
      
    } finally {
      setIsLoading(false);
      // Reset model loading status after a delay
      if (isModelLoading) {
        setTimeout(() => setIsModelLoading(false), 5000);
      }
    }
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <HeaderTitle><FaRobot /> AI Chatbot</HeaderTitle>
        <ModelSelector 
          selectedModel={selectedModel} 
          onChange={handleModelChange} 
          disabled={isLoading}
        />
      </ChatHeader>
      
      <MessagesContainer>
        {conversationHistory.map((msg, index) => (
          <Message 
            key={index} 
            role={msg.role} 
            content={msg.content}
            icon={msg.role === 'user' ? <FaUser /> : <FaRobot />}
          />
        ))}
        
        <TypingIndicator isVisible={isLoading}>
          <span></span>
          <span></span>
          <span></span>
        </TypingIndicator>
        
        <div ref={messagesEndRef} />
      </MessagesContainer>
      
      <InputContainer onSubmit={handleSubmit}>
        <MessageInput
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
        />
        <SendButton type="submit" disabled={isLoading || !message.trim()}>
          <FaPaperPlane />
        </SendButton>
      </InputContainer>
      
      {isModelLoading && <StatusNote>First message may take a moment as the model loads...</StatusNote>}
      
      <LoadingOverlay isVisible={false}>
        <FaSyncAlt />
      </LoadingOverlay>
    </ChatContainer>
  );
};

export default ChatPage;