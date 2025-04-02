import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SelectWrapper = styled.div`
  position: relative;
`;

const StyledSelect = styled.select`
  padding: 0.5rem 2rem 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: rgba(144, 213, 255, 0.2);
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.9rem;
  cursor: pointer;
  appearance: none;
  outline: none;
  transition: background-color 0.3s ease;
  
  &:hover, &:focus {
    background-color: rgba(144, 213, 255, 0.3);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  option {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Arrow = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid white;
  pointer-events: none;
`;

const ModelSelector = ({ selectedModel, onChange, disabled }) => {
  return (
    <SelectWrapper>
      <StyledSelect 
        value={selectedModel} 
        onChange={onChange}
        disabled={disabled}
      >
        <option value="gemma-2b">Gemma 2B (Google)</option>
        <option value="zephyr">Zephyr 7B</option>
        <option value="mistral">Mistral 7B</option>
      </StyledSelect>
      <Arrow />
    </SelectWrapper>
  );
};

ModelSelector.propTypes = {
  selectedModel: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default ModelSelector;