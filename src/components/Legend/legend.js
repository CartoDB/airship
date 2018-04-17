import styled from 'styled-components';
import PropTypes from 'prop-types';
import { shadows, theme } from '../../constants';

const LegendPanel = styled.div`
  padding: ${props => (props.small ? '18px 10px' : '26px 20px')};
  position: relative;

  img {
    max-width: 100%;
  }

  &:before {
    content: '';
    height: 2px;
    left: 0;
    right: 0;
    top: 0;
    background-color: ${props => props.theme.ui02};
    position: absolute;
  }

  &:first-child:before {
    display: none;
  }
`;

LegendPanel.defaultProps = {
  theme,
};

const Legend = styled.div`
  border-radius: 4px;
  background-color: ${props => props.theme.ui01};
  width: ${props => (props.small ? 160 : 260)}px;
  box-shadow: ${shadows.shadow8};
`;

Legend.defaultProps = {
  small: false,
  theme,
};

Legend.propTypes = {
  children: PropTypes.node,
  small: PropTypes.bool,
  style: PropTypes.object,
};

Legend.Panel = LegendPanel;

export default Legend;
