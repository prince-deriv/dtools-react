export const searchInObject = (obj, searchString, limit = null) => {
  const lowerCaseSearch = searchString.toLowerCase();

  const results = Object.entries(obj)
    .filter(
      ([key, value]) =>
        key.toLowerCase().includes(lowerCaseSearch) ||
        String(value).toLowerCase().includes(lowerCaseSearch)
    )
    .map(([key, value]) => ({ key, value }));

  // If a limit is specified, return only the first 'limit' number of results
  return limit ? results.slice(0, limit) : results;
};

export const resolveVariable = (key, obj, depth = []) => {
  const value = obj[key];
  depth.push({ key, value });
  const match = value.match(/^var\((.*)\)$/);

  if (match) {
    const nextKey = match[1];

    return resolveVariable(nextKey, obj, depth);
  }

  return depth;
};
