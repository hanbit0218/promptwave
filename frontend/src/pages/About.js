import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloudIcon from '@mui/icons-material/Cloud';
import CodeIcon from '@mui/icons-material/Code';

function About() {
  return (
    <Container maxWidth="md">
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <SmartToyIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            About PromptWave
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            An intelligent chatbot built with AWS Bedrock and React
          </Typography>
        </Box>
        
        <Typography variant="h5" gutterBottom>
          Project Overview
        </Typography>
        <Typography variant="body1" paragraph>
          PromptWave is a chatbot application that leverages AWS Bedrock to provide intelligent 
          responses to user queries. The project demonstrates the implementation of AI services
          in a web application and showcases cloud-based AI integration.
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CloudIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">AWS Technologies</Typography>
                </Box>
                <List>
                  {['AWS Bedrock', 'Amazon EC2', 'AWS SDK'].map((item) => (
                    <ListItem key={item} disablePadding sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleOutlineIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CodeIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Tech Stack</Typography>
                </Box>
                <List>
                  {['React', 'Material UI', 'Node.js', 'Express'].map((item) => (
                    <ListItem key={item} disablePadding sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleOutlineIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Typography variant="h5" sx={{ mt: 4 }} gutterBottom>
          How It Works
        </Typography>
        <Typography variant="body1" paragraph>
          PromptWave uses AWS Bedrock to access foundation models through a simple API. When you ask a question, 
          your message is securely sent to our backend, which then communicates with AWS Bedrock. 
          The AI model processes your query and generates a relevant response, which is then displayed in the chat interface.
        </Typography>
        
        <Typography variant="h5" sx={{ mt: 4 }} gutterBottom>
          Features
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CheckCircleOutlineIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="body1">Natural language conversations</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CheckCircleOutlineIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="body1">Markdown & code formatting</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CheckCircleOutlineIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="body1">Topic-specific knowledge</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CheckCircleOutlineIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="body1">Cloud-based infrastructure</Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Typography variant="h5" sx={{ mt: 4 }} gutterBottom>
          Development
        </Typography>
        <Typography variant="body1">
          This project was developed as part of a computer science curriculum project to demonstrate
          practical applications of cloud-based AI services. It showcases the integration of modern frontend
          technologies with powerful backend AI capabilities provided by AWS.
        </Typography>
      </Paper>
    </Container>
  );
}

export default About;