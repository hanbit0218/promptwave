// src/utils/formatDate.js
export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
};