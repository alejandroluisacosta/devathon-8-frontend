import { useEffect, useState } from 'react';
import { LetterR, LettersResponse } from '../interfaces/lettersResponse.interface';

interface LetterState {
  letters: LetterR[];
  loading: boolean;
  error: string | null;
  lastPage: number;
}

export const useLettersFetch = (page: string, query: string = '') => {
  const [lettersState, setLettersState] = useState<LetterState>({
    letters: [],
    loading: false,
    error: null,
    lastPage: 0,
  });

  const setLetters = (letters: LetterR[]) => setLettersState((prev) => ({ ...prev, letters }));
  const setLoading = (loading: boolean) => setLettersState((prev) => ({ ...prev, loading }));
  const setError = (error: string) => setLettersState((prev) => ({ ...prev, error }));
  const setTotaLastPage = (lastPage: number) => setLettersState((prev) => ({ ...prev, lastPage }));

  useEffect(() => {
    const getLetters = async () => {
      const API_URL = import.meta.env.VITE_BACKEND_URL;
      try {
        setLoading(true);
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': `${import.meta.env.VITE_API_KEY_BACK}`,
          },
        };

        const response = await fetch(
          `${API_URL}/letters?page=${page}${query ? `&search=${query}` : ''}`,
          options
        );
        console.log('hey');

        if (!response.ok) throw new Error('Network response was not ok');

        const data = (await response.json()) as LettersResponse;
        setLetters(data.data);
        setTotaLastPage(data.meta.last_page);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };

    getLetters();
  }, [page, query]);

  return { ...lettersState };
};
