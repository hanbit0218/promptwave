import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MessageContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  flex-direction: ${({ isUser }) => (isUser ? 'row-reverse' : 'row')};
  align-items: flex-start;
`;

const MessageContent = styled.div`
  background-color: ${({ theme, isUser }) => 
    isUser ? theme.colors.userMessage : theme.colors.botMessage};
  padding: 0.8rem 1rem;
  border-radius: 18px;
  border-bottom-${({ isUser }) => (isUser ? 'right' : 'left')}-radius: 4px;
  max-width: 80%;
  word-wrap: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 90%;
  }
  
  p {
    margin: 0;
  }
  
  pre {
    margin: 0.5rem 0;
    background-color: ${({ theme }) => theme.colors.darkPrimary};
  }
`;

const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme, isUser }) => 
    isUser ? theme.colors.secondary : theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ isUser }) => (isUser ? '0 0 0 0.5rem' : '0 0.5rem 0 0')};
  
  svg {
    font-size: 0.9rem;
  }
`;

// Function to format message content with code blocks
const formatMessage = (content) => {
  if (!content) return '';

  // Split by code block markers
  const parts = content.split(/(```[\s\S]*?```)/g);

  return parts.map((part, index) => {
    // Check if this part is a code block
    if (part.startsWith('```') && part.endsWith('```')) {
      // Extract language and code
      const match = part.match(/```(?:(\w+))?\n([\s\S]*?)```/);
      
      if (match) {
        const [, language, code] = match;
        return (
          <pre key={index}>
            <code>{code}</code>
          </pre>
        );
      }
    }

    // Replace newlines with <br> for regular text
    return <span key={index} dangerouslySetInnerHTML={{ __html: part.replace(/\n/g, '<br>') }} />;
  });
};

const Message = ({ role, content, icon }) => {
  const isUser = role === 'user';

  return (
    <MessageContainer isUser={isUser}>
      <IconWrapper isUser={isUser}>
        {icon}
      </IconWrapper>
      <MessageContent isUser={isUser}>
        {formatMessage(content)}
      </MessageContent>
    </MessageContainer>
  );
};

Message.propTypes = {
  role: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  icon: PropTypes.node
};

export default Message;