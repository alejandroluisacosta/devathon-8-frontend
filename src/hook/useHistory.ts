import { useContext } from 'react';
import { HistoryContext } from '../context/history/HistoryContext';

export const useHistory = () => useContext(HistoryContext);
