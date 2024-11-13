import { IntSearch } from '../../interfaces/history.interface';
import { HistoryState } from './HistoryProvider';

type HistoryAction =
  | { type: 'SET_HISTORY'; payload: IntSearch[] }
  | { type: 'UPDATE_HISTORY'; payload: IntSearch };

export const historyReducer = (state: HistoryState, action: HistoryAction): HistoryState => {
  switch (action.type) {
    case 'SET_HISTORY':
      return {
        ...state,
        isLoading: false,
        history: action.payload,
      };

    default:
      return state;
  }
};
