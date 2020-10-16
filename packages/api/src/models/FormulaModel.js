import { execute } from '../Sql';
import { getFilterCondition, getConditionFromViewPort } from './FilterConditionBuilder';

export const getValue = (props) => {
  const {
    data,
    credentials,
    operation,
    'operation-column': operationColumn,
    filters,
    viewport,
  } = props;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get categories');
  }

  let query =
    (viewport &&
      `SELECT * FROM (${data})  as q WHERE ${getConditionFromViewPort(viewport)}`) ||
    data;

  query = `
    SELECT ${operation}(${operationColumn}) as value
    FROM (${query}) as q
    ${getFilterCondition(filters)}
  `;

  return execute(query, credentials);
};
