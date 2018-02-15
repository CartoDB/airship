import PropTypes from 'prop-types';

const BaseText = (props) => {
  const { as, basic } = props;
  console.log(props.margin);
  return (as ? basic.withComponent(as) : basic).extend`
    color: ${props.color};
    margin: ${props.margin || 0};
  `;
};

BaseText.propTypes = {
  as: PropTypes.oneOf(['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  color: PropTypes.string,
  margin: PropTypes.string
};

export default BaseText;
