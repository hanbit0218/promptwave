import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { formatTimestamp } from '../utils/formatDate';

const MessageBubble = ({ message, isUser }) => {
  const theme = useTheme();

  // Component for rendering code blocks with syntax highlighting
  const CodeBlock = ({ language, value }) => {
    return (
      <SyntaxHighlighter
        language={language || 'javascript'}
        style={materialLight}
        wrapLines
        wrapLongLines
      >
        {value}
      </SyntaxHighlighter>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        mb: 2,
        flexDirection: isUser ? 'row-reverse' : 'row',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          mr: isUser ? 0 : 1.5,
          ml: isUser ? 1.5 : 0,
        }}
      >
        <Box
          sx={{
            backgroundColor: isUser ? 'primary.light' : 'grey.300',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isUser ? (
            <PersonIcon sx={{ color: '#fff' }} />
          ) : (
            <SmartToyIcon sx={{ color: 'grey.700' }} />
          )}
        </Box>
      </Box>
      <Box sx={{ maxWidth: '80%' }}>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: isUser ? 'primary.light' : 'background.paper',
            color: isUser ? 'primary.contrastText' : 'text.primary',
            borderBottomLeftRadius: isUser ? 2 : 0,
            borderBottomRightRadius: isUser ? 0 : 2,
          }}
        >
          <Typography component="div">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <CodeBlock
                      language={match[1]}
                      value={String(children).replace(/\n$/, '')}
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </Typography>
        </Paper>
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block', 
            mt: 0.5, 
            color: 'text.secondary',
            textAlign: isUser ? 'right' : 'left',
            mr: isUser ? 1 : 0,
            ml: isUser ? 0 : 1,
          }}
        >
          {message.timestamp ? formatTimestamp(message.timestamp) : ''}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageBubble;