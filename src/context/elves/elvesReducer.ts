import { Elve } from '../../interfaces';
import { ElvesState } from './ElvesProdiver';

type ElvesAction =
  | { type: 'SET_ELVES'; payload: Elve[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_LAST_PAGE'; payload: number }
  | { type: 'DELETE_ELVE'; payload: number };

export const elvesReducer = (state: ElvesState, action: ElvesAction): ElvesState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ELVES':
      return {
        ...state,
        elves: action.payload,
      };
    case 'SET_LAST_PAGE':
      return {
        ...state,
        lastPage: action.payload,
      };
    case 'DELETE_ELVE':
      return {
        ...state,
        elves: state.elves.filter((elve) => elve.id !== action.payload),
      };

    default:
      return state;
  }
};
