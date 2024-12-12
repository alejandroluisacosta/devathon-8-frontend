import { useContext } from 'react';
import { ElvesContext } from '../context/elves/ElvesContext';

export const useElves = () => useContext(ElvesContext);
