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
    case 'UPDATE_HISTORY':
      return {
        ...state,
        history: [action.payload, ...state.history].slice(0, 5),
      };

    default:
      return state;
  }
};
