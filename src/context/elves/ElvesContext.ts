import { createContext } from 'react';
import { Elve } from '../../interfaces';

interface ElvesContextProps {
  isLoading: boolean;
  error: string | null;
  elves: Elve[];
  lastPage: number | null;

  getElves: (page: number, query: string, order: string) => Promise<void>;
  deleteElves: (id: number) => void;
}

export const ElvesContext = createContext<ElvesContextProps>({} as ElvesContextProps);
