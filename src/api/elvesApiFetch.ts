interface Props<TBody> {
  path: string;
  method: string;
  body?: TBody;
}

export const elvesApiFetch = async <TBody, TResponse>(props: Props<TBody>): Promise<TResponse> => {
  const { path, method, body } = props;
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': `${import.meta.env.VITE_API_KEY_BACK}`,
      },
      body: body && JSON.stringify(body),
    });

    if (!response.ok) throw new Error('Error with the network');

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      //IF API is not available
      if (error.message === 'Failed to fetch') {
        throw new Error('Error with the network');
      }
      throw new Error(error.message);
    }
    throw new Error('Error unespected');
  }
};
