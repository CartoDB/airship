const DEFAULT_USER_COMPONENT_IN_URL = '{user}';
const REQUEST_GET_MAX_URL_LENGTH = 2048;

export const execute = async (query, credentials) => {
  let response;

  console.log('BBB');

  try {
    const request = createRequest(query, credentials);
    /* global fetch */
    /* eslint no-undef: "error" */
    response = await fetch(request);
  } catch (error) {
    throw new Error(`Failed to connect to SQL API: ${error}`);
  }

  const data = await response.json();

  if (!response.ok) {
    dealWithError({ response, data, credentials });
  }

  return data.rows;
};

/**
 * Display proper message from SQL API error
 */
function dealWithError({ response, data, credentials }) {
  switch (response.status) {
    case 401:
      throw new Error(
        `Unauthorized access to SQL API: invalid combination of user ('${credentials.username}') and apiKey ('${credentials.apiKey}')`
      );
    case 403:
      throw new Error(
        `Unauthorized access to dataset: the provided apiKey('${credentials.apiKey}') doesn't provide access to the requested data`
      );
    default:
      throw new Error(`${JSON.stringify(data.error)}`);
  }
}

/**
 * Create a GET or POST request, with all required parameters
 */
function createRequest(query, credentials) {
  const encodedApiKey = encodeParameter('api_key', credentials.apiKey);
  const encodedClient = encodeParameter('client', credentials.username);
  const parameters = [encodedApiKey, encodedClient];
  const queryParameter = encodeParameter('q', query);
  const url = generateSqlApiUrl(parameters, credentials);
  const getUrl = `${url}&${queryParameter}`;

  if (getUrl.length < REQUEST_GET_MAX_URL_LENGTH) {
    return getRequest(getUrl);
  }

  return postRequest(url, queryParameter);
}

/**
 * Generate a SQL API url for the request
 */
function generateSqlApiUrl(parameters, credentials) {
  const base = `${serverURL(credentials)}api/v2/sql`;
  return `${base}?${parameters.join('&')}`;
}

/**
 * Prepare a url valid for the specified user
 */
function serverURL(credentials) {
  let url = credentials.serverUrlTemplate.replace(
    DEFAULT_USER_COMPONENT_IN_URL,
    credentials.username
  );

  if (!url.endsWith('/')) {
    url += '/';
  }

  return url;
}

/**
 * Simple GET request
 */
function getRequest(url) {
  /* global Request */
  /* eslint no-undef: "error" */
  return new Request(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
}

/**
 * Simple POST request
 */
function postRequest(url, payload) {
  return new Request(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: payload,
  });
}

/**
 * Simple encode parameter
 */
function encodeParameter(name, value) {
  return `${name}=${encodeURIComponent(value)}`;
}