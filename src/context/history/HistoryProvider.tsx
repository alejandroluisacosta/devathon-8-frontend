import { useReducer } from 'react';
import { IntSearch } from '../../interfaces/history.interface';
import { HistoryContext } from './HistoryContext';
import { historyReducer } from './historyReducer';

type Props = {
  children: React.ReactNode;
};

export interface HistoryState {
  isLoading: boolean;
  history: IntSearch[];
}

const INITIAL_STATE: HistoryState = {
  isLoading: true,
  history: [],
};

export const HistoryProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(historyReducer, INITIAL_STATE);

  const setHistory = (history: IntSearch[]) => {
    dispatch({ type: 'SET_HISTORY', payload: history });
  };

  const updateHistory = (history: IntSearch) => {};

  return (
    <HistoryContext.Provider value={{ ...state, setHistory, updateHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
