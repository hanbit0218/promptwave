import React from 'react';
import styled from 'styled-components';
import { FaReact, FaServer, FaRobot, FaGithub, FaCode, FaBrain } from 'react-icons/fa';

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const AboutTitle = styled.h1`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 2rem;
`;

const AboutSection = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const AboutText = styled.p`
  margin-bottom: 1rem;
  line-height: 1.7;
`;

const TechList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const TechItem = styled.li`
  background-color: ${({ theme }) => theme.colors.botMessage};
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 1.2rem;
  }
`;

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #60A5FA;
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const AboutPage = () => {
  return (
    <AboutContainer>
      <AboutTitle>About PromptWave</AboutTitle>
      
      <AboutSection>
        <SectionTitle><FaBrain /> What is this?</SectionTitle>
        <AboutText>
          Hey there! I built PromptWave for my AI / web development class project. It's a chatbot that uses free AI models from Hugging Face. I wanted to see if I could make something cool that doesn't cost anything to run but still lets you chat with AI.
        </AboutText>
        
        <AboutText>
          I tried to make it work well on phones too. This was my first time working with AI APIs, so it was a fun learning experience!
        </AboutText>
      </AboutSection>
      
      <AboutSection>
        <SectionTitle><FaCode /> Cool Tech I Used</SectionTitle>
        <AboutText>
          I put together a bunch of tools I learned in my classes to make this work:
        </AboutText>
        
        <TechList>
          <TechItem><FaReact /> React</TechItem>
          <TechItem><FaCode /> JavaScript</TechItem>
          <TechItem><FaServer /> Node.js</TechItem>
          <TechItem><FaServer /> Express</TechItem>
          <TechItem><FaCode /> Styled Components</TechItem>
          <TechItem><FaRobot /> Hugging Face API</TechItem>
        </TechList>
      </AboutSection>
      
      <AboutSection>
        <SectionTitle><FaRobot /> AI Models</SectionTitle>
        <AboutText>
          I'm using these free models from Hugging Face:
        </AboutText>
        
        <TechList>
          <TechItem><FaBrain /> Gemma 2B (Google)</TechItem>
          <TechItem><FaBrain /> Zephyr 7B</TechItem>
          <TechItem><FaBrain /> Mistral 7B</TechItem>
        </TechList>
        
        <AboutText>
          The cool thing is these run on Hugging Face's servers, so my app doesn't need a fancy GPU to work. Try different models to see which one you like best!
        </AboutText>
      </AboutSection>
      
      <AboutSection>
        <SectionTitle><FaGithub /> Project Info</SectionTitle>
        <AboutText>
          This was part of my CS 156 Intro to AI course. Special thanks to my professor for helping me figure out the API connections and to my friend for debugging help at 2 AM!
        </AboutText>
        
        <AboutText>
          Feel free to check out more of my projects on GitHub. I'm planning to add more features when I have time between classes.
        </AboutText>
        
        <LinkButton href="https://huggingface.co/docs/api-inference/en/index" target="_blank" rel="noopener noreferrer">
          <FaBrain /> Hugging Face Docs
        </LinkButton>
      </AboutSection>
    </AboutContainer>
  );
};

export default AboutPage;