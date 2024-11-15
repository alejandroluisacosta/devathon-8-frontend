import { IntSearch } from '../interfaces/history.interface';

export const isInHistory = (history: IntSearch[], historyToSave: IntSearch): boolean => {
  const existInHistory = history.some(
    (historyItem) => historyItem.attributes.place === historyToSave.attributes.place,
  );
  return existInHistory;
};
