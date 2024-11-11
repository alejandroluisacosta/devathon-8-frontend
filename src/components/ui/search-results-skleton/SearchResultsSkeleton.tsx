import './searchResultsSkeleton.scss';
export const SearchResultsSkeleton = () => {
  return (
    <div className="skeleton-results">
      <div className="skeleton-results__row"></div>
      <div className="skeleton-results__row"></div>
      <div className="skeleton-results__row"></div>
      <div className="skeleton-results__row"></div>
      <div className="skeleton-results__row"></div>
    </div>
  );
};
