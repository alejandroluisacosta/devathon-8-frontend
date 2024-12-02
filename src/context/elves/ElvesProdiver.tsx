import { useEffect, useReducer } from 'react';
import { elvesApiFetch } from '../../api';
import { Elve, ElvelsResponse } from '../../interfaces';
import { ElvesContext } from './ElvesContext';
import { elvesReducer } from './elvesReducer';

type Props = {
  children: React.ReactNode;
};
export interface ElvesState {
  isLoading: boolean;
  error: string | null;
  elves: Elve[];
}

const INITIAL_STATE: ElvesState = {
  isLoading: false,
  error: null,
  elves: [],
};
export const ElvesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(elvesReducer, INITIAL_STATE);

  const getElves = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      //TODO: set the correct Interface for the response
      const elves = await elvesApiFetch<null, ElvelsResponse>({
        path: '/labor-registration/list',
        method: 'GET',
      });

      dispatch({ type: 'SET_ELVES', payload: elves.data });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  useEffect(() => {
    //TODO: fetch data to get elves list
    getElves();

    // dispatch({ type: 'SET_ELVES', payload: elvesList });
  }, []);
  return <ElvesContext.Provider value={{ ...state, getElves }}>{children}</ElvesContext.Provider>;
};
