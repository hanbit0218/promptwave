import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBrain, FaInfo, FaBars, FaTimes } from 'react-icons/fa';

const NavContainer = styled.nav`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 1rem 0;
  color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.5rem;
  font-weight: bold;
  
  svg {
    margin-right: 0.5rem;
    font-size: 1.8rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 70%;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.primary};
    flex-direction: column;
    padding: 2rem;
    transition: right 0.3s ease;
    z-index: 100;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  }
`;

const NavLink = styled(Link)`
  margin-left: 2rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  display: flex;
  align-items: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${({ active }) => (active ? '100%' : '0')};
    height: 2px;
    background-color: ${({ theme }) => theme.colors.secondary};
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
  
  svg {
    margin-right: 0.5rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 1.5rem 0;
    font-size: 1.2rem;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  color: white;
  font-size: 1.5rem;
  z-index: 200;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  color: white;
  font-size: 1.5rem;
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }
`;

const Overlay = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
`;

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <NavContainer>
        <NavContent>
        <Logo to="/">
          <FaBrain /> PromptWave
        </Logo>
          
          <MenuButton onClick={toggleMenu}>
            <FaBars />
          </MenuButton>
          
          <NavLinks isOpen={isMenuOpen}>
            <CloseButton onClick={closeMenu}>
              <FaTimes />
            </CloseButton>
            
            <NavLink to="/" active={location.pathname === '/' ? 1 : 0} onClick={closeMenu}>
              <FaBrain /> Chat
            </NavLink>
            
            <NavLink to="/about" active={location.pathname === '/about' ? 1 : 0} onClick={closeMenu}>
              <FaInfo /> About
            </NavLink>
          </NavLinks>
        </NavContent>
      </NavContainer>
      <Overlay isOpen={isMenuOpen} onClick={closeMenu} />
    </>
  );
};

export default Navbar;