export const FilterTypes = Object.freeze({
  IN: 'in',
});

export const getFilterCondition = (filters = {}) => {
  const result = [];

  Object.entries(filters).forEach(([column, filter]) => {
    Object.entries(filter).forEach(([operator, values]) => {
      switch (operator) {
        case 'in':
          result.push(`${column} ${operator}(${values.map((v) => `'${v}'`).join(',')})`);
          break;
        default:
          throw new Error(`Not valid operator has provided: ${operator}`);
      }
    });
  });

  return result.length ? `WHERE ${result.join(' AND ')}` : '';
};

export const getConditionFromViewPort = (viewport) => {
  return `ST_Intersects(
    the_geom_webmercator,
    ST_Transform(ST_MakeEnvelope(${viewport.join(',')}, 4326), 3857)
  )`;
};

export const getFilteredQuery = ({ data, filters }) => {
  return `
    SELECT *
    FROM (${data}) as q
    ${getFilterCondition(filters)}
  `;
};