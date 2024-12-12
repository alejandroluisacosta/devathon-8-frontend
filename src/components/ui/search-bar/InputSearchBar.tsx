import React from 'react';
import { IoSearch } from 'react-icons/io5';
import './searchBar.scss';
type Props = React.ComponentProps<'input'> & {
  label: string;
};
export const InputSearchBar = ({ label, ...props }: Props) => {
  return (
    <div className="search-bar">
      <label htmlFor={props.id} className="search__label">
        {label}
      </label>
      <input type="search" className="search-bar__input" {...props} />

      <IoSearch className="search-bar__icon" />
    </div>
  );
};
