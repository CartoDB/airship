import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';
import { colors } from '../../constants';
import { readableNumber } from '../../utils';
import Base from '../Typography/base';

const CATEGORY_OTHER = 'Other';

const Categories = styled.ul`
  padding: 0;
  list-style: none;
`;

const Amount = Base.withComponent('span').extend`
  flex: 30%;
  text-align: right;
  font-size: 12px;
  line-height: 20px;
`;

const Name = Base.withComponent('p').extend`
  flex: 70%;
  font-size: 12px;
  line-height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
`;

const Progress = styled.div`
  height: 4px;
  width: 100%;
  border-radius: 2px;
  background: ${colors.ui02};
  position: relative;

  &::after {
    content: '';
    width: ${props => props.amount}%;
    height: 4px;
    border-radius: 2px;
    transition: background 0.2s ease;
    position: absolute;
    max-width: 100%;
    left: 0;
  }
`;

const Category = styled.li`
  display: flex;
  flex-wrap: wrap;
  cursor: ${props => props.onCategoryClick ? 'pointer' : 'default'};
  margin-bottom: 8px;

  & > ${Progress}::after {
    background: ${props => (props.isOther ? colors.type01 : colors.brand03)};
  }

  ${props => props.onCategoryClick && css`
    &:hover {
      & > ${Progress}::after {
        background: ${props => (props.isOther ? lighten(0.4, colors.type01) : darken(0.16, colors.brand03))};
      }
    }
  `};

  ${props => !props.selected && css`
    ${Amount},
    ${Name} {
      color: ${colors.type02};
    }

    ${Progress}::after {
      background: ${colors.ui03};
    }

    ${props => props.onCategoryClick && `
      &:hover {
        & > ${Progress}::after {
          background: ${colors.ui04}
        }
      }
    `};
  `}
`;

Category.displayName = 'Category';

class CategoryWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected || [],
    };
  }

  onCategoryClick = clickedCategory => {
    if (!this.props.onCategoryClick) return;

    const { selected } = this.state;

    const nextSelected = selected.includes(clickedCategory)
      ? selected.filter(category => category !== clickedCategory)
      : [...selected, clickedCategory];

    this.setState({ selected: nextSelected });

    this.props.onCategoryClick(nextSelected);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(prevState => ({ selected: nextProps.selected || prevState.selected }));
  }

  render() {
    const { categories, max } = this.props.data;
    const { selected } = this.state;

    return (
      <Categories>
        {categories && categories.map(category => {
          const { name, value } = category;
          const isSelected = selected.length === 0 || selected.includes(category);

          return (
            <Category
              key={name}
              onClick={() => this.onCategoryClick(category)}
              selected={isSelected}
              isOther={name === CATEGORY_OTHER}
            >
              <Name>{name}</Name>
              <Amount>{readableNumber(value)}</Amount>
              <Progress amount={(value / max) * 100} />
            </Category>
          );
        })}
      </Categories>
    );
  }
}

CategoryWidget.propTypes = {
  data: PropTypes.shape({
    count: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    nulls: PropTypes.number,
    operation: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.object),
  }),
  onCategoryClick: PropTypes.func,
  selected: PropTypes.array,
};

CategoryWidget.defaultProps = {
  data: {},
};

export default CategoryWidget;
