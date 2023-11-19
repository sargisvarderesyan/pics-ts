import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/themeActions';
import { RootState } from '../store/reducers';
import styled, { createGlobalStyle } from 'styled-components';

interface ToggleButtonProps {
    darkMode: boolean;
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  body {
    background-color: ${(props) => (props.darkMode ? '#333' : '#fff')};
    color: ${(props) => (props.darkMode ? '#fff' : '#333')};
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #4caf50;
  }

  &:focus + span {
    box-shadow: 0 0 1px #4caf50;
  }

  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;

  &:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: #fff;
    transition: 0.4s;
  }
`;

interface GlobalStyleProps {
    darkMode: boolean;
}

const ThemeToggle: React.FC = () => {
    const darkMode = useSelector((state: RootState) => state.theme.darkMode);
    const dispatch = useDispatch();

    return (
        <div>
            <GlobalStyle darkMode={darkMode} />
            <ToggleContainer>
                <ToggleLabel>
                    <ToggleInput type="checkbox" checked={darkMode} onChange={() => dispatch(toggleTheme())} />
                    <ToggleSlider />
                </ToggleLabel>
                <p style={{ marginLeft: '10px' }}>Toggle {darkMode ? 'Light' : 'Dark'} Mode</p>
            </ToggleContainer>
        </div>
    );
};

export default ThemeToggle;
