import React, { useState } from "react";
import './searchBar.scss';

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="reader__search">
      <input 
        type="text" 
        className="reader__search__input" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} 
      />
      <button type="submit" className="reader__search__submit">Search</button>
    </form>
  );
};
