import { useEffect, useReducer } from 'react';
import { fetchAPIBackend, HistoryToSave } from '../../api';
import { IntSearch } from '../../interfaces/history.interface';
import { isInHistory } from '../../utils';
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

  useEffect(() => {
    const url = 'http://localhost:8000/api/v1/addresses/recent';
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': `${import.meta.env.VITE_API_KEY_BACK}`,
      },
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error('Error to obtain data');
        return res.json();
      })
      .then(({ data }) => {
        setHistory(data);
      })
      .catch((err) => {
        console.error('Error to obtain data', err);
      });
  }, []);

  const setHistory = (history: IntSearch[]) => {
    dispatch({ type: 'SET_HISTORY', payload: history });
  };

  const updateHistory = async (history: IntSearch) => {
    if (isInHistory(state.history, history)) return;

    const historyToSave: HistoryToSave = {
      place: history.attributes.place,
      city: history.attributes.city,
      country: history.attributes.country,
      coordinates: {
        longitude: history.attributes.coordinates[0],
        latitude: history.attributes.coordinates[1],
      },
    };

    const response = await fetchAPIBackend(historyToSave);
    if (!response.message) return;

    dispatch({ type: 'UPDATE_HISTORY', payload: history });
  };

  return (
    <HistoryContext.Provider value={{ ...state, setHistory, updateHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
