import './lettersSkeleton.scss';
type Props = {
  rows?: number;
};

export const LettersSkeleton = ({ rows = 7 }: Props) => {
  return (
    <div className="table-skeleton">
      <div className="table-skeleton__header"></div>
      {Array.from({ length: rows }).map((_, index) => (
        <div className="table-skeleton__row" key={index}></div>
      ))}
    </div>
  );
};
