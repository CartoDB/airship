// Truncate a string nicely to a certain length

export default (str, length) => {
  if (str.length <= length) {
    return str;
  }

  const string = str.substr(0, length).trim();

  return `${string}…`;
}
