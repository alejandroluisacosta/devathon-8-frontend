import { Elve } from '../../interfaces';
import { ElvesState } from './ElvesProdiver';

type ElvesAction =
  | { type: 'SET_ELVES'; payload: Elve[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

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

    default:
      return state;
  }
};
