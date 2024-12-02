import { createContext } from 'react';
import { Elve } from '../../interfaces';

interface ElvesContextProps {
  isLoading: boolean;
  error: string | null;
  elves: Elve[];

  getElves: () => Promise<void>;
}

export const ElvesContext = createContext<ElvesContextProps>({} as ElvesContextProps);
