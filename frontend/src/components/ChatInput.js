import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  TextField, 
  IconButton, 
  Paper, 
  InputAdornment,
  CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const [rows, setRows] = useState(1);
  const textFieldRef = useRef(null);

  useEffect(() => {
    // Auto resize the text field based on content
    if (message.split('\n').length > rows) {
      setRows(Math.min(message.split('\n').length, 5));
    }
  }, [message, rows]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      setRows(1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <Paper
      elevation={3}
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 3,
        backgroundColor: 'background.paper',
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={5}
        rows={rows}
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        inputRef={textFieldRef}
        disabled={isLoading}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <Box sx={{ display: 'flex' }}>
                {isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  <IconButton 
                    color="primary" 
                    type="submit" 
                    disabled={!message.trim() || isLoading}
                  >
                    <SendIcon />
                  </IconButton>
                )}
              </Box>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiInputBase-root': {
            fontSize: '1rem',
            padding: 1,
          },
        }}
      />
    </Paper>
  );
};

export default ChatInput;