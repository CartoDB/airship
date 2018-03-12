import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

const StyledLoading = styled.div`
  height: ${(props) => `${props.size}px`};
  width: ${(props) => `${props.size}px`};

  svg {
    animation: ${rotate} 2s linear infinite;
  }

  circle {
    stroke: ${(props) => {
      console.log(props);
      return !!props.negative
        ? 'rgba(255, 255, 255, 1)'
        : 'rgba(44, 44, 44, 1)';
    }};
    stroke-linecap: round;
    animation: ${dash} 1.5s ease-in-out infinite;
    stroke-width: 4px;
  }
`;

const Loading = ({ size = 16, negative = false }) => {
  return (
    <StyledLoading size={size} negative={negative}>
      <svg viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" />
      </svg>
    </StyledLoading>
  );
};

Loading.propTypes = {
  size: PropTypes.oneOf([16, 32, 48, 64]),
  negative: PropTypes.bool
};

export default Loading;
