import PropTypes from 'prop-types';
import styled from 'styled-components';

const getFont = props => (props.font && props.font === 'mono'
  ? 'Overpass Mono, monospace'
  : 'Roboto, sans-serif');

const getWeight = props => {
  if (props.font === 'mono') {
    return 400;
  }
  return props.weight && props.weight === 'medium' ? 500 : 400;
};

const BaseText = styled.div`
  color: ${props => props.color};
  margin: ${props => props.margin || 0};
  font-family: ${props => getFont(props)};
  font-weight: ${props => getWeight(props)};
  -webkit-font-smoothing: antialiased;
`;

BaseText.propTypes = {
  as: PropTypes.oneOf(['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  color: PropTypes.string,
  margin: PropTypes.string,
  font: PropTypes.oneOf(['normal', 'mono']),
  weight: PropTypes.oneOf(['regular', 'medium']),
};

export default BaseText;
