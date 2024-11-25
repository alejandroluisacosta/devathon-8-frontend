export const parseQuery = (search: string) => {
  const queryString = search.startsWith('?') ? search.substring(1) : search;

  const params = new URLSearchParams(queryString);

  const parsedParams: Record<string, string> = {};

  for (const [key, value] of params) {
    parsedParams[key] = value;
  }

  return parsedParams;
};
