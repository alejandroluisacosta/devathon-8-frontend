import { useRef } from 'react';
import './searchBar.scss';

interface SearchBarProps {
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onChange(e.target.value);
    }, 500);
  };

  return (
    <input 
      type="text" 
      className="reader__search" 
      onChange={onQueryChange}
    />
  );
};
