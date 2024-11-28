import React, { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        className="reader__search" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} 
      />
      <button type="submit">Search</button>
    </form>
  );
};
