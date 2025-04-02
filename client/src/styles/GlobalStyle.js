import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.secondary};
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};
  }

  /* For mobile responsiveness */
  html {
    font-size: 16px;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 14px;
    }
  }

  /* Container to keep content centered */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* For code blocks */
  pre {
    background-color: #111827;
    color: #e2e8f0;
    border-radius: 5px;
    padding: 1rem;
    overflow-x: auto;
    margin: 1rem 0;
  }

  code {
    font-family: 'Source Code Pro', monospace;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export default GlobalStyle;