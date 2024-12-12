import { createContext } from 'react';
import { Elve } from '../../interfaces';

interface ElvesContextProps {
  isLoading: boolean;
  error: string | null;
  elves: Elve[];
  lastPage: number | null;

  getElves: (page: number, query: string, order: string) => Promise<void>;
}

export const ElvesContext = createContext<ElvesContextProps>({} as ElvesContextProps);
