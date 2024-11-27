import React, { useState } from "react";

interface SearchBarProps {
    onSubmit: (event: React.FormEvent) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
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
