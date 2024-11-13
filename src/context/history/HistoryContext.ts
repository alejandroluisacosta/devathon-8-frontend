import { createContext } from 'react';
import { IntSearch } from '../../interfaces/history.interface';

interface HistoryContextProps {
  isLoading: boolean;
  history: IntSearch[];
  setHistory: (history: IntSearch[]) => void;
  updateHistory: (history: IntSearch) => void;
}

export const HistoryContext = createContext<HistoryContextProps>({} as HistoryContextProps);
