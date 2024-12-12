import React from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import { InputSearchBar } from '../../ui/search-bar/InputSearchBar';

type Props = {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOrderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  order: string;
};

export const ElveFilters = ({ onOrderChange, onSearchChange, order }: Props) => {
  return (
    <div className="elves-page__filters">
      <InputSearchBar
        label="Search elve"
        placeholder="Search elve by name..."
        id="search-bar-elve"
        aria-label="search bar to fing a elve by his name"
        onChange={onSearchChange}
      />

      <div className="select-picker">
        <select
          className="select-picker__select"
          value={order}
          name="order-elves"
          id="order-elves"
          onChange={onOrderChange}
        >
          <option className="select-picker__option" value="">
            Order elves
          </option>
          <option className="select-picker__option" value="name-asc">
            Name ASC
          </option>
          <option className="select-picker__option" value="age-asc">
            Age ASC
          </option>
          <option className="select-picker__option" value="age-desc">
            Age DESC
          </option>
          <option className="select-picker__option" value="height-asc">
            Height ASC
          </option>
          <option className="select-picker__option" value="height-desc">
            Height DESC
          </option>
        </select>
        <IoChevronDownOutline className="select-picker__icon" size={20} />
      </div>
    </div>
  );
};
