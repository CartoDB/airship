import styled from 'styled-components';
import PropTypes from 'prop-types';
import Base from '../Typography/base';
import { theme } from '../../constants';

const Title = Base.withComponent('h1').extend`
  font-size: 16px;
  line-height: 24px;
`;

const Description = Base.withComponent('p').extend`
  font-size: 12px;
  line-height: 16px;
  color: ${props => props.theme.type02};
  margin-bottom: 12px;
`;
Description.defaultProps = {
  theme,
};

const Widget = styled.div`
  background: ${props => props.theme.ui01};
  padding: 24px;
  width: 296px;
  box-sizing: border-box;
  text-align: left;
`;

Widget.propTypes = {
  children: PropTypes.node,
};

Widget.defaultProps = {
  theme,
};

Widget.Title = Title;
Widget.Description = Description;

export default Widget;
