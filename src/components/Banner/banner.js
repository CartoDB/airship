import styled from 'styled-components';
import PropTypes from 'prop-types';
import { theme } from '../../constants';

const BannerIcon = styled.div`
  display: flex;
  flex: 0 0 auto;
`;
BannerIcon.displayName = 'Banner.Handle';

const BannerContent = styled.div`
  flex: 1;
  padding: 0 8px;
`;
BannerContent.displayName = 'Banner.Content';

const Banner = styled.div`
  align-items: center;
  background-color: ${props => props.color || props.theme.ui04};
  border-radius: 0;
  box-sizing: border-box;
  display: flex;
  padding: 12px;
  width: 100%;
`;

Banner.propTypes = {
  color: PropTypes.string,
};

Banner.defaultProps = {
  theme,
};

Banner.Icon = BannerIcon;
Banner.Content = BannerContent;

export default Banner;
