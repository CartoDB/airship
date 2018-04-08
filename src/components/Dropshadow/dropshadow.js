import styled from 'styled-components';
import PropTypes from 'prop-types';
import { shadows } from '../../constants';

const Dropshadow = styled.div`
  box-shadow: ${props => shadows[`shadow${props.size}`]};
`;

Dropshadow.displayName = 'Dropshadow';

Dropshadow.defaultProps = {
  size: 4,
};

Dropshadow.propTypes = {
  size: PropTypes.oneOf([4, 8, 16]),
};

export default Dropshadow;
