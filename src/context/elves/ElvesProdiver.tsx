import { useReducer } from 'react';
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
  lastPage: number | null;
}

const INITIAL_STATE: ElvesState = {
  isLoading: false,
  error: null,
  elves: [],
  lastPage: null,
};
export const ElvesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(elvesReducer, INITIAL_STATE);

  const getElves = async (page: number = 1, query: string, order: string) => {
    try {
      const [orderKey, orderDirection] = order.split('-');
      dispatch({ type: 'SET_LOADING', payload: true });
      const elves = await elvesApiFetch<null, ElvelsResponse>({
        path: `/labor-registration/list?page=${page}${query && `&search=${query}`}${order && `&order=${orderKey}&direction=${orderDirection}`}`,
        method: 'GET',
      });

      dispatch({ type: 'SET_ELVES', payload: elves.data });
      dispatch({ type: 'SET_LAST_PAGE', payload: elves.last_page });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteElves = (id: number) => {
    dispatch({type: 'DELETE_ELVE', payload: id})
  }

  return <ElvesContext.Provider value={{ ...state, getElves, deleteElves }}>{children}</ElvesContext.Provider>;
};
